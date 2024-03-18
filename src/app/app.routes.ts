import { Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';

export const routes: Routes = [
  { path: '', redirectTo: '/forms', pathMatch: 'full' },
  { path: 'forms', component: FormsComponent },
];
