<template>
<f7-app :params="f7params" >

  

  


  <!-- Views/Tabs container -->
  <f7-views tabs class="safe-areas">
    <!-- Tabbar for switching views-tabs -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#view-restaurant" icon-ios="f7:house_fill" icon-aurora="f7:house_fill" icon-md="material:menu" text="Restaurants"></f7-link>
      <f7-link tab-link="#view-scan" tab-link-active icon-ios="f7:square_list_fill" icon-aurora="f7:square_list_fill" icon-md="f7:camera_viewfinder" text="Scan"></f7-link>
      <f7-link tab-link="#view-dine" icon-ios="f7:poultry_leg" icon-aurora="f7:poultry_leg" icon-md="f7:poultry_leg" text="Dine"></f7-link>
    </f7-toolbar>

    <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
    <f7-view id="view-restaurant"  tab url="/restaurant/"></f7-view>

    <!-- Catalog View -->
    <f7-view id="view-scan" name="scan" main tabs-swipeable-wrap tab tab-active url="/scan/"></f7-view>

    <!-- Settings View -->
    <f7-view id="view-dine" name="dine" tab url="/dine/"></f7-view>

  </f7-views>


  

 
</f7-app>
</template>
<script>
  import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';

  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          id: 'io.framework7.myapp', // App bundle ID
          name: 'Easy Dine', // App name
          theme: 'auto', // Automatic theme detection
          // App root data
          data: function () {
            
          },

          // App routes
          routes: routes,


          // Input settings
          input: {
            scrollIntoViewOnFocus: Device.cordova && !Device.electron,
            scrollIntoViewCentered: Device.cordova && !Device.electron,
          },
          // Cordova Statusbar settings
          statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
          },
        },

        
      }
    },
    methods: {
      
    },
    mounted() {
      this.$f7ready((f7) => {
        // Init cordova APIs (see cordova-app.js)
        if (Device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here
      });
    }
  }
</script>