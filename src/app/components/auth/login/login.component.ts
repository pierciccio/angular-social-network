import { UserService } from './../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = new User('', '', '', null, '', '', '', 'ROLE_USER', '');
  public status: string;
  hide = true;
  public identity;
  public token;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this._userService.login(this.user).subscribe(
      response => {
        this.identity = response.user;
        this.token = response.token;
        if (!this.identity || !this.identity._id || this.token.length <= 0) {
          this.status = 'error';
        } else {
          localStorage.setItem('identity', JSON.stringify(this.identity));
          localStorage.setItem('token', JSON.stringify(this.token));
          this.getcounters();
        }      
      },
      error => {
        console.log(<any>error);
        this.status = 'error';        
      }
    );
  }

  getcounters() {
    this._userService.getCounters().subscribe(
      response => {
        localStorage.setItem('stats', JSON.stringify(response));
        this.status = 'success';
        this.router.navigate(['/timeline']);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
