import { UsersProfileComponent } from './components/users-profile/users-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SentComponent } from './messages/components/sent/sent.component';
import { ReceivedComponent } from './messages/components/received/received.component';
import { AddComponent } from './messages/components/add/add.component';
import { MainComponent } from './messages/components/main/main.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { UsersComponent } from './components/users/users.component';
import { UpdateImageComponent } from './components/auth/update-image/update-image.component';
import { UserEditComponent } from './components/auth/user-edit/user-edit.component';
import { UserGuard } from './services/user.guard';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FollowingComponent } from './components/follow/following/following.component';
import { FollowedComponent } from './components/follow/followed/followed.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile/:id', component: ProfileComponent, canActivate: [UserGuard]},
  {path: 'user-edit', component: UserEditComponent, canActivate: [UserGuard]},
  {path: 'update-image', component: UpdateImageComponent, canActivate: [UserGuard]},
  {path: 'users/:page', component: UsersComponent, canActivate: [UserGuard]},
  {path: 'users', component: UsersComponent, canActivate: [UserGuard]},
  {path: 'users-profile/:id', component: UsersProfileComponent, canActivate: [UserGuard]},
  {path: 'timeline', component: TimelineComponent, canActivate: [UserGuard]},
  {path: 'following/:id/:page', component: FollowingComponent, canActivate: [UserGuard]},
  {path: 'followed/:id/:page', component: FollowedComponent, canActivate: [UserGuard]},
  {
    path: 'messages', component: MainComponent,
    children: [
        { path: '', redirectTo: 'received', pathMatch: 'full' },
        { path: 'send', component: AddComponent, canActivate: [UserGuard] },
        { path: 'received', component: ReceivedComponent, canActivate: [UserGuard] },
        { path: 'received/:page', component: ReceivedComponent, canActivate: [UserGuard] },
        { path: 'sent', component: SentComponent, canActivate: [UserGuard] },
        { path: 'sent/:page', component: SentComponent, canActivate:[UserGuard] }
    ]
},
{path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
