import { MessagesModule } from './messages/messages.module';
import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import { MomentModule } from 'angular2-moment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { UserEditComponent } from './components/auth/user-edit/user-edit.component';
import { UpdateImageComponent } from './components/auth/update-image/update-image.component';
import { FollowedComponent } from './components/follow/followed/followed.component';
import { FollowingComponent } from './components/follow/following/following.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { NewPublicationComponent } from './components/publications/new-publication/new-publication.component';
import { ListPublicationComponent } from './components/publications/list-publication/list-publication.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UsersProfileComponent } from './components/users-profile/users-profile.component';
import { UsersPublicationsComponent } from './components/users-publications/users-publications.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    UserEditComponent,
    UpdateImageComponent,
    FollowedComponent,
    FollowingComponent,
    UsersComponent,
    TimelineComponent,
    NewPublicationComponent,
    ListPublicationComponent,
    NotFoundComponent,
    UsersProfileComponent,
    UsersPublicationsComponent    
  ],
  
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MomentModule,
    MessagesModule
  ],
  providers: [UserGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
