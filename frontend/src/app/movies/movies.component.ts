import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getApiData();
  }

  getApiData() {
    this.apiService.getAPIData().then( res => {
      this.movies = res["results"];
    }).catch(err => {
      console.log(err);
    });
  }
}
