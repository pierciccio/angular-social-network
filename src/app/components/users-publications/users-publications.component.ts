import { GLOBAL } from './../../services/global';
import { PublicationService } from './../../services/publication.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'app-users-publications',
  templateUrl: './users-publications.component.html',
  styleUrls: ['./users-publications.component.css']
})
export class UsersPublicationsComponent implements OnInit {

  public identity;
  public token;
  public url;
  public status;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public noMore = false;
  public publications: any;
  public showImage;
  @Input() user: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _userService: UserService,
    private _publicationService: PublicationService,
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.page = 1;
  }

  ngOnInit(): void {
    this.getPublications(this.user, this.page);
  }

  getPublications(user, page, adding = false) {
    this._publicationService.getPublicationsUser(this.token, user, page).subscribe(
      response => {
        if (response.publications) {
          this.total = response.total_items;
          this.pages = response.pages;
          this.itemsPerPage = response.items_per_page;
          if (adding === false) {
            this.publications = response.publications;
          } 
          else {
            const arrayA = this.publications;
            const arrayB = response.publications;
            this.publications = arrayA.concat(arrayB);
            $("html, body").animate({ scrollTop: $('html')
            .prop("scrollHeight")}, 500);
          }
        } 
        else {
          this.status = 'error';
        }
      }, 
      error => {
        console.log(<any>error);
        this.status = 'error';
       }
    );
  }

  viewMore() {
    this.page = this.page + 1;
    if (this.page  === this.pages) {
      this.noMore = true;
    } 
    this.getPublications(this.user, this.page, true);
  }

  refresh(event = null) {
    //console.log(event)
    this.getPublications(this.user, 1);
  }

  showThisImage(id) {
    this.showImage = id;
  }

  hideThisImage(id) {
    this.showImage = 0;
  }



}
