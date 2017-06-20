import { Component } from '@angular/core';
// database
import { AngularFireModule } from 'angularfire2';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase/app';
// auth
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  userEmail:string;
  uid:string;
  title = 'app works!';

  // get message
  items: FirebaseListObservable<any>;

  // check auth
  name: Observable<firebase.User>;

  // property binding, which will allow us to clear the text input field after a user hits Enter to submit a new chat message
  msgVal: string = '';

  constructor(public af: AngularFireAuth, private database: AngularFireDatabase){
    // get messages and limit to five results
    this.items = database.list('/messages', {
      query: {
        limitToLast: 5
      }
    });
    // this.name = af.authState;


    // test authentication and assign name
    // this.af.auth.subscribe(auth => {
    //   if(auth) {
    //     this.name = auth;
    //   }
    // });
  }

  chatSend(theirMessage: string) {
      this.items.push({ message: theirMessage, name: this.name});
      this.msgVal = '';
  }

  // provider = new firebase.auth.GoogleAuthProvider();
  loginWithGoogle(){
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
      console.log(result);
      this.name = result.user.displayName;
      this.userEmail = result.user.email;
      this.uid = result.user.uid;
      console.log(this.name);
      console.log(this.userEmail);
      console.log(this.uid);
    })
  }
  logout(){
    this.af.auth.signOut();
    this.name = null;
  }
}
