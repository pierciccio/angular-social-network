import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User = new User('', '', '', null, '', '', '', 'ROLE_USER', '');
  public status: string;
  hide = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
  }

  register(registerForm) {
    this._userService.register(registerForm.value).subscribe(
      response => {
        if (response.user && response.user._id) {
          this.status = 'success';
          registerForm.reset();
          this.router.navigate(['/login']);
        }
        else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);        
      }
    );
  }

  

}
