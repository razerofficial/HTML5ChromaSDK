var EChromaSDKDeviceTypeEnum = {
  'DE_1D': 0,
  'DE_2D': 1
};

var EChromaSDKDevice1DEnum = {
  'DE_ChromaLink': 0,
  'DE_Headset': 1,
  'DE_Mousepad': 2
};

var EChromaSDKDevice2DEnum = {
  'DE_Keyboard': 0,
  'DE_Keypad': 1,
  'DE_Mouse': 2
};

var EChromaSDKDeviceEnum = {
  'DE_ChromaLink': 0,
  'DE_Headset': 1,
  'DE_Keyboard': 2,
  'DE_Keypad': 3,
  'DE_Mouse': 4,
  'DE_Mousepad': 5
};

function ChromaAnimationFrame1D() {
    var Duration = 0.1;
    var Colors = undefined;
}

function ChromaAnimationFrame2D() {
    var Duration = 0.1;
    var Colors = [];
}

var ChromaAnimation = {
  LoadedAnimations: {},
  getMaxLeds : function(device) {
    if (device == EChromaSDKDevice1DEnum.DE_ChromaLink) {
      return 5;
    } else if (device == EChromaSDKDevice1DEnum.DE_Headset) {
      return 5;
    } else if (device == EChromaSDKDevice1DEnum.DE_Mousepad) {
      return 15;
    } else {
      console.log('getMaxLeds: Invalid device!');
      return undefined;
    }
  },
  getMaxRow : function(device) {
    if (device == EChromaSDKDevice2DEnum.DE_Keyboard) {
      return 6;
    } else if (device == EChromaSDKDevice2DEnum.DE_Keypad) {
      return 4;
    } else if (device == EChromaSDKDevice2DEnum.DE_Mouse) {
      return 9;
    } else {
      console.log('getMaxRow: Invalid device!');
      return undefined;
    }
  },
  getMaxColumn : function(device) {
    if (device == EChromaSDKDevice2DEnum.DE_Keyboard) {
      return 22;
 	    } else if (device == EChromaSDKDevice2DEnum.DE_Keypad) {
      return 5;
     	} else if (device == EChromaSDKDevice2DEnum.DE_Mouse) {
      return 7;
    } else {
      console.log('getMaxColumn: Invalid device!');
      return undefined;
    }
  },
  openAnimation : function (animationName, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        //console.log('Animation Name:', animationName);

        var arrayBuffer = xhr.response;
        //console.log('Array Buffer:');
        //console.log(arrayBuffer);

        var readIndex = 0;
        var readSize = 4;
        var version = new Uint32Array(arrayBuffer.slice(readIndex, readIndex+readSize))[0];
        readIndex += readSize;
        //console.log('version:', version);

        if (version != 1) {
          console.log('openAnimation: Unsupported version!');
          return undefined;
        }

        readSize = 1;
        var deviceType = new Uint8Array(arrayBuffer.slice(readIndex, readIndex+readSize))[0];
        readIndex += readSize;
        //console.log('deviceType:', deviceType);

        if (deviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
          var animation = new ChromaAnimation1D();
          animation.openAnimation(arrayBuffer, readIndex);
          callback(animation);
        } else if (deviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
          var animation = new ChromaAnimation2D();
          animation.openAnimation(arrayBuffer, readIndex);
          callback(animation);
        } else {
          callback(undefined);
        }
      }
    }

    xhr.open('GET', animationName, true);
    xhr.responseType = "arraybuffer";
    xhr.send('');
  },
  playAnimation: function(animationName, loop) {
    if (this.LoadedAnimations[animationName] == undefined) {
      var refThis = this;
      ChromaAnimation.openAnimation(animationName,
        function (animation) {
          refThis.LoadedAnimations[animationName] = animation;
          //console.log(animation);
          animation.play(loop);
        });
    } else {
      this.LoadedAnimations[animationName].play(loop);
    }
  },
  stopAnimation: function(animationName) {
    if (this.LoadedAnimations[animationName] != undefined) {
      this.LoadedAnimations[animationName].stop();
    }
  },
  staticColor: function (device, color) {
    if (device == EChromaSDKDeviceEnum.DE_ChromaLink) {
      chromaSDK.createChromaLinkEffect("CHROMA_STATIC", color);
    } else if (device == EChromaSDKDeviceEnum.DE_Headset) {
      chromaSDK.createHeadsetEffect("CHROMA_STATIC", color);
    } else if (device == EChromaSDKDeviceEnum.DE_Keyboard) {
      chromaSDK.createKeyboardEffect("CHROMA_STATIC", color);
    } else if (device == EChromaSDKDeviceEnum.DE_Keypad) {
      chromaSDK.createKeypadEffect("CHROMA_STATIC", color);
    } else if (device == EChromaSDKDeviceEnum.DE_Mouse) {
      chromaSDK.createMouseEffect("CHROMA_STATIC", color);
    } else if (device == EChromaSDKDeviceEnum.DE_Mousepad) {
      chromaSDK.createMousematEffect("CHROMA_STATIC", color);
    }
  },
  clear: function (device, color) {
    if (device == EChromaSDKDeviceEnum.DE_ChromaLink) {
      chromaSDK.createChromaLinkEffect("CHROMA_NONE", color);
    } else if (device == EChromaSDKDeviceEnum.DE_Headset) {
      chromaSDK.createHeadsetEffect("CHROMA_NONE", color);
    } else if (device == EChromaSDKDeviceEnum.DE_Keyboard) {
      chromaSDK.createKeyboardEffect("CHROMA_NONE", color);
    } else if (device == EChromaSDKDeviceEnum.DE_Keypad) {
      chromaSDK.createKeypadEffect("CHROMA_NONE", color);
    } else if (device == EChromaSDKDeviceEnum.DE_Mouse) {
      chromaSDK.createMouseEffect("CHROMA_NONE", color);
    } else if (device == EChromaSDKDeviceEnum.DE_Mousepad) {
      chromaSDK.createMousematEffect("CHROMA_NONE", color);
    }
  }
};
