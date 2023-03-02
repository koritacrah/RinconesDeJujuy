import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckInFormComponent } from './components/check-in-form/check-in-form.component';
import { SingleCheckComponent } from './components/single-check/single-check.component';
import { WorkViewComponent } from './components/work-view/work-view.component';

const routes: Routes = [
  { path: '', component: WorkViewComponent },
  { path: 'test', component: SingleCheckComponent },
  { path: 'check-in', component: CheckInFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
