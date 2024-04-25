import { environment } from './../environments/environment';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideToastr } from 'ngx-toastr';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
    ),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    importProvidersFrom(AngularFireAuth),
    provideToastr(),
    provideAnimationsAsync(),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    importProvidersFrom(provideStorage(() => getStorage())),
  ],
};
