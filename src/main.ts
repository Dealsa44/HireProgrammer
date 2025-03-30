import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { AppComponent } from './app/app.component';
import { AuthGuard } from './app/auth/auth.guard';
import { AuthService } from './app/auth/auth.services';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withHashLocation()),
    AuthService,
    AuthGuard,
  ],
}).catch((err) => console.error(err));
