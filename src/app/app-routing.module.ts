import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoetsComponent } from './poets/poets.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PoetDetailComponent } from './poet-detail/poet-detail.component';


const routes: Routes = [
  { path: 'poets', component: PoetsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: PoetDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
