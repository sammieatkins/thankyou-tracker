import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  email = '';
  password = '';
  isLoginMode = true;
  message = '';
  @Output() loginStatusChanged = new EventEmitter<boolean>();

  constructor(private auth: Auth) {} // ✅ FIXED

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.message = '';
  }

  async onSubmit() {
    try {
      if (this.isLoginMode) {
        await signInWithEmailAndPassword(this.auth, this.email, this.password);
        this.message = 'Logged in!';
      } else {
        await createUserWithEmailAndPassword(
          this.auth,
          this.email,
          this.password
        );
        this.message = 'Signed up!';
      }

      this.loginStatusChanged.emit(true);
    } catch (err: any) {
      this.message = err.message || 'Something went wrong.';
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.loginStatusChanged.emit(false);
      this.message = 'Logged out!';
      this.email = '';
      this.password = '';
    } catch (err: any) {
      this.message = err.message || 'Logout failed.';
    }
  }
}
