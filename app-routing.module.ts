import { LoginComponent } from './component/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './component/chart/chart.component';
import { EditemployeeComponent } from './component/editemployee/editemployee.component';



const routes: Routes = [
  { path: '', component: ChartComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit', component: EditemployeeComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
