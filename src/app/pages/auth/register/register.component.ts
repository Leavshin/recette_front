import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../utils/services/auth.service';
import {catchError} from "rxjs/operators";
import {EMPTY} from "rxjs";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      console.error('Les mots de passe ne correspondent pas');
      // Ajoutez ici la gestion des erreurs pour l'utilisateur
      return;
    }

    this.authService.register({ email: this.email, password: this.password }).pipe(
      catchError((error) => {
        console.error("Échec de l'inscription", error);
        return EMPTY;
      })
    ).subscribe({
      next: (isValid) => {
        if(isValid) {
          this.router.navigate(['/auth/login']);
        } else {
          alert("Votre email est déjà utilisé");
        }
      },
      error: (err) => {
        console.error('Erreur inattendue', err);
      }
    });
  }
}
