import { UploadService } from './../../../services/upload.service';
import { UserService } from './../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from './../../../services/global';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public user: User;
  public status: string;
  public identity;
  public token;
  public url = GLOBAL.url;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService,
  ) {
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
  }

  updateUser() {
    this._userService.updateUser(this.user).subscribe(
      response => {
        if (!response.user) {
          this.status = 'error';
        }
        else {
          this.status = 'success'
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;
          this.router.navigate(['/profile', this.user._id]);
        }
      },
      error => {
        this.status = 'error';
        {console.log(<any>error);}
      }
    );
  }


}
