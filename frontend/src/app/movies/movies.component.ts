import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: any = [
    { id: '1', title: 'Title 1', image: 'assets/img1', year: 2020 },
    { id: '2', title: 'Title 2', image: 'assets/img2', year: 2019 },
    { id: '3', title: 'Title 3', image: 'assets/img3', year: 2018 },
    { id: '4', title: 'Title 4', image: 'assets/img4', year: 2021 },
    { id: '5', title: 'Title 5', image: 'assets/img5', year: 2040 },
    { id: '6', title: 'Title 6', image: 'assets/img5', year: 2009 },
  ];

  constructor() { }

  ngOnInit() {
  }

}
