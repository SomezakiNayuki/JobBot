import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { MyCurrentJobsComponent } from 'src/app/components/pages/my-current-jobs/my-current-jobs.component';
import { MyPostedJobsComponent } from 'src/app//components/pages/my-posted-jobs/my-posted-jobs.component';

const routes: Routes = [
  { path: '', redirectTo: '/my-current-jobs', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'my-current-jobs', component: MyCurrentJobsComponent },
  { path: 'my-posted-jobs', component: MyPostedJobsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
