import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  PageNotFoundComponent
} from './components/page-not-found/page-not-found.component';
import {LoginComponent} from './components/login/login.component';
import {
  WrapGestionComponent
} from './components/gestion/wrap-gestion/wrap-gestion.component';
import {AuthGuard} from './guard/auth.guard';
import {LoaderComponent} from './loader/loader.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'gestion',
    component: WrapGestionComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'loading',
    component: LoaderComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {path: 'notfound', component: PageNotFoundComponent},
  {
    path: '**',
    redirectTo: 'notfound',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
