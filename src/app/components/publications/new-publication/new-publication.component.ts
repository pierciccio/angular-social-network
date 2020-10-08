import { GLOBAL } from './../../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from './../../../services/upload.service';
import { PublicationService } from './../../../services/publication.service';
import { UserService } from './../../../services/user.service';
import { Publication } from './../../../models/publication';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-publication',
  templateUrl: './new-publication.component.html',
  styleUrls: ['./new-publication.component.css']
})
export class NewPublicationComponent implements OnInit {

  public identity;
  public token;
  public stats;
  public url;
  public status;
  public publication: Publication;


  constructor(
    private _userService: UserService,
    private _publicationService: PublicationService,
    private _uploadService: UploadService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.publication = new Publication('', '', '', '', this.identity._id);
   }

  ngOnInit(): void {
  }

  public filesToUpload: Array<File>;
  filechangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  // Output
  @Output() sended = new EventEmitter();

  sendPublication(event) {
    this.sended.emit({ send: 'true' });
    console.log(event)
  }

  savePublication(form, $event) {
    this._publicationService.addPublication(this.token, this.publication).subscribe(
      response => {
        if (response.publication) {
          if(this.filesToUpload && this.filesToUpload.length) {
            this._uploadService.makeFileRequest(this.url + 'upload-image-pub/' + response.publication._id, [],
            this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              this.publication.file = result.image;
              this.status = 'success';
              form.reset();
              this.sended.emit({send: 'true'});
            });
          }
          else {
            this.status = 'success';
              form.reset();
              this.sended.emit({send: 'true'});
          }
        }
        else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error'
      }
    );
  }

}
