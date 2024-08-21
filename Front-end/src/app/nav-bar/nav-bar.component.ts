import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLogin: boolean = false;
  constructor(private router: Router) { }
  ngOnInit(): void {
    var user = localStorage.getItem('user');
    if (user != null) {
      this.isLogin = true;
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/user']);
  }
}
