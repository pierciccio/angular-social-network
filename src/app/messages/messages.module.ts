import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { UserGuard } from './../services/user.guard';
import { UserService } from './../services/user.service';
import { MomentModule } from 'angular2-moment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { SentComponent } from './components/sent/sent.component';
import { ReceivedComponent } from './components/received/received.component';
import { FormsModule } from '@angular/forms';
import { MessagesRoutingModule } from './messages.routing';



@NgModule({
  declarations: [
    MainComponent, 
    AddComponent, 
    SentComponent, 
    ReceivedComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MomentModule,
    CommonModule,
    MessagesRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule
  ],
  exports: [
    MainComponent,
    AddComponent,
    SentComponent,
    ReceivedComponent
  ],
  providers: [
    UserService,
    UserGuard
  ]
})
export class MessagesModule { }
