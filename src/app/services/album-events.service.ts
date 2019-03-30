import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Album } from '../interfaces/Album';


@Injectable({
  providedIn: 'root'
})
export class AlbumEventsService {
  private albumAddEventSource = new BehaviorSubject({});
  public  albumAddEventObservableSubject = this.albumAddEventSource.asObservable();

  private albumMessageDeleteSource = new BehaviorSubject({});
  public  albumMessageDeleteObservableSubject = this.albumMessageDeleteSource.asObservable();

  private albumEditSource = new BehaviorSubject({});
  public  albumEditObservableSubject = this.albumEditSource.asObservable();

  private albumUpdateEditSource = new BehaviorSubject({});
  public  albumUpdateEditObservableSubject = this.albumUpdateEditSource.asObservable();

  constructor() {}

  emitAddNewAlbum(value: Album) {
    this.albumAddEventSource.next(value);
  }

  emitDeleteAlbum(id: number) {
    this.albumMessageDeleteSource.next(id);
  }

  emitEditItem(value: Album) {
    this.albumEditSource.next(value);
  }

  emitUpdtItem(value: Album) {
    this.albumUpdateEditSource.next(value);
  }
}
