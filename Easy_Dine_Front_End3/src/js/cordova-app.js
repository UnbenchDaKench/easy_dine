var cordovaApp = {
  f7: null,
  /*
  This method hides splashscreen after 2 seconds
  */
  handleSplashscreen: function () {
    var f7 = cordovaApp.f7;
    if (!window.navigator.splashscreen || f7.device.electron) return;
    setTimeout(() => {
      window.navigator.splashscreen.hide();
    }, 2000);
  },
  /*
  This method prevents back button tap to exit from app on android.
  In case there is an opened modal it will close that modal instead.
  In case there is a current view with navigation history, it will go back instead.
  */
  handleAndroidBackButton: function () {
    var f7 = cordovaApp.f7;
    const $ = f7.$;
    if (f7.device.electron) return;

    document.addEventListener('backbutton', function (e) {
      if ($('.actions-modal.modal-in').length) {
        f7.actions.close('.actions-modal.modal-in');
        e.preventDefault();
        return false;
      }
      if ($('.dialog.modal-in').length) {
        f7.dialog.close('.dialog.modal-in');
        e.preventDefault();
        return false;
      }
      if ($('.sheet-modal.modal-in').length) {
        f7.sheet.close('.sheet-modal.modal-in');
        e.preventDefault();
        return false;
      }
      if ($('.popover.modal-in').length) {
        f7.popover.close('.popover.modal-in');
        e.preventDefault();
        return false;
      }
      if ($('.popup.modal-in').length) {
        if ($('.popup.modal-in>.view').length) {
          const currentView = f7.views.get('.popup.modal-in>.view');
          if (currentView && currentView.router && currentView.router.history.length > 1) {
            currentView.router.back();
            e.preventDefault();
            return false;
          }
        }
        f7.popup.close('.popup.modal-in');
        e.preventDefault();
        return false;
      }
      if ($('.login-screen.modal-in').length) {
        f7.loginScreen.close('.login-screen.modal-in');
        e.preventDefault();
        return false;
      }

      if ($('.searchbar-enabled').length) {
        f7.searchbar.disable();
        e.preventDefault();
        return false;
      }

      const currentView = f7.views.current;
      if (currentView && currentView.router && currentView.router.history.length > 1) {
        currentView.router.back();
        e.preventDefault();
        return false;
      }

      if ($('.panel.panel-in').length) {
        f7.panel.close('.panel.panel-in');
        e.preventDefault();
        return false;
      }
    }, false);
  },
  /*
  This method does the following:
    - provides cross-platform view "shrinking" on keyboard open/close
    - hides keyboard accessory bar for all inputs except where it required
  */
  handleKeyboard: function () {
    var f7 = cordovaApp.f7;
    if (!window.Keyboard || !window.Keyboard.shrinkView || f7.device.electron) return;
    var $ = f7.$;
    window.Keyboard.shrinkView(false);
    window.Keyboard.disableScrollingInShrinkView(true);
    window.Keyboard.hideFormAccessoryBar(true);
    window.addEventListener('keyboardWillShow', () => {
      f7.input.scrollIntoView(document.activeElement, 0, true, true);
    });
    window.addEventListener('keyboardDidShow', () => {
      f7.input.scrollIntoView(document.activeElement, 0, true, true);
    });
    window.addEventListener('keyboardDidHide', () => {
      if (document.activeElement && $(document.activeElement).parents('.messagebar').length) {
        return;
      }
      window.Keyboard.hideFormAccessoryBar(false);
    });
    window.addEventListener('keyboardHeightWillChange', (event) => {
      var keyboardHeight = event.keyboardHeight;
      if (keyboardHeight > 0) {
        // Keyboard is going to be opened
        document.body.style.height = `calc(100% - ${keyboardHeight}px)`;
        $('html').addClass('device-with-keyboard');
      } else {
        // Keyboard is going to be closed
        document.body.style.height = '';
        $('html').removeClass('device-with-keyboard');
      }

    });
    $(document).on('touchstart', 'input, textarea, select', function (e) {
      var nodeName = e.target.nodeName.toLowerCase();
      var type = e.target.type;
      var showForTypes = ['datetime-local', 'time', 'date', 'datetime'];
      if (nodeName === 'select' || showForTypes.indexOf(type) >= 0) {
        window.Keyboard.hideFormAccessoryBar(false);
      } else {
        window.Keyboard.hideFormAccessoryBar(true);
      }
    }, true);
  },
  init: function (f7) {
    // Save f7 instance
    cordovaApp.f7 = f7;

    // Handle Android back button
    cordovaApp.handleAndroidBackButton();

    // Handle Splash Screen
    cordovaApp.handleSplashscreen();

    // Handle Keyboard
    cordovaApp.handleKeyboard();

    //cordovaApp.document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },
  onDeviceReady: function () {
    this.receivedEvent("deviceready");

    document.querySelector("#scanCode").addEventListener("touchend", function () {
      window.QRScanner.prepare(onDone);
      console.log("we got this far");
    });

    function onDone(err, status) {
      if (err) {
        // here we can handle errors and clean up any loose ends.
        console.error(err);
      }
      if (status.authorized) {
        // W00t, you have camera access and the scanner is initialized.
        // QRscanner.show() should feel very fast.
        var elements = document.getElementsByClassName('blink')

        for (var i = 0; i < elements.length; i++) {
          elements[i].style.display = 'none';
        }
        // window.QRScanner.show();
        window.QRScanner.show(function (status) {
          var x = document.body.style.background;
          document.body.style.background = 'rgba(0,0,0,0)'
          setTimeout(() => { document.body.style = x }, 1);
          //document.body.style.display = 'none';
          console.log("we got this far");
          window.QRScanner.scan(displayContents);
        });
        // window.QRScanner.scan(displayContents);
      } else if (status.denied) {
        // The video preview will remain black, and scanning is disabled. We can
        // try to ask the user to change their mind, but we'll have to send them
        // to their device settings with `QRScanner.openSettings()`.
      } else {
        // we didn't get permission, but we didn't get permanently denied. (On
        // Android, a denial isn't permanent unless the user checks the "Don't
        // ask again" box.) We can ask again at the next relevant opportunity.
      }
    }
    function displayContents(err, text) {
      if (err) {
        // an error occurred, or the scan was canceled (error code `6`)
      } else {
        // The scan completed, display the contents of the QR code:
        // alert(text);
        document.getElementById('qrAddress').setAttribute('value', text);
        document.getElementById('qrAddress').style.display = 'block';
        window.QRScanner.hide(function (status) {
          var elements = document.getElementsByClassName('blink');

          for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'block';
          }
          document.getElementsByTagName("BODY")[0].setAttribute('style', 'background-color: transparent');
        });
      }
    }
  },
};

export default cordovaApp;
