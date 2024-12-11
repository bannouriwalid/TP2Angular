import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @Input() users: { name: string; age: number; fiboValue?: number }[] = [];
  @Input() usersCluster: string = '';
  @Output() add = new EventEmitter<string>();

  userForm: FormGroup;
  private fiboCache: { [key: number]: number } = {};

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      userFullName: ['']
    });
  }

  fibo(n: number): number {
    if (n <= 1) return n;
    if (this.fiboCache[n]) return this.fiboCache[n];
    this.fiboCache[n] = this.fibo(n - 1) + this.fibo(n - 2);
    return this.fiboCache[n];
  }

  addUser(): void {
    const userFullName = this.userForm.get('userFullName')?.value;
    if (userFullName) {
      const age = Math.floor(Math.random() * 60); 
      const fiboValue = this.fibo(age);
      this.users = [...this.users, { name: userFullName, age, fiboValue }];
      this.userForm.reset();
    }
  }
}  
