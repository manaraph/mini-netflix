import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: object = {};
  movieId: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.movieId = this.router.url.split('/')[2];
    this.getmovie();
  }
  getmovie() {
    this.apiService.getAPIData().then( res => {
      this.movie = res['results'].find(movie => this.movieId === movie.objectId );
      console.log(this.movie);
    }).catch(err => {
      console.log(err);
    });
  }
}
