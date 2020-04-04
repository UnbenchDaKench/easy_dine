<template>
  <f7-page dark.template name="home">
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <p class="navbarTitle">Restaurants Lists</p>
      </f7-nav-left>
      <f7-nav-right>
        <!-- button to reload the restaurants list after a scan for now -->
        <f7-button round fill raised @click="getRests">Reload</f7-button>
        <f7-link
          icon-ios="f7:menu"
          icon-aurora="f7:menu"
          icon-md="material:tune"
          panel-open="right"
        ></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <!-- displays if not logged in -->
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
    <!-- displays if logged in -->
    <div class="container" v-if="loggedIn">
      <span v-for="(items, index) in restaurants" :key="index">
        <f7-card class="header">
          <f7-card-header
            class="title"
            valign="bottom"
            >{{ items.name }}
          </f7-card-header>
          <f7-card-content>
            <p>{{ items.address }}</p>
          </f7-card-content>
          <f7-card-footer class="footer">
            <f7-link>Like</f7-link>
            <f7-link>Read more</f7-link>
          </f7-card-footer>
        </f7-card>
      </span>

      <div v-if="noRests">
        <f7-block>
          <p>
            You have no Restaurants! Scan a restaurants qr code to add it to
            your list, then hit reload!
          </p>
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
          </f7-list>
          <f7-list>
            <f7-list-button title="Sign Up!" @click="signUp"></f7-list-button>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>

    <f7-panel right reveal>
      <f7-view>
        <f7-page>
          <f7-navbar title="Settings"></f7-navbar>
          <f7-block v-if="notLoggedIn">
            <f7-button fill raised login-screen-open="#my-login-screen"
              >Login</f7-button
            >
          </f7-block>
          <f7-block v-if="loggedIn">
            <f7-button @click="logout" fill raised>Logout</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-panel>
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
      loggedIn: false,
      
    };
  },
  created() {
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.email = user.email;
        this.uID = user.uid;
        this.loggedIn = true;
        this.notLoggedIn = false;
         
        this.getRests();
      } else {
        this.loggedIn = false;
        this.notLoggedIn = true;
      }
    });
  },

  methods: {
    async getRests() {
      //gets the list of restaurants from the users account
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

      if (this.restaurants.length == 0) {
        this.noRests = true;
      } else {
        this.noRests = false;
      }
    },
    login(e) {
      //logs a user in if they arent logged in
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
            this.$f7.dialog.alert("something went wrong over here");
            console.log(err.message)
          }
        );

      this.notLoggedIn = false;
      this.loggedIn = true;
    },
    async createUser() {
      //creates the users document within the 'users' collection
      firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.email = user.email;
        this.uID = user.uid;
        this.loggedIn = true;
        this.notLoggedIn = false;
        console.log("userId: ", this.uID)
        console.log("email: ", this.email)
        console.log("username: ", this.username)
        console.log("password: ", this.password)
        users.doc(this.uID).set({
          name: this.name,
          email: this.email,
          username: this.username,
          password: this.password
        });
        this.getRests();
      } else {
        this.loggedIn = false;
        this.notLoggedIn = true;
      }
    });
    },
    signUp(e) {
      //creates a new account for a new user
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(function(err) {
          this.$f7.dialog.alert(err.message);
        });

      

      this.loggedIn = true;
      this.notLoggedIn = false;
      this.createUser();

      this.$f7.dialog.alert("Account created for: " + this.email, () => {
        this.$f7.loginScreen.close();
        this.$f7.loginScreen.close();
      });
    },
    logout() {
      //logs out of the current account logged in
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.loggedIn = false;
          this.notLoggedIn = true;
          this.$f7.dialog.alert("succesfully Signed out!");
        })
        .catch(error => {
          console.log(error);
        });
    },
    
  }
};
</script>
<style>
.container {
  display: table;
  width: 100%;
}

.header {
  border-style: solid;
  border-color: rgba(194, 56, 56, 0.3);
  border-width: 2px;
}

.title {
  font-size: 16pt;
  font-weight: bold;
  background: #f1f1f1;
}
.footer {
  background: #f1f1f1;
}
.navbarTitle {
  font-size: 18pt;
  font-weight: bold;
  padding-left: 4px;
}
</style>
