import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-top-winners',
  templateUrl: './top-winners.component.html',
  styleUrls: ['./top-winners.component.css']
})
export class TopWinnersComponent implements OnInit {
  topWinners: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>('/api/user/top-winners')
      .subscribe(data => this.topWinners = data);
  }
}