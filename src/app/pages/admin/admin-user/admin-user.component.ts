import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../utils/services/user.service';
import { User } from '../../../utils/types/user.types';

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => this.users = users,
      error: (error) => console.error('Error fetching users', error)
    });
  }

  editUser(id: number): void {
    console.log(`Editing user with id: ${id}`);
  }

  deleteUser(id: number): void {
    console.log(`Deleting user with id: ${id}`);
    this.userService.deleteUser(id);
    // this.loadUsers();
  }
}
