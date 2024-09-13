import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../../utils/types/user.types';
import { AuthService } from '../../../utils/services/auth.service';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void { // Changez le type de retour à void
    this.authService.login({ email: this.email, password: this.password }).pipe(
      catchError((error) => {
        console.error('Échec de connexion', error);
        // Ajoutez ici la gestion des erreurs pour l'utilisateur
        return EMPTY;
      })
    ).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Erreur inattendue', err);
        // Gérez l'erreur ici
      }
    });
  }
}
