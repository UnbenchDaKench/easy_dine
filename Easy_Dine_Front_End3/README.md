# Easy Dine


## Developers Notes

hey, Abiodun here. Everything written here is info from me, the rest was automatically generated.

because the current version of the app only works in the browser, to run the app first navigate to the easy dine directory in a terminal and run 

```
npm install
```

then run 

```
npm start
```
That should open up a window in your browser with the app. Go to inspect element (should be ctrl + shift + i), and click the toggle device toolbar button in the top left of the window. that way you can view how the app would appear on various devices.

To make use of the scan feature you would have to generate a Qr code with eithr "Restaurant A", "Restaurant B", or "Restaurant C"

website to genrate codes is https://www.qr-code-generator.com/
just choose the text option and type in one of those options (case sensitive);

you can then make use of the apps fucntions by simply clicking and typing

BUGS:

there are a few bugs I'm still working on.
- The order list currently shows all the orders that have been made by that user that day instead of from that current session
- Because of the error with the orderlist the subtotal also totals all the orders the user has mad that day

other than that there are just some styling issues i need to figure out

## Framework7 CLI Options

Framework7 app created with following options:

```
{
  "cwd": "C:\\Users\\aolad\\OneDrive\\Documents\\Final Project\\Project\\Eas_Dine_Front_End3",
  "type": [
    "cordova"
  ],
  "name": "Easy Dine",
  "pkg": "io.framework7.myapp",
  "framework": "vue",
  "template": "tabs",
  "cssPreProcessor": false,
  "bundler": "webpack",
  "cordova": {
    "folder": "cordova",
    "platforms": [
      "ios",
      "android"
    ],
    "plugins": [
      "cordova-plugin-statusbar",
      "cordova-plugin-keyboard",
      "cordova-plugin-splashscreen",
      "cordova-plugin-wkwebview-file-xhr"
    ]
  },
  "webpack": {
    "developmentSourceMap": true,
    "productionSourceMap": true,
    "hashAssets": false,
    "preserveAssetsPaths": false,
    "inlineAssets": true
  },
  "theming": {
    "customColor": false,
    "color": "#007aff",
    "darkTheme": false,
    "iconFonts": true,
    "fillBars": false
  },
  "customBuild": false
}
```

## NPM Scripts

* 🔥 `start` - run development server
* 🔧 `dev` - run development server
* 🔧 `build-dev` - build web app using development mode (faster build without minification and optimization)
* 🔧 `build-prod` - build web app for production
* 📱 `build-dev-cordova` - build cordova app using development mode (faster build without minification and optimization)
* 📱 `build-prod-cordova` - build cordova app
* 📱 `build-dev-cordova-ios` - build cordova iOS app using development mode (faster build without minification and optimization)
* 📱 `build-prod-cordova-ios` - build cordova iOS app
* 📱 `build-dev-cordova-android` - build cordova Android app using development mode (faster build without minification and optimization)
* 📱 `build-prod-cordova-android` - build cordova Android app

## WebPack

There is a webpack bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in `/src` folder. Webpack config located in `build/webpack.config.js`.

Webpack has specific way of handling static assets (CSS files, images, audios). You can learn more about correct way of doing things on [official webpack documentation](https://webpack.js.org/guides/asset-management/).
## Cordova

Cordova project located in `cordova` folder. You shouldn't modify content of `cordova/www` folder. Its content will be correctly generated when you call `npm run cordova-build-prod`.



## Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 generate-assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 generate-assets --ui
```

## Documentation & Resources

* [Framework7 Core Documentation](https://framework7.io/docs/)
* [Framework7 Vue Documentation](https://framework7.io/vue/)


* [Framework7 Icons Reference](https://framework7.io/icons/)
* [Community Forum](https://forum.framework7.io)

## Support Framework7

Love Framework7? Support project by donating or pledging on patreon:
https://patreon.com/vladimirkharlampidi