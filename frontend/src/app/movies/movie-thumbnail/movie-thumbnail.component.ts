import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-thumbnail',
  templateUrl: './movie-thumbnail.component.html',
  styleUrls: ['./movie-thumbnail.component.scss']
})
export class MovieThumbnailComponent implements OnInit {
  @Input() movie;

  constructor(
  ) { }

  ngOnInit() {
    console.log(this.movie);
    
  }


}
