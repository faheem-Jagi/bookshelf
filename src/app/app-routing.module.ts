import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerBooksComponent } from './gener-books/gener-books.component';
import { GenerComponent } from './gener/gener.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'', pathMatch:'full', component:GenerComponent},
  {path:'gener', component: GenerComponent},
  {path:'generBooks/:gener', component: GenerBooksComponent},
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
