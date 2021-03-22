import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app'; 
import 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usersCollection: AngularFirestoreCollection<Users>;


  userData: any;

  constructor(private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private toastr: ToastrService) {

      this.usersCollection = this.afs.collection('users');

      this.afAuth.authState.subscribe(user =>{
        if(user){
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })

     }

     SignIn(email, password){
       return this.afAuth.signInWithEmailAndPassword(email, password)
       .then((result)=>{
        
         this.ngZone.run(()=>{
           this.router.navigate(['']);
         });
       }).catch((error)=> {
         window.alert(error.message)
       })
       
     }


    SignUp(email, password, surname, name){
      return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result)=>{
        this.usersCollection.add({
          uid: result.user.uid,
          email: result.user.email,
          displayName: name,
          surname: surname,
          photoURL: result.user.photoURL
        })
        this.router.navigate(['']);
      }).catch((error)=>{
        console.log(error.message)
      })
   }

     get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null) ? true : false;
    }

    GoogleAuth(){
      return this.AuthLogin(new firebase.auth.GoogleAuthProvider())
      
    }

    FacebookAuth(){
      return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
    }

    AuthLogin(provider){
      return this.afAuth.signInWithPopup(provider)
      .then((result)=>{
        this.toastr.success("You have successfully signed in");
        this.ngZone.run(()=>{
          this.router.navigate(['']);
        })
        this.SetUserData(result.user);
      }).catch((error)=>{
        console.log(error.message)
      })
    }

     SetUserData(user){
       const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
       const userData: Users = {
         uid: user.uid,
         email: user.email,
         displayName: user.displayName,
         photoURL: user.photoURL,
       }
       return userRef.set(userData, {
         merge: true
       })
     }

     SingOut(){
       return this.afAuth.signOut().then(()=>{
         localStorage.removeItem('user');
         window.location.reload()
        
       })
     }
}
