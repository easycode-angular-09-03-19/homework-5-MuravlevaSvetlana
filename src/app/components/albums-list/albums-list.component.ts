import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import { Album } from '../../interfaces/Album';
import { AlbumEventsService } from '../../services/album-events.service';
import { AlertMessageService } from '../../services/alert-message.service';


@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {
  albums: Album[];
  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService,
    public messageService: AlertMessageService
  ) { }

  ngOnInit() {
    this.albumService.getAlbums().subscribe((data: Album[]) => {
      this.albums = data;
      console.log(data);
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('complete');
    });

    this.albumEvents.albumAddEventObservableSubject.subscribe((data: Album) => {
      console.log('AlbumsListComponent:',data);
      if (data.title) {
        this.albums.unshift(data);
      }
    });

    this.albumEvents.albumUpdateEditObservableSubject.subscribe((data: Album) => {
      if (data.id) {
        this.albums.map((item) => {
          if (data.id == item.id) {
            item.title = data.title;
            item.userId = data.userId;
          }
        });
      }
    })
  }

  deleteAlbum(id: number) {
    this.albumService.deleteAlbum(id).subscribe(() => {
      for (let i = 0; i < this.albums.length; i++) {
        if (this.albums[i].id === id) {
          this.messageService.emitShowMessage(this.albums[i].id);
          this.albums.splice(i, 1);
          return;
        }
      }
    });
  }
} 
