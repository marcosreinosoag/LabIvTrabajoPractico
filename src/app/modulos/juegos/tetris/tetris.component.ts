import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';
import { UsuarioService } from '../../../services/usuario.service';

const supabase = createClient(environment.apiUrl, environment.publicAnonKey);

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss'],
  standalone: false
})
export class TetrisComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  board: number[][] = [];
  rows = 20;
  cols = 10;
  blockSize = 30;
  score = 0;
  showRetry = false;
  mejoresPuntajes: any[] = [];

  colors = ['black', 'cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'];

  pieces = [
    [[1, 1, 1, 1]],
    [[2, 0, 0], [2, 2, 2]],
    [[0, 0, 3], [3, 3, 3]],
    [[4, 4], [4, 4]],
    [[0, 5, 5], [5, 5, 0]],
    [[0, 6, 0], [6, 6, 6]],
    [[7, 7, 0], [0, 7, 7]]
  ];

  current: any;
  pos = { x: 3, y: 0 };
  intervalId: any;
  gameRunning = true;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.scale(this.blockSize, this.blockSize);
    this.resetBoard();
    this.spawnPiece();
    this.update();
  }

  resetBoard() {
    this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
  }

  spawnPiece() {
    const index = Math.floor(Math.random() * this.pieces.length);
    this.current = this.pieces[index];
    this.pos = { x: 3, y: 0 };
  }

  merge() {
    this.current.forEach((row: any, y: number) => {
      row.forEach((value: number, x: number) => {
        if (value) {
          this.board[y + this.pos.y][x + this.pos.x] = value;
        }
      });
    });
  }

  collide(): boolean {
    return this.current.some((row: any, y: number) =>
      row.some((value: number, x: number) => {
        return (
          value &&
          (this.board[y + this.pos.y]?.[x + this.pos.x] !== 0) !== false
        );
      })
    );
  }

  rotate() {
    const rotated = this.current[0].map((_: number, i: number) =>
      this.current.map((row: number[]) => row[i])
    ).reverse();

    const previous = this.current;
    this.current = rotated;

    if (this.collide()) {
      this.current = previous;
    }
  }

  move(dir: number) {
    if (!this.gameRunning) return;
    this.pos.x += dir;
    if (this.collide()) this.pos.x -= dir;
  }

  drop() {
    if (!this.gameRunning) return;
    this.pos.y++;
    if (this.collide()) {
      this.pos.y--;
      this.merge();
      this.clearLines();
      this.spawnPiece();
      if (this.collide()) {
        this.endGame();
      }
    }
  }

  clearLines() {
    let cleared = 0;
    this.board = this.board.filter(row => {
      if (row.every(cell => cell)) {
        cleared++;
        return false;
      }
      return true;
    });
    while (this.board.length < this.rows) {
      this.board.unshift(Array(this.cols).fill(0));
    }
    this.score += cleared * 100;
  }

  async endGame() {
    this.gameRunning = false;
    this.showRetry = true;
    const email = this.usuarioService.getEmail();
    if (!email) {
      console.error('No email found for user');
      return;
    }
    await supabase.from('puntajes').insert({
      email,
      puntaje: this.score,
      juego: 'Tetris'
    });
    const { data } = await supabase
      .from('puntajes')
      .select('*')
      .eq('juego', 'tetris')
      .order('puntaje', { ascending: false })
      .limit(5);
    this.mejoresPuntajes = data || [];
  }

  drawMatrix(matrix: number[][], offset: { x: number; y: number }) {
    matrix.forEach((row, y) =>
      row.forEach((value, x) => {
        if (value) {
          this.ctx.fillStyle = this.colors[value];
          this.ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      })
    );
  }

  draw() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.cols, this.rows);
    this.drawMatrix(this.board, { x: 0, y: 0 });
    this.drawMatrix(this.current, this.pos);
  }

  update() {
    if (!this.gameRunning) return;
    this.drop();
    this.draw();
    setTimeout(() => this.update(), 500);
  }

  retry() {
    this.resetBoard();
    this.score = 0;
    this.showRetry = false;
    this.spawnPiece();
    this.gameRunning = true;
    this.update();
  }

  @HostListener('window:keydown', ['$event'])
  handleKey(e: KeyboardEvent) {
    if (!this.gameRunning) return;
    if (e.key === 'ArrowLeft') this.move(-1);
    else if (e.key === 'ArrowRight') this.move(1);
    else if (e.key === 'ArrowDown') this.drop();
    else if (e.key === 'ArrowUp') this.rotate();
  }

  Home() {
    this.router.navigate(['/home']);
  }
}