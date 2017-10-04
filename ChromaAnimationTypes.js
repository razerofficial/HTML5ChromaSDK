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
  LoadedAnimations1D: {},
  LoadedAnimations2D: {},
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
		  animation.Name = animationName;
          callback(animation);
        } else if (deviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
          var animation = new ChromaAnimation2D();
          animation.openAnimation(arrayBuffer, readIndex);
		  animation.Name = animationName;
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
  stopByAnimationType: function(animation) {
    //1D
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      if (this.LoadedAnimations1D[animation.Device] != undefined) {
        this.LoadedAnimations1D[animation.Device].stop();
      }
      this.LoadedAnimations1D[animation.Device] = animation;
    //2D
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      if (this.LoadedAnimations2D[animation.Device] != undefined) {
        this.LoadedAnimations2D[animation.Device].stop();
      }
      this.LoadedAnimations2D[animation.Device] = animation;
    }
  },
  playAnimation: function(animationName, loop) {
    if (this.LoadedAnimations[animationName] == undefined) {
      var refThis = this;
      ChromaAnimation.openAnimation(animationName,
        function (animation) {
          refThis.LoadedAnimations[animationName] = animation;
          //console.log(animation);
		  refThis.stopByAnimationType(animation, loop);
		  //console.log('playAnimation:', animationName);
		  animation.play(loop);
        });
    } else {
      var animation = this.LoadedAnimations[animationName];
      this.stopByAnimationType(animation, loop);
	  //console.log('playAnimation:', animationName);
      animation.play(loop);
    }
  },
  stopAnimation: function(animationName) {
    if (this.LoadedAnimations[animationName] != undefined) {
      this.LoadedAnimations[animationName].stop();
    }
  },
  playComposite: function(animationName, loop) {
    this.playAnimation(animationName + "_ChromaLink.chroma", loop);
    this.playAnimation(animationName + "_Headset.chroma", loop);
    this.playAnimation(animationName + "_Keyboard.chroma", loop);
    this.playAnimation(animationName + "_Keypad.chroma", loop);
    this.playAnimation(animationName + "_Mouse.chroma", loop);
    this.playAnimation(animationName + "_Mousepad.chroma", loop);
  },
  stopComposite: function(animationName) {
    this.stopAnimation(animationName + "_ChromaLink.chroma");
    this.stopAnimation(animationName + "_Headset.chroma");
    this.stopAnimation(animationName + "_Keyboard.chroma");
    this.stopAnimation(animationName + "_Keypad.chroma");
    this.stopAnimation(animationName + "_Mouse.chroma");
    this.stopAnimation(animationName + "_Mousepad.chroma");
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
  clear: function (device) {
    if (device == EChromaSDKDeviceEnum.DE_ChromaLink) {
      chromaSDK.createChromaLinkEffect("CHROMA_NONE");
    } else if (device == EChromaSDKDeviceEnum.DE_Headset) {
      chromaSDK.createHeadsetEffect("CHROMA_NONE");
    } else if (device == EChromaSDKDeviceEnum.DE_Keyboard) {
      chromaSDK.createKeyboardEffect("CHROMA_NONE");
    } else if (device == EChromaSDKDeviceEnum.DE_Keypad) {
      chromaSDK.createKeypadEffect("CHROMA_NONE");
    } else if (device == EChromaSDKDeviceEnum.DE_Mouse) {
      chromaSDK.createMouseEffect("CHROMA_NONE");
    } else if (device == EChromaSDKDeviceEnum.DE_Mousepad) {
      chromaSDK.createMousematEffect("CHROMA_NONE");
    }
  }
};
