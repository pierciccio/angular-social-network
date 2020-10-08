import { GLOBAL } from './../../../services/global';
import { UserService } from './../../../services/user.service';
import { MessageService } from './../../../services/message.service';
import { FollowService } from './../../../services/follow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  public messages: Message;
  public identity;
  public token;
  public url: string;
  public status: string;
  public follows;

  public pages;
  public total;
  public page;
  public next_page;
  public prev_page;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _followService: FollowService,
    private _messageService: MessageService,
    private _userService: UserService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    this.actualPage();
  }

  actualPage() {
    this.route.params.subscribe(params => {
      let page = +params['page'];
      this.page = page;
      if (!params['page']) {
        page = 1;
      }
      if (!page) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;
        if (this.prev_page <= 0) {
          this.prev_page = 1;
        }
      }
      this.getMessages(this.token, this.page);
    });
  }

  getMessages(token, page) {
    this._messageService.getEmitterMessages(this.token, page).subscribe(
      response => {
        this.messages = response.messages;
        this.total = response.total;
        this.pages = response.pages;
      }, 
      error => {
        console.log(<any>error)
      }
    );
  }
}
