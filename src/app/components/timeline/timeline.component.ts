import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PublicationService } from '../../services/publication.service';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import * as $ from "jquery";


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _userService: UserService,
    private _publicationService: PublicationService
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.page = 1;
  }

  ngOnInit(): void {
    this.getPublications(this.page);
  }


  getPublications(page, adding = false) {
    this._publicationService.getPublications(this.token, page ).subscribe(
      response => {
        if (response.publications) {
          this.total = response.total_items;
          this.pages = response.pages;
          this.itemsPerPage = response.items_per_page;
          if (adding === false) {
            this.publications = response.publications;
          } else {
            const arrayA = this.publications;
            const arrayB = response.publications;
            this.publications = arrayA.concat(arrayB);
            $("html, body").animate({ scrollTop: $('body')
            .prop("scrollHeight")}, 500);
          }
        } else {
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
    this.getPublications(this.page, true);
  }

  refresh(event = null) {
    //console.log(event)
    this.getPublications(1);
  }

  showThisImage(id) {
    this.showImage = id;
  }

  hideThisImage(id) {
    this.showImage = 0;
  }  

}