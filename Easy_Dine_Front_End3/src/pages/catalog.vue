<template>
  <f7-page name="catalog" style="background: none transparent;">
    <f7-navbar title="Restaurant Scanner"></f7-navbar>
    <f7-block strong inset>
      
      <div class="blink">
        <p class="error">{{ error }}</p>
        <f7-button tab-link='#view-settings' tab-link-active  fill raised>click</f7-button>
        <p class="decode-result">Last result: <b>{{ result }}</b></p>
      </div>
      <div class="qr-overlay">
        <qrcode-stream @decode='onDecode' @onInit='onInit'>
          
          <!--<f7-button @click="scanCode" fill raised>Scan New Code</f7-button>
          <f7-button id= "prepare" @click="prepare" fill raised>Prepare</f7-button>
          <f7-button id= "show" @click="show" fill raised>Show</f7-button>
          <f7-button id= "scan" @click="scan" fill raised>Scan</f7-button>-->
        </qrcode-stream>
        <div>
        <f7-button @click="generateCode" fill raised>create code</f7-button>
        <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
      </div>
      </div>
    </f7-block>
    <f7-popup id="my-popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <p>Popup content goes here.</p>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>
  </f7-page>
</template>
<script>
//var QRScanner = require('QRScanner');
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
import QrcodeVue from 'qrcode.vue'

export default {
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
    QrcodeVue
  },

  data() {
    return {
      result: '',
      error: '',
      value:JSON.stringify({
        Restaurant_Name: 'Burger House',
        menu: [
          {
            breakfast: [
              {
                eggs: 'eggs',
                sausage: 'sausage'
              }
            ],
            lunch: [
              {
                pizza: 'pizza',
                sausage: 'pizza'
              }
            ]
          }
        ],
      }),
      size: 200 ,

      /*myStyle: {
        backgroundColor: "rgba(0,0,0,0,0.1)"
      }*/
    }
  },

  computed: {},
  methods: {
    /*prepare() {
      window.QRScanner.prepare();
      alert("prepare was pressed");
    },
    scan() {
      window.QRScanner.scan();
    },
    show() {
      window.QRScanner.show();
      alert("show was pressed!");
    },*/
    generateCode(){

    },
    onDecode(result){
      this.result = result;
      //window.location.replace
      
  
    },
    async onInit(promise) {
      
      //window.QRScanner.prepare();
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    },
    
    async onDetect (promise) {
    try {
      const {
        imageData,    // raw image data of image/frame
        content,      // decoded String
        location      // QR code coordinates
      } = await promise

      // ...
    } catch (error) {
      // ...
    }
  }


  },
  props: {
    
  }
};
</script>
<style scoped>
</style>