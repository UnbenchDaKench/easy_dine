<template>
  <f7-page name="catalog" style="background: none transparent;">
    <f7-navbar title="Restaurant Scanner"></f7-navbar>
    <f7-block>
      <f7-button
        v-if="notLoggedIn"
        login-screen-open="#my-login-screen"
        fill
        raised
        >scan</f7-button
      >
    </f7-block>
    <f7-block v-if="loggedIn" strong inset>
      <div class="blink">
        <p class="error">{{ error }}</p>
        
        <p class="decode-result">
          Last result: <b>{{ result }}</b>
        </p>
      </div>
      <div class="qr-overlay">
        <qrcode-stream @decode="onDecode" @onInit="onInit">
          <!--<f7-button @click="scanCode" fill raised>Scan New Code</f7-button>
          <f7-button id= "prepare" @click="prepare" fill raised>Prepare</f7-button>
          <f7-button id= "show" @click="show" fill raised>Show</f7-button>
          <f7-button id= "scan" @click="scan" fill raised>Scan</f7-button>-->
        </qrcode-stream>
        <div>
           
          
        </div>
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
//var QRScanner = require('QRScanner');
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
      size: 200
      /*myStyle: {
        backgroundColor: "rgba(0,0,0,0,0.1)"
      }*/
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$f7.dialog.alert('logged in');
        this.loggedIn = true;
        this.notLoggedIn = false;
        

      } else {
        this.$f7.dialog.alert("no user logged in");
        this.loggedIn = false;
        this.notLoggedIn = true;
      }
    });
    /* var user = firebase.auth().currentUser;

    if (user) {
      this.loggedIn = true;
      this.notLoggedIn = false;
    } else {
      this.$f7.dialog.alert("no user logged in");
      this.loggedIn = false;
      this.notLoggedIn = true;
    } */
  },

  methods: {
    /* loginOpen() {
      var user = firebase.auth().currentUser;
      //firebase.auth().onAuthStateChanged(function(user){
      if (user) {
        this.uID = user.uid;
        console.log(this.uID);
        this.email = user.email;
        this.loggedIn = true;
        this.notLoggedIn = false;
        this.$f7.dialog.alert("User: " + this.email + " is logged in", () => {
          this.$f7.loginScreen.close();
        });

      } else {
        this.loggedIn = false;
        this.notLoggedIn = true;
      }
      //});
       users.doc(this.uID).set({
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password
      });
    } */
 
     
    
    login() {
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
    onDecode(result) {
      this.result = result;
      var user = firebase.auth().currentUser;
      this.uID = user.uid;
      console.log("scan result: ", this.result);
      
      
      if (this.result == "Restaurant A") {
        users.doc(this.uID).collection('restaurants').doc('Restaurant A').set({
          name: this.result,
          address: "123 restaurant street",
          index: 0
        })
        
      }
      else if (this.result == "Restaurant B") {
        users.doc(this.uID).collection('restaurants').doc('Restaurant B').set({
          name: this.result,
          address: "3456 goofy street",
          index: 1
        })
        
      }
      else if (this.result == "Restaurant C") {
        users.doc(this.uID).collection('restaurants').doc('Restaurant C').set({
          name: this.result,
          address: "7890 prestige street",
          index: 2
        })
        
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
  props: {}
};
</script>
<style scoped></style>
