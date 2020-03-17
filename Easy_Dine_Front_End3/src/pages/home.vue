<template>
  <f7-page name="home">
    <f7-navbar title="Restaurants Lists"></f7-navbar>
    <f7-block v-if="notLoggedIn" strong inset>
    <f7-button  login-screen-open="#my-login-screen" fill raised>Login</f7-button>
    <div>
      <p>log in to see your list of restaurants</p>
    </div>
    </f7-block>
    <div v-if="loggedIn">
      <f7-card class="demo-card-header-pic">
        <f7-card-header
          class="no-border"
          valign="bottom"
          style="background-image:url(https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg)"
        >Journey To Mountains</f7-card-header>
        <f7-card-content>
          <p class="date">Posted on January 21, 2015</p>
          <p>Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis. Phasellus quis nibh hendrerit...</p>
        </f7-card-content>
        <f7-card-footer>
          <f7-link>Like</f7-link>
          <f7-link>Read more</f7-link>
        </f7-card-footer>
      </f7-card>
    </div>
    
    <f7-login-screen id="my-login-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <f7-list form>
            <f7-list-input
              type="text"
              name="username"
              placeholder="Your username"
              v-model="username"
              @input="username = $event.target.value"
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
            <f7-list-button title="Sign In" @click="login"></f7-list-button>
            <f7-block-footer>
              Some text about login information.
              <br />Click "Sign In" to close Login Screen
            </f7-block-footer>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>
  </f7-page>
</template>
<script>
import { users } from "../js/firebase";
import { restaurants } from "../js/firebase";

export default {
  data() {
    return {
      username: "",
      password: "",
      restaurant: "",
      notLoggedIn: true,
      loggedIn: false
    };
  },
  methods: {
    login() {
      users.add({
        username: this.username,
        password: this.password,
        edit: false
      });
      this.$f7.dialog.alert(
        "Username: " + this.username + "<br>Password: " + this.password,
        () => {
          this.$f7.loginScreen.close();
        }
      );
      this.notLoggedIn = false;
      this.loggedIn = true;
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