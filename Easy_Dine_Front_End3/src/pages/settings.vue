<template>
  <f7-page name="settings">
    <f7-navbar title="Dine">
      <div v-if="showMenu">
        <f7-button fill raised popup-open="#orderList" @click="orderList"
          >Current Orders</f7-button
        >
      </div>
    </f7-navbar>
    <f7-block v-if="notSelected" strong inset>
      <p>Please scan a restaurant, or selct from the:</p>
      <!-- <a href='./' class='tab-link' data-route-tab-id='home'>restaurant list</a> -->
      <f7-button @click="displayRests" popup-open="#restList" fill raised
        >Restaurant List</f7-button
      >
    </f7-block>
    <div v-if="showMenu">
      <f7-block-title>Breakfast</f7-block-title>

      <f7-block v-if="chosenA">
        <div v-for="(breakfast, index) in restABreakfast" :key="index">
          <f7-row>
            <f7-col width="50">
              <p>{{ breakfast.id }}</p>
            </f7-col>
            <f7-col width="50">
              <p>price: ${{ breakfast.price }}</p>
              <f7-button
                fill
                raised
                @click="order(breakfast.id, breakfast.price)"
                >Order</f7-button
              >
            </f7-col>
          </f7-row>
        </div>
      </f7-block>

      <f7-block v-if="chosenB">
        <div v-for="(breakfast, index) in restBBreakfast" :key="index">
          <f7-row>
            <f7-col width="50">
              <p>{{ breakfast.id }}</p>
            </f7-col>
            <f7-col width="50">
              <p>price: ${{ breakfast.price }}</p>
              <f7-button
                fill
                raised
                @click="order(breakfast.id, breakfast.price)"
                >Order</f7-button
              >
            </f7-col>
          </f7-row>
        </div>
      </f7-block>

      <f7-block v-if="chosenC">
        <div v-for="(breakfast, index) in restCBreakfast" :key="index">
          <f7-row>
            <f7-col width="50">
              <p>{{ breakfast.id }}</p>
            </f7-col>
            <f7-col width="50">
              <p>price: ${{ breakfast.price }}</p>
              <f7-button
                fill
                raised
                @click="order(breakfast.id, breakfast.price)"
                >Order</f7-button
              >
            </f7-col>
          </f7-row>
        </div>
      </f7-block>

      <f7-block-title>Lunch</f7-block-title>

      <f7-block v-if="chosenA">
        <div v-for="(lunch, index) in restALunch" :key="index">
          <f7-row>
            <f7-col width="50">
              <p>{{ lunch.id }}</p>
            </f7-col>
            <f7-col width="50">
              <p>price: ${{ lunch.price }}</p>
              <f7-button fill raised @click="order(lunch.id, lunch.price)"
                >Order</f7-button
              >
            </f7-col>
          </f7-row>
        </div>
      </f7-block>

      <f7-block v-if="chosenB">
        <div v-for="(lunch, index) in restBLunch" :key="index">
          <f7-row>
            <f7-col width="50">
              <p>{{ lunch.id }}</p>
            </f7-col>
            <f7-col width="50">
              <p>price: ${{ lunch.price }}</p>
              <f7-button fill raised @click="order(lunch.id, lunch.price)"
                >Order</f7-button
              >
            </f7-col>
          </f7-row>
        </div>
      </f7-block>

      <f7-block v-if="chosenC">
        <div v-for="(lunch, index) in restCLunch" :key="index">
          <f7-row>
            <f7-col width="50">
              <p>{{ lunch.id }}</p>
            </f7-col>
            <f7-col width="50">
              <p>price: ${{ lunch.price }}</p>
              <f7-button fill raised @click="order(lunch.id, lunch.price)"
                >Order</f7-button
              >
            </f7-col>
          </f7-row>
        </div>
      </f7-block>

      <f7-block-title>Dinner</f7-block-title>

      <f7-block v-if="chosenA">
        <div v-for="(dinner, index) in restADinner" :key="index">
          <f7-row>
            <f7-col width="50">
              <p>{{ dinner.id }}</p>
            </f7-col>
            <f7-col width="50">
              <p>price: ${{ dinner.price }}</p>
              <f7-button fill raised @click="order(dinner.id, dinner.price)"
                >Order</f7-button
              >
            </f7-col>
          </f7-row>
        </div>
      </f7-block>

      <f7-block v-if="chosenB">
        <div v-for="(dinner, index) in restBDinner" :key="index">
          <f7-row>
            <f7-col width="50">
              <p>{{ dinner.id }}</p>
            </f7-col>
            <f7-col width="50">
              <p>price: ${{ dinner.price }}</p>
              <f7-button fill raised @click="order(dinner.id, dinner.price)"
                >Order</f7-button
              >
            </f7-col>
          </f7-row>
        </div>
      </f7-block>

      <f7-block v-if="chosenC">
        <div v-for="(dinner, index) in restCDinner" :key="index">
          <f7-row>
            <f7-col width="50">
              <p>{{ dinner.id }}</p>
            </f7-col>
            <f7-col width="50">
              <p>price: ${{ dinner.price }}</p>
              <f7-button fill raised @click="order(dinner.id, dinner.price)"
                >Order</f7-button
              >
            </f7-col>
          </f7-row>
        </div>
      </f7-block>

      <f7-block-title>Drinks</f7-block-title>

      <f7-block v-if="chosenA">
        <div v-for="(drink, index) in restADrinks" :key="index">
          <f7-row>
            <f7-col width="50">
              <p>{{ drink.id }}</p>
            </f7-col>
            <f7-col width="50">
              <p>price: ${{ drink.price }}</p>
              <f7-button fill raised @click="order(drink.id, drink.price)"
                >Order</f7-button
              >
            </f7-col>
          </f7-row>
        </div>
      </f7-block>

      <f7-block v-if="chosenB">
        <div v-for="(drink, index) in restBDrinks" :key="index">
          <f7-row>
            <f7-col width="50">
              <p>{{ drink.id }}</p>
            </f7-col>
            <f7-col width="50">
              <p>price: ${{ drink.price }}</p>
              <f7-button fill raised @click="order(drink.id, drink.price)"
                >Order</f7-button
              >
            </f7-col>
          </f7-row>
        </div>
      </f7-block>

      <f7-block v-if="chosenC">
        <div v-for="(drink, index) in restCDrinks" :key="index">
          <f7-row>
            <f7-col width="50">
              <p>{{ drink.id }}</p>
            </f7-col>
            <f7-col width="50">
              <p>price: ${{ drink.price }}</p>
              <f7-button fill raised @click="order(drink.id, drink.price)"
                >Order</f7-button
              >
            </f7-col>
          </f7-row>
        </div>
      </f7-block>
    </div>
    <f7-block></f7-block>
    <f7-popup id="restList">
      <f7-view>
        <f7-page>
          <f7-navbar title="Restaurants">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <span v-for="(items, index) in restaurants" :key="index">
              <f7-card class="demo-card-header-pic">
                <f7-card-header
                  class="no-border"
                  valign="bottom"
                  style="background-image:url(src/pages/restaurant A.jpg)"
                  >{{ index + 1 }}. {{ items.name }}</f7-card-header
                >
                <f7-card-content>
                  <p class="date"></p>
                  <p>{{ items.address }}</p>
                </f7-card-content>
                <f7-card-footer>
                  <f7-button @click="startOrder(items.index)" popup-close
                    >Start ordering!</f7-button
                  >
                </f7-card-footer>
              </f7-card>
            </span>
          </f7-block>
          <div v-if="noRests">
            <f7-block>
              <p>
                You have no Restaurants! Scan a restaurants qr code to add it to
                your list!
              </p>
            </f7-block>
          </div>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-popup id="orderList">
      <f7-view>
        <f7-page>
          <f7-navbar title="Curent Orders">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <span v-for="(items, index) in userOrders" :key="index">
            <f7-card class="demo-card-header-pic">
              <f7-card-header
                class="no-border"
                valign="bottom"
                style="background-image:url(src/pages/restaurant A.jpg)"
                >{{ items.number }}.</f7-card-header
              >
              <f7-card-content>
                <p>User: {{ items.user }}</p>
                <p>{{ items.name }}</p>
              </f7-card-content>
              <f7-card-footer>
                <p>price: {{ items.price }}</p>
                <f7-button @click="deleteOrder(items.id)" popup-close
                  >Delete Order</f7-button
                >
              </f7-card-footer>
            </f7-card>
          </span>
        </f7-page>
      </f7-view>
    </f7-popup>
  </f7-page>
