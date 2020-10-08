import { GLOBAL } from './../../../services/global';
import { MessageService } from './../../../services/message.service';
import { UserService } from './../../../services/user.service';
import { FollowService } from './../../../services/follow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public message: Message;
  public identity;
  public token;
  public url: string;
  public status: string;
  public follows;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _followService: FollowService,
    private _messageService: MessageService,
    private _userService: UserService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.message = new Message('', '', '', '', this.identity._id, '');
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    this.getMyFollows();
  }

  getMyFollows() {
    this._followService.getMyFollows(this.token).subscribe(
      response => {
        this.follows = response.follows;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  newMessage(form) {
    this._messageService.saveMessage(this.token, this.message).subscribe(
      response => {
        this.status = 'success';
        form.reset();
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

}
