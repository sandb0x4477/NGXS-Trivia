import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QfContainerComponent } from './containers/query-form.cont.component';
import { TriviaComponent } from './containers/trivia.component';
import { HomeComponent } from './containers/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new', component: QfContainerComponent },
  { path: 'trivia', component: TriviaComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
