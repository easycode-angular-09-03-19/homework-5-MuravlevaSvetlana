import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from '../../interfaces/Album';
import { AlbumEventsService } from '../../services/album-events.service';


@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.css']
})
export class AlbumItemComponent implements OnInit {
  @Input() item: Album;
  @Output() deleteId: EventEmitter<number> = new EventEmitter<number>();
  clasedit = false;
  constructor(
    public albumEventServices: AlbumEventsService
  ) { }

  ngOnInit() {
    this.albumEventServices.albumUpdateEditObservableSubject.subscribe((value: Album) => {  
      if (value.id) {
        this.clasedit = false;
      }
    });
  }

  delete() {
    this.deleteId.emit(this.item.id);
  }

  edit() {
    this.clasedit = !this.clasedit;
    this.item.id = this.item.id * -1;
    this.albumEventServices.emitEditItem(this.item);
  }
}
