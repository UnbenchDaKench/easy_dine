<template>
  <f7-page name="home">
    <f7-navbar title="Restaurants Lists">
      <f7-button fill raised @click="getRests">Reload</f7-button>
    </f7-navbar>
    <f7-block v-if="notLoggedIn" strong inset>
      <f7-button
        @click="getRests"
        login-screen-open="#my-login-screen"
        fill
        raised
        >Login</f7-button
      >
      <div>
        <p>log in to see your list of restaurants</p>
      </div>
    </f7-block>
    <div v-if="loggedIn">
      <span v-for="(items, index) in restaurants" :key="index">
        <f7-card class="demo-card-header-pic">
          <f7-card-header
            class="no-border"
            valign="bottom"
            style="background-image:url(src/pages/restaurant A.jpg)"
            >{{ items.name }}
            </f7-card-header>
          <f7-card-content>
            <p>{{ items.address }}</p>
          </f7-card-content>
          <f7-card-footer>
            <f7-link>Like</f7-link>
            <f7-link>Read more</f7-link>
          </f7-card-footer>
        </f7-card>
      </span>
      <div v-if="noRests">
        <f7-block>
          <p>You have no Restaurants! Scan a restaurants qr code to add it to your list, then hit reload!</p>
        </f7-block>
      </div>
    </div>

    <f7-login-screen id="my-login-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <f7-list form>
            <f7-list-input
              type="text"
              name="email"
              placeholder="Your email"
              v-model="email"
              @input="email = $event.target.value"
            ></f7-list-input>
            <f7-list-input
              type="password"
              name="password"
              placeholder="Your password"
              v-model="password"
              @input="password = $event.target.value"
            ></f7-list-input>
            <!-- @input="password = $event.target.value" -->
            <!-- @input="username = $event.target.value" -->
          </f7-list>
          <f7-list>
            <f7-list-button title="login" @click="login"></f7-list-button>

            <f7-list-item>dont have an account?</f7-list-item>
            <f7-list-button
              title="Sign Up!"
              login-screen-open="#my-signup-screen"
            ></f7-list-button>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>

    <f7-login-screen id="my-signup-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Sign Up!</f7-login-screen-title>
          <f7-list form>
            <f7-list-input
              type="text"
              name="name"
              placeholder="Your full name"
              v-model="name"
              @input="name = $event.target.value"
            ></f7-list-input>
            <f7-list-input
              type="text"
              name="username"
              placeholder="Your username"
              v-model="username"
              @input="username = $event.target.value"
            ></f7-list-input>
            <f7-list-input
              type="text"
              name="email"
              placeholder="Your email"
              v-model="email"
              @input="email = $event.target.value"
            ></f7-list-input>
            <f7-list-input
              type="password"
              name="password"
              placeholder="Your password"
              v-model="password"
              @input="password = $event.target.value"
            ></f7-list-input>
            <!-- @input="password = $event.target.value" -->
            <!-- @input="username = $event.target.value" -->
          </f7-list>
          <f7-list>
            <f7-list-button title="Sign Up!" @click="signUp"></f7-list-button>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>
  </f7-page>
</template>
<script>
import { users } from "../js/firebase";
import { restaurantsRef } from "../js/firebase";
import firebase from "firebase";

export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      name: "",
      uID: "",
      key: "",
      restaurants: [],
      noRests: false,
      notLoggedIn: true,
      loggedIn: false
    };
  },
  created() {
    //var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.email = user.email;
        this.uID = user.uid;
        this.loggedIn = true;
        this.notLoggedIn = false;
        this.getRests();
      } else {
        this.$f7.dialog.alert("no user logged in");
        this.loggedIn = false;
        this.notLoggedIn = true;
      }
    });
    /* firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithEmailAndPassword(email, password);
        this.$f7.dialog.alert('logged in');
        this.loggedIn = true;
        this.notLoggedIn = false;
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      }); */
    /* if (user) {
      this.loggedIn = true;
      this.notLoggedIn = false;
    } else {
      this.$f7.dialog.alert('no user logged in');
      this.loggedIn = false;
      this.notLoggedIn = true;
    } */
  },
  firebase: {},
  /* computed() {
     items: function(){
      return this.restaurants
    } 
  }, */
  methods: {
    async getRests() {
      try {
        const { docs } = await users
          .doc(this.uID)
          .collection("restaurants")
          .get();

        this.restaurants = docs.map(doc => {
          const { id } = doc;
          const data = doc.data();
          return { id, ...data };
        });
        console.log("lodaded restaurants", this.restaurants);
      } catch (error) {
        throw new Error("something went wrong");
      }

      if(this.restaurants.length == 0){
        this.noRests = true;
      }
      else{
        this.noRests = false;
      }
    },
    login(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$f7.dialog.alert("you are logged in as: " + this.email, () => {
              this.$f7.loginScreen.close();
            });
          },
          err => {
            this.$f7.dialog.alert(err.message);
          }
        );

      /* users.add({
        username: this.username,
        password: this.password,
        edit: false
      });

      this.$f7.dialog.alert(
        "Username: " + this.username + "<br>Password: " + this.password,
        () => {
          this.$f7.loginScreen.close();
        }
      ); */
      this.notLoggedIn = false;
      this.loggedIn = true;
    },
    signUp(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(function(err) {
          this.$f7.dialog.alert(err.message);
        });

      var user = firebase.auth().currentUser;
      //firebase.auth().onAuthStateChanged(function(user){
      if (user) {
        this.uID = user.uid;
        console.log(this.uID);
        this.email = user.email;
      } else {
        this.$f7.dialog.alert("Error Creating Account: " + this.email, () => {
          this.$f7.loginScreen.close();
          this.$f7.loginScreen.close();
        });
      }
      //});
      users.doc(this.uID).set({
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password
      });

      this.loggedIn = true;
      this.notLoggedIn = false;
      this.$f7.dialog.alert("Account created for: " + this.username, () => {
        this.$f7.loginScreen.close();
        this.$f7.loginScreen.close();
      });
    },
    addRestaurant() {
      restaurants.add({
        restaurant: this.restaurant
      });
    }
  },
  props: {
    /* notLoggedIn: {
      type: Boolean,
      default: true
    } */
  }
};
</script>
