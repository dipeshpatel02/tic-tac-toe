import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User = { email: '', name: '', wins: 0 };


  constructor(private router: Router, private http: HttpClient, private service: ApiService) { }

  ngOnInit(): void {
    //if user is already logedIn no need to come agin and filled this form
    var user = localStorage.getItem('user');
    if (user != null) {
      this.router.navigate(['/game']);
    }
  }

  onSubmit() {
    // Save the user data to localStorage (or pass it to a service)
    this.http.post<User>('/api/user', { email: this.user.email, name: this.user.name, wins: 0 }).subscribe(
      (response) => {
        debugger;
        if (response != null) {
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/game']);
          this.service.win = response.wins;
        }
      }
    );

    // Navigate to the game component

  }
}

export class User {
  constructor(email: string, name: string, wins: number) {
    this.email = email,
      this.name = name,
      this.wins = wins
  }
  email: string;
  name: string;
  wins: number;
}