import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { User } from '../user-form/user-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
  board: string[] = ['', '', '', '', '', '', '', '', ''];
  currentPlayer: 'X' | 'O' = 'X';
  winner: 'X' | 'O' | 'Tie' | null = null;

  user: User = {
    email: 'user@example.com', // Replace with actual user email
    name: 'User Name',
    wins: 0 // Replace with actual user name
  };
  get wins(): number {
    return this.service.win;
  }

  constructor(private http: HttpClient, private service: ApiService, private router: Router) { }

  ngOnInit(): void {
    //check user is logedin or not
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        this.user = JSON.parse(userString) as User;
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    } else {
      this.router.navigate(['/user']);
    }
    this.service.win = this.user.wins;

  }

  makeMove(index: number): void {
    if (this.board[index] === '' && !this.winner) {
      this.board[index] = this.currentPlayer;
      if (this.checkWinner()) {
        this.winner = this.currentPlayer;
        this.updateUserWins();
      } else if (this.board.every(cell => cell !== '')) {
        this.winner = 'Tie';
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        if (this.currentPlayer === 'O') {
          this.aiMove(); // AI makes a move
        }
      }
    }
  }

  aiMove(): void {
    setTimeout(() => {
      const emptyIndices = this.board
        .map((cell, index) => (cell === '' ? index : -1))
        .filter(index => index !== -1);

      if (emptyIndices.length > 0) {
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        this.board[randomIndex] = 'O'; // AI plays 'O'
        if (this.checkWinner()) {
          this.winner = 'O';
          // this.updateUserWins(); // Optional: update user wins if AI wins (for testing)
        } else if (this.board.every(cell => cell !== '')) {
          this.winner = 'Tie';
        } else {
          this.currentPlayer = 'X'; // Switch back to human player
        }
      }
    }, 500);

  }

  checkWinner(): boolean {
    const winningPatterns = [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Column 1
      [1, 4, 7], // Column 2
      [2, 5, 8], // Column 3
      [0, 4, 8], // Diagonal 1
      [2, 4, 6]  // Diagonal 2
    ];

    return winningPatterns.some(pattern =>
      pattern.every(index => this.board[index] === this.currentPlayer)
    );
  }


  updateUserWins(): void {
    // Update the win count in the backend

    this.http.post<User>('/api/user', { email: this.user.email, name: this.user.name, wins: 1 }).subscribe(
      (response) => {

        if (response != null) {
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(response));
          this.service.win = response.wins;
        }
      }

    );
  }

  resetGame(): void {
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.currentPlayer = 'X';
    this.winner = null;
  }
}
