import { UserService } from './../../services/user.service';
import { GLOBAL } from './../../services/global';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public identity;
  public url = GLOBAL.url;

  constructor(
    private _userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
  }

  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
