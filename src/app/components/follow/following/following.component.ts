import { GLOBAL } from './../../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FollowService } from 'src/app/services/follow.service';
import { Follow } from 'src/app/models/follow';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  public url: string;
  public identity;
  public token;
  public status: string;
  public total;
  public pages;
  public users: User[];
  public follows;
  public following;
  public userPageId;
  public user: any;

  public page;
  public next_page;
  public prev_page;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService,
    private _followService: FollowService   
  ) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    this.actualPage();
  }

  actualPage() {
    this.route.params.subscribe(params => {
      let userId = params['id'];
      this.userPageId = userId;
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
      this.getUser(userId, page);
    });
  }

  getFollows(userId, page) {
    this._followService.getFollowing(this.token, userId, page).subscribe(
      response => {
        //console.log(response);
        if (!response.follows) {
          this.status = 'error';
        } else {
          this.total = response.total;
          this.following = response.follows;
          this.pages = response.pages;
          this.follows = response.users_following;
          //console.log(this.follows);
          if (page > this.pages) {
            this.router.navigate(['/users', 1]);
          }
        }
      }, 
      error => {
        console.log(<any>error),
        this.status = 'error';
       }
    );
  }

  public followUserOver;

  mouseEnter(user_id) {
    this.followUserOver = user_id;
  }
  mouseLeave(user_id) {
    this.followUserOver = 0;
  }

  followUser(followed) {
    var follow = new Follow('', this.identity._id, followed);
    this._followService.addFollow(this.token, follow).subscribe(
      response => {
        if (!response) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.follows.push(response.follow.followed);
        }
      }, 
      error => {
        console.log(<any>error),
        this.status = 'error'; }
    );
  }

  unfollowUser(id) {
    this._followService.deleteFollow(this.token, id).subscribe(
      response => {
        var search = this.follows.indexOf(id);
        if (search >= 0) {
          this.follows.splice(search, 1);
        }
      },
       error => {
        console.log(<any>error),
        this.status = 'error';
      }
    );
  }



  getUser(userId, page) {

    this._userService.getUser(userId).subscribe(
      response => {
        if (response.user) {
          this.user = response.user;
            this.getFollows(userId, page);
        } else {
          this.router.navigate(['/']);
        }
      },
       error => {
        console.log(<any>error);
      }
    );
  }

}