</template>
<script>
import { users } from "../js/firebase";
import { restaurantsRef } from "../js/firebase";
import { restaurantABreakfast } from "../js/firebase";
import { restaurantALunch } from "../js/firebase";
import { restaurantADinner } from "../js/firebase";
import { restaurantADrinks } from "../js/firebase";
import { restaurantBBreakfast } from "../js/firebase";
import { restaurantBLunch } from "../js/firebase";
import { restaurantBDinner } from "../js/firebase";
import { restaurantBDrinks } from "../js/firebase";
import { restaurantCBreakfast } from "../js/firebase";
import { restaurantCLunch } from "../js/firebase";
import { restaurantCDinner } from "../js/firebase";
import { restaurantCDrinks } from "../js/firebase";
import { restAOrders } from "../js/firebase";
import { restBOrders } from "../js/firebase";
import { restCOrders } from "../js/firebase";
import firebase from "firebase";
export default {
  data() {
    return {
      notSelected: true,
      selected: false,
      restaurants: [],
      noRests: false,
      showMenu: false,
      restABreakfast: [],
      restALunch: [],
      restADinner: [],
      restADrinks: [],
      restBBreakfast: [],
      restBLunch: [],
      restBDinner: [],
      restBDrinks: [],
      restCBreakfast: [],
      restCLunch: [],
      restCDinner: [],
      restCDrinks: [],
      orders: [],
      userOrders: [],
      orderStarted: {
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      chosenA: false,
      chosenB: false,
      chosenC: false,
      name: "",
      username: "",
      uID: "",
      email: "",
      currentUser: [],
      itemCount: 0
    };
  },
  created(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.email = user.email;
        this.uID = user.uid;
        this.$f7.dialog.alert("userID: " + this.uID);
        
        
      } else {
        this.$f7.dialog.alert("no user logged in");
        this.loggedIn = false;
        this.notLoggedIn = true;
      }
    });
  },
  methods: {
    async displayRests() {
      

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
        console.log(error);
        throw new Error("something went wrong1");
        
      }

      if (this.restaurants.length == 0) {
        this.noRests = true;
      } else {
        this.noRests = false;
      }
    },
    async getUser() {
      //var user = firebase.auth().currentUser;
      var i;

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.email = user.email;
          this.uID = user.uid;
        } else {
          this.$f7.dialog.alert("no user logged in");
        }
      });

      /* if (user) {
        this.uID = user.uid;
        console.log(this.uID);
      } else {
        console.log("no user logged in");
      } */

      try {
        //this.uID eradaymjDHPKxfHPkMjefHBks6z1

        const { docs } = await users.get();

        this.currentUser = docs.map(doc => {
          const { id } = doc;
          const data = doc.data();
          return { id, ...data };
        });
        console.log("current user: ", this.currentUser);
      } catch (error) {
        console.log(error);
        throw new Error("something went wrong2");
      }

      for (i = 0; i < this.currentUser.length; i++) {
        if (this.currentUser[i].id == this.uID) {
          this.name = this.currentUser[i].name;
          this.email = this.currentUser[i].email;
          this.username = this.currentUser[i].username;

          console.log("username: ", this.username);
          console.log("email: ", this.email);
          console.log("name: ", this.name);
        }
      }
    },
    async order(item, price) {
      var date = new Date();
      var today =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      var time =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var time = hours + ":" + minutes + ":" + seconds;
      console.log("order time: ", time);
      if (this.chosenA) {
        this.getUser();

        var itemName;
        this.itemCount = this.itemCount + 1;
        console.log(this.itemCount);
        itemName = "(" + this.username + ")" + this.itemCount + ". " + item;

        restAOrders.doc(itemName).set({
          name: item,
          price: price,
          date: today,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          user: this.username,
          number: this.itemCount
        });
      } else if (this.chosenB) {
        this.getUser();

        var itemName;
        this.itemCount = this.itemCount + 1;
        console.log(this.itemCount);
        itemName = "(" + this.username + ")" + this.itemCount + ". " + item;

        restBOrders.doc(itemName).set({
          name: item,
          price: price,
          date: today,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          user: this.username,
          number: this.itemCount
        });
      } else if (this.chosenC) {
        this.getUser();

        var itemName;
        this.itemCount = this.itemCount + 1;
        console.log(this.itemCount);
        itemName = "(" + this.username + ")" + this.itemCount + ". " + item;

        restCOrders.doc(itemName).set({
          name: item,
          price: price,
          date: today,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          user: this.username,
          number: this.itemCount
        });
      }
    },
    deleteOrder(id) {
      if (this.chosenA) {
        try {
          restAOrders
            .doc(id)
            .delete()
            .then(function() {
              console.log("order deleted: ", id);
            });
        } catch (error) {
          throw new error("could not delete order");
        }
      } else if (this.chosenB) {
        try {
          restBOrders
            .doc(id)
            .delete()
            .then(function() {
              console.log("order deleted: ", id);
            });
        } catch (error) {
          throw new error("could not delete order");
        }
      } else if (this.chosenC) {
        try {
          restCOrders
            .doc(id)
            .delete()
            .then(function() {
              console.log("order deleted: ", id);
            });
        } catch (error) {
          throw new error("could not delete order");
        }
      }
    },
    async orderList() {
      if (this.chosenA) {
        var i;
        try {
          const { docs } = await restAOrders.get();
          console.log("code gets this far 1");

          this.orders = docs.map(doc => {
            console.log("code gets this far 2");
            const { id } = doc;
            const data = doc.data();
            return { id, ...data };
          });
          console.log("current Orders", this.orders);
        } catch (error) {
          throw new Error("something went wrong3");
        }
        this.userOrders = [];
        console.log("user orders before population: ", this.userOrders);
        /* for (i = 0; i < this.orders.length; i++) {
          if ((this.orders[i].user = this.username)) {
            if(this.orders[i].hours > this.orderStarted.hours){
              console.log("hours was greater")
              this.userOrders[i] = this.orders[i];
            }
            else if(this.orders[i].hours == this.orderStarted.hours){
              console.log("hours was equal")
              if(this.orders[i].minutes >= this.orderStarted.minutess){
                console.log("minutes was greater")
                this.userOrders[i] = this.orders[i];
                
              }
            }
          }
        } */
        for (i = 0; i < this.orders.length; i++) {
          if ((this.orders[i].user = this.username)) {
            this.userOrders[i] = this.orders[i];
          }
        }
        console.log("user orders:", this.userOrders);
      } else if (this.chosenB) {
        var i;
        try {
          const { docs } = await restBOrders.get();
          console.log("code gets this far 1");

          this.orders = docs.map(doc => {
            console.log("code gets this far 2");
            const { id } = doc;
            const data = doc.data();
            return { id, ...data };
          });
          console.log("current Orders", this.orders);
        } catch (error) {
          throw new Error("something went wrong3");
        }
        this.userOrders = [];
        console.log("user orders before population: ", this.userOrders);
        /* for (i = 0; i < this.orders.length; i++) {
          if ((this.orders[i].user = this.username)) {
            if(this.orders[i].hours > this.orderStarted.hours){
              console.log("hours was greater")
              this.userOrders[i] = this.orders[i];
            }
            else if(this.orders[i].hours == this.orderStarted.hours){
              console.log("hours was equal")
              if(this.orders[i].minutes >= this.orderStarted.minutess){
                console.log("minutes was greater")
                this.userOrders[i] = this.orders[i];
                
              }
            }
          }
        } */
        for (i = 0; i < this.orders.length; i++) {
          if ((this.orders[i].user = this.username)) {
            this.userOrders[i] = this.orders[i];
          }
        }
        console.log("user orders:", this.userOrders);
      } else if (this.chosenC) {
        var i;
        try {
          const { docs } = await restCOrders.get();
          console.log("code gets this far 1");

          this.orders = docs.map(doc => {
            console.log("code gets this far 2");
            const { id } = doc;
            const data = doc.data();
            return { id, ...data };
          });
          console.log("current Orders", this.orders);
        } catch (error) {
          throw new Error("something went wrong3");
        }
        this.userOrders = [];
        console.log("user orders before population: ", this.userOrders);
        /* for (i = 0; i < this.orders.length; i++) {
          if ((this.orders[i].user = this.username)) {
            if(this.orders[i].hours > this.orderStarted.hours){
              console.log("hours was greater")
              this.userOrders[i] = this.orders[i];
            }
            else if(this.orders[i].hours == this.orderStarted.hours){
              console.log("hours was equal")
              if(this.orders[i].minutes >= this.orderStarted.minutess){
                console.log("minutes was greater")
                this.userOrders[i] = this.orders[i];
                
              }
            }
          }
        } */
        for (i = 0; i < this.orders.length; i++) {
          if ((this.orders[i].user = this.username)) {
            this.userOrders[i] = this.orders[i];
          }
        }
        console.log("user orders:", this.userOrders);
      }
    },
    async startOrder(index) {
      //var index = this.index;
      this.notSelected = false;
      this.showMenu = true;
      this.getUser();

      //retrieving menu restaurant A
      if (index == 0) {
        this.chosenA = true;
        var date = new Date();
        var time =
          date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        this.orderStarted.hours = date.getHours();
        this.orderStarted.minutes = date.getMinutes();
        this.orderStarted.seconds = date.getSeconds();
        console.log("current time: ", this.orderStarted);

        try {
          const { docs } = await restaurantABreakfast.get();
          console.log("code gets this far 1");
          this.restABreakfast = docs.map(doc => {
            console.log("code gets this far 2");
            const { id } = doc;
            const data = doc.data();
            return { id, ...data };
          });
          console.log("breakfast menu", this.restAbreakfast);
        } catch (error) {
          throw new Error("something went wrong4");
        }
        try {
          const { docs } = await restaurantALunch.get();
          console.log("code gets this far 1");
          this.restALunch = docs.map(doc => {
            console.log("code gets this far 2");
            const { id } = doc;
            const data = doc.data();
            return { id, ...data };
          });
          console.log("lunch menu", this.restALunch);
        } catch (error) {
          throw new Error("something went wrong5");
        }
        try {
          const { docs } = await restaurantADinner.get();
          console.log("code gets this far 1");
          this.restADinner = docs.map(doc => {
            console.log("code gets this far 2");
            const { id } = doc;
            const data = doc.data();
            return { id, ...data };
          });
          console.log("dinner menu", this.restADinner);
        } catch (error) {
          throw new Error("something went wrong6");
        }
        try {
          const { docs } = await restaurantADrinks.get();
          console.log("code gets this far 1");
          this.restADrinks = docs.map(doc => {
            console.log("code gets this far 2");
            const { id } = doc;
            const data = doc.data();
            return { id, ...data };
          });
          console.log("dinner menu", this.restADrinks);
        } catch (error) {
          throw new Error("something went wrong7");
        }
      } else if (index == 1) {
        this.chosenB = true;
        var date = new Date();
        var time =
          date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        this.orderStarted.hours = date.getHours();
        this.orderStarted.minutes = date.getMinutes();
        this.orderStarted.seconds = date.getSeconds();
        console.log("current time: ", this.orderStarted);

        try {
          const { docs } = await restaurantBBreakfast.get();
          console.log("code gets this far 1");
          this.restBBreakfast = docs.map(doc => {
            console.log("code gets this far 2");
            const { id } = doc;
            const data = doc.data();
            return { id, ...data };
          });
          console.log("breakfast menu", this.restBbreakfast);
        } catch (error) {
          throw new Error("something went wrong4");
        }
        try {
          const { docs } = await restaurantBLunch.get();
          console.log("code gets this far 1");
          this.restBLunch = docs.map(doc => {
            console.log("code gets this far 2");
            const { id } = doc;
            const data = doc.data();
            return { id, ...data };
          });
          console.log("lunch menu", this.restBLunch);
        } catch (error) {
          throw new Error("something went wrong5");
        }
        try {
          const { docs } = await restaurantBDinner.get();
          console.log("code gets this far 1");
          this.restBDinner = docs.map(doc => {
            console.log("code gets this far 2");
            const { id } = doc;
            const data = doc.data();
            return { id, ...data };
          });
          console.log("dinner menu", this.restBDinner);
        } catch (error) {
          throw new Error("something went wrong6");
        }
        try {
          const { docs } = await restaurantBDrinks.get();
          console.log("code gets this far 1");
          this.restBDrinks = docs.map(doc => {
            console.log("code gets this far 2");
            const { id } = doc;
            const data = doc.data();
            return { id, ...data };
          });
          console.log("dinner menu", this.restBDrinks);
        } catch (error) {
          throw new Error("something went wrong7");
        }
      } else if (index == 2) {
        this.chosenC = true;
        var date = new Date();
        var time =
          date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        this.orderStarted.hours = date.getHours();
        this.orderStarted.minutes = date.getMinutes();
        this.orderStarted.seconds = date.getSeconds();
        console.log("current time: ", this.orderStarted);

        try {
          const { docs } = await restaurantCBreakfast.get();
          console.log("code gets this far 1");
          this.restCBreakfast = docs.map(doc => {
            console.log("code gets this far 2");
            const { id } = doc;
            const data = doc.data();
            return { id, ...data };
          });
          console.log("breakfast menu", this.restCbreakfast);
        } catch (error) {
          throw new Error("something went wrong4");
        }
        try {
          const { docs } = await restaurantCLunch.get();
          console.log("code gets this far 1");
          this.restCLunch = docs.map(doc => {
            console.log("code gets this far 2");
            const { id } = doc;
            const data = doc.data();
            return { id, ...data };
          });
          console.log("lunch menu", this.restCLunch);
        } catch (error) {
          throw new Error("something went wrong5");
        }
        try {
          const { docs } = await restaurantCDinner.get();
          console.log("code gets this far 1");
          this.restCDinner = docs.map(doc => {
            console.log("code gets this far 2");
            const { id } = doc;
            const data = doc.data();
            return { id, ...data };
          });
          console.log("dinner menu", this.restCDinner);
        } catch (error) {
          throw new Error("something went wrong6");
        }
        try {
          const { docs } = await restaurantCDrinks.get();
          console.log("code gets this far 1");
          this.restCDrinks = docs.map(doc => {
            console.log("code gets this far 2");
            const { id } = doc;
            const data = doc.data();
            return { id, ...data };
          });
          console.log("dinner menu", this.restCDrinks);
        } catch (error) {
          throw new Error("something went wrong7");
        }
      }
    }
  }
};
</script>
