var chromaSDK = undefined;
var chromaIsInitialized = false;

function detectChromaSDK() {
  if (chromaSDK == undefined) {
    chromaSDK = new ChromaSDK();
  }
  var oReq = new XMLHttpRequest();
  oReq.timeout = 2000; // time in milliseconds
  oReq.addEventListener("load", function() {
    var jsonVersion = JSON.parse(this.responseText);
    var versionOrBetter = false;
    if (jsonVersion != undefined &&
      jsonVersion.version != undefined) {
      var parts = jsonVersion.version.split(".");
      if (parts.length >= 3 &&
        ((parts[0] > 2) ||
        (parts[0] == 2 && parts[1] > 8) ||
        (parts[0] == 2 && parts[1] == 8 && parts[2] >= 5))) {
          versionOrBetter = true;
        }
    }

    if (versionOrBetter) {
      chromaSDK.init();
      chromaIsInitialized = true;
      setTimeout(function() {
        pageChromaStart();
      }, 1000);
    } else {
      // Time to update Synapse
    }
  });
  oReq.ontimeout = function() {

    if (vue.$data.pageState.btnPlay.state) {
	   console.log('ChromaSDK timed out!');
     setTimeout(function() { detectChromaSDK(); }, 5000);
   }
  };
  oReq.onerror = function() {

    if (vue.$data.pageState.btnPlay.state) {
	   console.log('ChromaSDK HTTP error!');
     setTimeout(function() { detectChromaSDK(); }, 5000);
   }
  };
  oReq.open("GET", "https://chromasdk.io:54236/razer/chromasdk");
  oReq.send();
}

function pageLoaded() {
  detectChromaSDK();
}

var effectName = 'FireEffect';

function showEffectChromaLink() {
  var baseLayer = effectName + '_ChromaLink.chroma';
  ChromaAnimation.closeAnimation(baseLayer);
  ChromaAnimation.openAnimation(baseLayer, function(baseAnimation) {
    ChromaAnimation.playAnimation(baseLayer, true);
  });
};

function showEffectHeadset() {
  var baseLayer = effectName + '_Headset.chroma';
  ChromaAnimation.closeAnimation(baseLayer);
  ChromaAnimation.openAnimation(baseLayer, function(baseAnimation) {
    ChromaAnimation.playAnimation(baseLayer, true);
  });
};

function showEffectKeyboard() {
  var baseLayer = effectName + '_Keyboard.chroma';
  ChromaAnimation.closeAnimation(baseLayer);
  ChromaAnimation.openAnimation(baseLayer, function(baseAnimation) {
    ChromaAnimation.playAnimation(baseLayer, true);
  });
};

function showEffectKeypad() {
  var baseLayer = effectName + '_Keypad.chroma';
  ChromaAnimation.closeAnimation(baseLayer);
  ChromaAnimation.openAnimation(baseLayer, function(baseAnimation) {
    ChromaAnimation.playAnimation(baseLayer, true);
  });
};

function showEffectMouse() {
  var baseLayer = effectName + '_Mouse.chroma';
  ChromaAnimation.closeAnimation(baseLayer);
  ChromaAnimation.openAnimation(baseLayer, function(baseAnimation) {
    ChromaAnimation.playAnimation(baseLayer, true);
  });
};

function showEffectMousepad() {
  var baseLayer = effectName + '_Mousepad.chroma';
  ChromaAnimation.closeAnimation(baseLayer);
  ChromaAnimation.openAnimation(baseLayer, function(baseAnimation) {
    ChromaAnimation.playAnimation(baseLayer, true);
  });
};

function pageChromaStart() {
  console.log('Ready to play Chroma!');
  showEffectChromaLink();
  showEffectHeadset();
  showEffectKeyboard();
  showEffectKeypad();
  showEffectMouse();
  showEffectMousepad();
}
