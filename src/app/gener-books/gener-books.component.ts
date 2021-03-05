
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { GenerBooksService } from '../shared/gener-books.service';


@Component({
  selector: 'app-gener-books',
  templateUrl: './gener-books.component.html',
  styleUrls: ['./gener-books.component.scss']
})
export class GenerBooksComponent implements OnInit {


  public api = '';
  public errorMsg: string = '';
  public searchValue: string = '';
  public selectedGener: string = '';
  public generBooksApi: string = '';
  public prevSeearchText: string = ''

  public generBooksApiResult: any = {}
  public bookList: any[] = [];

  public searchResults$: any;
  public getParamObs$: any;
  public subject: any;
  public getGenerBooksSubscriptions: any = [];

  public isLoading: boolean;
  public isPageEnd: boolean;

  constructor(private _activatedRoute: ActivatedRoute, private _generBooksService: GenerBooksService) { }

  ngOnInit(): void {
    this.api = `http://skunkworks.ignitesol.com:8000/books/?mime_type=image%2Fjpeg`;
    this.isLoading = false;
    this.subject = new Subject();

    //get selected gener from url parameater
    this.getParamObs$ = this._activatedRoute.paramMap
      .subscribe((params) => {
        this.selectedGener = params.get('gener');
        this.generBooksApi = `${this.api}&search=&topic=${this.selectedGener}`;
      });

    // search text debounce
    this.searchResults$ = this.subject.pipe(
      debounceTime(1000),
      map((searchText: string) => {
        let searchtxt = encodeURIComponent(searchText);
        this.generBooksApi = `${this.api}&search=${searchtxt}&topic=${this.selectedGener}`;
      }))
      .subscribe(() => {
        this.bookList = [];
        this.getGenerBooks();
      });

    this.getGenerBooks();
  }

// Function to get selected gener list
  getGenerBooks() {
    try {
      this.isLoading = true;
      this.getGenerBooksSubscriptions.push(
        this._generBooksService.getGenerBooks(this.generBooksApi)
          .subscribe((data: any) => {
            
            this.generBooksApiResult = data;
            this.generBooksApi = data.next
            this.bookList.push(...data.results);

            // console.log(data);
            // console.log(this.bookList);

            data.count > 0 ? this.errorMsg = '' : this.errorMsg = 'No records found';
            this.isLoading = false;

            this.generBooksApi !== null? this.isPageEnd = false : this.isPageEnd = true;

          },
          (error)=>{
            this.errorMsg = 'Opps, Somthing went wrong';
            console.log('error', error);
            this.isLoading = false;
          }));
    } catch (e) {
      this.errorMsg = 'Opps, Somthing went wrong';
      console.log('error', e);
      this.isLoading = false;
    }
  }

  // search function
  search(evt) {
    const searchText = (evt.target.value).trim();
    if (this.prevSeearchText !== searchText) {
      this.prevSeearchText = searchText;
      // emits the `searchText` into the stream. This will cause the operators in its pipe function 
      //(defined in the ngOnInit method) to be run. `debounceTime` runs and then `map`. If the time 
      //interval of 1 sec in debounceTime hasn’t elapsed, map will not be called, thereby saving the server from being called.
      this.subject.next(searchText)
    }
  }

  // Function to clear search and load default data
  clear(e) {
    if (this.searchValue !== '') {
      this.searchValue = '';
      this.generBooksApi = `${this.api}&search=&topic=${this.selectedGener}`;
      this.getGenerBooks();
    }
  }

  // function to view book 
  //In HTML version or the PDF version or the TXT version of the book (or gives an error alert).
  viewBook(bookFormats: any) {

    let htmlLink = null;
    let pdfLink = null;
    let textLink = null;

    for (let book in bookFormats) {
      if (book.includes('text/html') && !(bookFormats[book].includes('.zip'))) {
        if (htmlLink === null) htmlLink = bookFormats[book];
      }
      else if (book.includes('application/pdf') && !(bookFormats[book].includes('.zip'))) {
        if (pdfLink === null) pdfLink = bookFormats[book]
      }
      else if (book.includes('text/plain') && !(bookFormats[book].includes('.zip'))) {
        if (textLink === null) textLink = bookFormats[book]
      }
    }

    htmlLink != null ? window.open(htmlLink, '__blank')
      : pdfLink != null ? window.open(pdfLink, '__blank')
        : textLink != null ? window.open(textLink, '__blank')
          : this.errorMsg = 'Unable to open book';

  }

  // on page reach 70% height infinity scroll calls for data
  onScrollDown() {
  if(this.generBooksApi !== null){
    this.getGenerBooks();
     this.isPageEnd = false
  }else{
    this.isPageEnd = true;
  }
}

  trackByFun(index, item) {
    return index;
  }

  ngOnDestroy() {
    this.getGenerBooksSubscriptions.forEach(sub$ => sub$.unsubscribe());
    this.getParamObs$.unsubscribe();
    this.searchResults$.unsubscribe();
  }



}
