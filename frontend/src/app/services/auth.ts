import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
}

const TOKEN_KEY = 'vivaio_token';
const USER_KEY = 'vivaio_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  private userSignal = signal<AuthUser | null>(this.loadUser());
  readonly currentUser = this.userSignal.asReadonly();

  readonly isLoggedIn = computed(() => this.userSignal() !== null);
  readonly isAdmin = computed(() => this.userSignal()?.role === 'admin');

  constructor(private http: HttpClient) {}

  private loadUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  register(data: { name: string; email: string; password: string; phone: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        this.userSignal.set(res.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.userSignal.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
}