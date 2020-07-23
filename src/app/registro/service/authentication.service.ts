import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase';
import { UsuarioI } from '../model/usuario';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  async SignIn(email, password) {
    return await this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/servicios');
        });
      }).catch((error) => {
        window.alert('No hay ningún registro de usuario que corresponda al correo electrónico ingresado. El usuario puede haber sido eliminado. (Si te registraste con una cuenta de Google o Facebook, puedes proban haciendo click en el boton correspondiente)')
      })
  }

  async SignUp(email, password) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert('El correo electronico ingresado no esta registrado o es incorrecto')
      })
  }

  async SendVerificationMail() {
    return (await this.afAuth.currentUser).sendEmailVerification()
    .then(() => {
      this.router.navigate(['email-verificacion']);
    })
  }

  async ForgotPassword(passwordResetEmail) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Se ha enviado al correo electrónico un enlace para restablecer la contraseña, comprueba tu bandeja de entrada.');
    }).catch((error) => {
      window.alert('Error: No existe un registro de usuario correspondiente al correo electrónico ingresado. El usuario puede haber sido borrado')
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }


  async AuthLogin(provider) {
    return await this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['/servicios']);
        })
      // this.SetUserData(result.user);
    }).catch((error) => {

      window.alert(error)
    })
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuarios/${user.uid}`);
    const userData: UsuarioI = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      role:'Usuario',
      telephone:"+593"
    }
    return userRef.set(userData, {
      merge: true
    })
  }


  async SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['ingreso']);
    })
  }
}
