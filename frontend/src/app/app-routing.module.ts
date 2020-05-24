import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { BoardComponent } from './view/board/board.component';
import { AdminComponent } from './view/admin/admin.component';
import { AuthGuard } from '../app/auth/auth.guard';
import { GamepickerComponent } from './view/login/gamepicker/gamepicker.component';
import { GamenewComponent } from './view/login/gamenew/gamenew.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login/:id', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'game/:id', component: BoardComponent },
  { path: 'gamepicker', component: GamepickerComponent },
  { path: 'gamenew', component:  GamenewComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
