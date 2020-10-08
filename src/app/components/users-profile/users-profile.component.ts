import { Follow } from './../../models/follow';
import { GLOBAL } from './../../services/global';
import { FollowService } from './../../services/follow.service';
import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  public user: User;
  public status: string;
  public identity;
  public token;
  public stats;
  public url;
  public followed;
  public following;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService,
    private _followService: FollowService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.followed = false;
    this.following = false;
   }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.getUser(id);
      this.getCounters(id);
    });
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(
      response => {
        if (response.user) {
          this.user = response.user;     

          if(response.following) {
            this.following = true;
          }
          else {
            this.following = false;
          }
          if (response.followed){
            this.followed = true;
          }
          else {
            this.followed = false;
          }
        }
        else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.router.navigate(['/profile', this.identity._id]);
      }
    );
  }

  getCounters(id) {
    this._userService.getCounters(id).subscribe(
      response => {
        this.stats = response;
      }, 
      error => {
        console.log(<any>error);
      }
    );
  }

  followUser(followed) {
    var follow = new Follow('', this.identity._id, followed);
    this._followService.addFollow(this.token, follow).subscribe(
      response => {
        this.following = true;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  unfollowUser(followed) {
    this._followService.deleteFollow(this.token, followed).subscribe(
      response => {
        this.following = true;
      },
      error => {
        console.log(<any>error); 
      }
    );
  }

  public followUserOver;

  mouseEnter(user_id) {
    this.followUserOver = user_id;
  }

  mouseLeave() {
    this.followUserOver = 0;
  }

}
