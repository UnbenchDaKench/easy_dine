<template>
  <f7-page name="Scan" style="background: none transparent;">
    <f7-navbar title="Restaurant Scanner"></f7-navbar>
    <f7-block>
      <!-- displays if user is not logged in -->
      <f7-button
        v-if="notLoggedIn"
        login-screen-open="#my-login-screen"
        fill
        raised
        >scan</f7-button
      >
    </f7-block>
    <!-- displays if user is logged in -->
    <f7-block v-if="loggedIn" strong inset>
      <div class="blink">
        <p class="error">{{ error }}</p>

        <p class="decode-result">
          Last result: <b>{{ result }}</b>
        </p>
      </div>
      <div class="qr-overlay">
        <qrcode-stream @decode="onDecode" @onInit="onInit"> </qrcode-stream>
        <div></div>
      </div>
    </f7-block>
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
  </f7-page>
</template>
<script>

import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import QrcodeVue from "qrcode.vue";
import firebase from "firebase";
import { users } from "../js/firebase";

export default {
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
    QrcodeVue
  },

  data() {
    return {
      result: "",
      error: "",
      uID: "",
      email: "",
      name: "",
      password: "",
      username: "",
      loggedIn: false,
      notLoggedIn: true,
      
    };
  },
  
  created() {
    //Keeps the user logged in whenever the app loads till they sign out
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        
        this.loggedIn = true;
        this.notLoggedIn = false;
      } else {
        this.loggedIn = false;
        this.notLoggedIn = true;
      }
    });
    
  },

  methods: {
    login() {

      //signs a user in if they already have an account and they entired the right credentials
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

      this.notLoggedIn = false;
      this.loggedIn = true;
    },
    async createUser() {
      // creates a document in a the user collection based off the user just created with signup
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
      //creates a new user with an email and password
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(function(err) {
          this.$f7.dialog.alert(err.message);
        });

      

      this.loggedIn = true;
      this.notLoggedIn = false;
      //saves user info in database 'users' collection
      this.createUser();

      this.$f7.dialog.alert("Account created for: " + this.email, () => {
        this.$f7.loginScreen.close();
        this.$f7.loginScreen.close();
      });
    },
    onDecode(result) {
      // function to perform an action when a QR code is scanned
      this.result = result;
      var user = firebase.auth().currentUser;
      this.uID = user.uid;
      console.log("scan result: ", this.result);

      if (this.result == "Restaurant A") {
        users
          .doc(this.uID)
          .collection("restaurants")
          .doc("Restaurant A")
          .set({
            name: this.result,
            address: "123 restaurant street",
            index: 0
          });
        this.$f7.dialog.alert("Restaurant A added to your restaurant list");
      } else if (this.result == "Restaurant B") {
        users
          .doc(this.uID)
          .collection("restaurants")
          .doc("Restaurant B")
          .set({
            name: this.result,
            address: "3456 goofy street",
            index: 1
          });
        this.$f7.dialog.alert("Restaurant B added to your restaurant list");
      } else if (this.result == "Restaurant C") {
        users
          .doc(this.uID)
          .collection("restaurants")
          .doc("Restaurant C")
          .set({
            name: this.result,
            address: "7890 prestige street",
            index: 2
          });
        this.$f7.dialog.alert("Restaurant C added to your restaurant list");
      } else {
        this.$f7.dialog.alert("That is not a valid QR code! please try again!");
      }
      //window.location.replace
    },
    async onInit(promise) {
      //window.QRScanner.prepare();
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    },

    async onDetect(promise) {
      try {
        const {
          imageData, // raw image data of image/frame
          content, // decoded String
          location // QR code coordinates
        } = await promise;

        // ...
      } catch (error) {
        // ...
      }
    }
  },
  
};
</script>
<style> 
</style>
