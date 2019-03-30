import { Component, OnInit, ViewChild } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import { AlbumEventsService } from '../../services/album-events.service';
import { Album } from '../../interfaces/Album';
import { NgForm } from '@angular/forms';
import { AlertMessageService } from '../../services/alert-message.service';


@Component({
  selector: 'app-add-album-form',
  templateUrl: './add-album-form.component.html',
  styleUrls: ['./add-album-form.component.css']
})
export class AddAlbumFormComponent implements OnInit {
  album = {
    title: '',
    userId: 0,
    id: 0
  };
  classedit = false;
  @ViewChild('addAlbumForm') form: NgForm;
  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService,
    public messageService: AlertMessageService
  ) { }

  ngOnInit() {
    this.albumEvents.albumEditObservableSubject.subscribe((item: Album) => {
      if(item.id < 0) {
        this.album.userId = item.userId;
        this.album.title = item.title;
        this.album.id = item.id;
        this.classedit = !this.classedit;
      }
    });
  }

  onFormSubmit() {
    const newAlbum = {
      userId: 1,
      title: this.album.title
    };

    if (this.album.id < 0) {
      this.album.id = (this.album.id * -1);
      const updAlbum = {
        userId: this.album.userId,
        title: this.album.title,
        id: this.album.id
      }
      this.albumService.editAlbum(updAlbum).subscribe((data: {}) => {
        this.albumEvents.emitUpdtItem(updAlbum);
        this.messageService.emitShowMessage(updAlbum);
        this.form.resetForm();
        this.classedit = false;
      });

    } else {
      this.albumService.addNewAlbum(newAlbum).subscribe((data: Album) => {
        console.log('Get data FormComponent');
        this.albumEvents.emitAddNewAlbum(data);
        this.form.resetForm();
      });
    }
  }
}
