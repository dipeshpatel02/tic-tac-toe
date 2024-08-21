import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { TopWinnersComponent } from './top-winners/top-winners.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user', component: UserFormComponent },
  { path: 'game', component: TicTacToeComponent },
  { path: 'winners', component: TopWinnersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
