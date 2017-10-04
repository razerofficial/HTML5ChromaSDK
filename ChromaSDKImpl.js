// JavaScript source code

function ChromaSDK() {
    var uri = undefined;
    var timerId = undefined;
}

function onTimer() {
    var request = new XMLHttpRequest();

    request.open("PUT", uri + "/heartbeat", true);

    request.setRequestHeader("content-type", "application/json");

    request.send(null);

    request.onreadystatechange = function () {
        if ((request.readyState == 4) && (request.status == 200)){
            //console.log(request.responseText);
        }
    }
}

ChromaSDK.prototype = {
	uri: undefined,
    init: function () {
		setTimeout(function() {
			
        var request = new XMLHttpRequest();

        request.open("POST", "https://chromasdk.io:54236/razer/chromasdk", true);
		//request.open("POST", "http://chromasdk.io:54235/razer/chromasdk", true);
		//request.open("POST", "http://localhost:54235/razer/chromasdk", true);

        request.setRequestHeader("content-type", "application/json");

        var data = JSON.stringify({
            "title": "Razer Chroma SDK Sample Application",
            "description": "Razer Chroma SDK Sample Application",
            "author": {
                "name": "Chroma Developer",
                "contact": "www.razerzone.com"
            },
            "device_supported": [
                "keyboard",
                "mouse",
                "headset",
                "mousepad",
                "keypad",
                "chromalink"],
            "category": "application"
        });

        request.send(data);

        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.responseText != undefined && request.responseText != "") {
                uri = JSON.parse(request.responseText)["uri"];
                //console.log(uri);
                timerId = setInterval(onTimer, 1000);
            }
        }
		}, 0);
    },
    uninit: function () {
		setTimeout(function() {
			
		if (this.uri == undefined) {
			return;
		}
			
        var request = new XMLHttpRequest();

        request.open("DELETE", uri, true);

        request.setRequestHeader("content-type", "application/json");

        request.send(null);

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                //console.log(request.responseText);
            }
        }

        clearInterval(timerId);
		}, 0);
    },
    createKeyboardEffect: function (effect, data) {
		setTimeout(function() {
			
		if (this.uri == undefined) {
			return;
		}
		
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        } else if (effect == "CHROMA_CUSTOM_KEY") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        }

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/keyboard", true);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('createKeyboardEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['result']);
		}, 0);
    },
    preCreateKeyboardEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        } else if (effect == "CHROMA_CUSTOM_KEY") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        }

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("POST", uri + "/keyboard", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log(request.responseText);

        //console.log('preCreateKeyboardEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['result']);

        return JSON.parse(request.responseText)['id'];
    },
    createMousematEffect: function (effect, data) {
		setTimeout(function() {
			
		if (this.uri == undefined) {
			return;
		}
			
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/mousepad", true);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('createMousematEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['result']);
		}, 0);
    },
    preCreateMousematEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("POST", uri + "/mousepad", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('preCreateMousematEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['result']);

        return JSON.parse(request.responseText)['id'];
    },
    createMouseEffect: function (effect, data) {
		setTimeout(function() {
			
		if (this.uri == undefined) {
			return;
		}
			
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM2") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/mouse", true);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('createMouseEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['result']);
		}, 0);
    },
    preCreateMouseEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM2") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("POST", uri + "/mouse", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('preCreateMouseEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['result']);

        return JSON.parse(request.responseText)['id'];
    },
    createHeadsetEffect: function (effect, data) {
		setTimeout(function() {
			
		if (this.uri == undefined) {
			return;
		}
			
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/headset", true);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('createHeadsetEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['result']);
		}, 0);
    },
    preCreateHeadsetEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("POST", uri + "/headset", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('preCreateHeadsetEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['result']);

        return JSON.parse(request.responseText)['id'];
    },
    createKeypadEffect: function (effect, data) {
		setTimeout(function() {
			
		if (this.uri == undefined) {
			return;
		}
			
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/keypad", true);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('createKeypadEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['result']);
		}, 0);
    },
    preCreateKeypadEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("POST", uri + "/keypad", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('preCreateKeypadEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['result']);

        return JSON.parse(request.responseText)['id'];
    },
    createChromaLinkEffect: function (effect, data) {
		setTimeout(function() {
			
		if (this.uri == undefined) {
			return;
		}
			
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/chromalink", true);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('createChromaLinkEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['result']);
		}, 0);
    },
    preCreateChromaLinkEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("POST", uri + "/chromalink", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('preCreateChromaLinkEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['result']);

        return JSON.parse(request.responseText)['id'];
    },
    setEffect: function (id) {
		setTimeout(function() {
			
		if (this.uri == undefined) {
			return;
		}
			
        var jsonObj = JSON.stringify({ "id": id });

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/effect", true);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('setEffect(' + id + ') returns ' + JSON.parse(request.responseText)['result']);
		}, 0);
    },
    deleteEffect: function (id) {
		setTimeout(function() {
			
		if (this.uri == undefined) {
			return;
		}
			
        var jsonObj = JSON.stringify({ "id": id });

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("DELETE", uri + "/effect", true);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('deleteEffect(' + id + ') returns ' + JSON.parse(request.responseText)['result']);
		}, 0);
    },
    deleteEffectGroup: function (ids) {
		setTimeout(function() {
			
		if (this.uri == undefined) {
			return;
		}
			
        var jsonObj = ids;

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("DELETE", uri + "/effect", true);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('deleteEffectGroup() returns ' + JSON.parse(request.responseText));
		}, 0);
    }
}

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

function ChromaAnimation1D() {
  var Device;
  var Frames = [];
  var CurrentIndex = 0;
  var Loop = true;
  var PlayTimeout = undefined;
}

ChromaAnimation1D.prototype = {
	
  DeviceType: EChromaSDKDeviceTypeEnum.DE_1D,

  openAnimation: function(arrayBuffer, readIndex) {

    readSize = 1;
    var device = new Uint8Array(arrayBuffer.slice(readIndex, readIndex+readSize))[0];
    readIndex += readSize;
    //console.log('device:', device);
    this.Device = device;

    readSize = 4;
    var frameCount = new Uint32Array(arrayBuffer.slice(readIndex, readIndex+readSize))[0];
    readIndex += readSize;
    //console.log('frameCount:', frameCount);

    var maxLeds = ChromaAnimation.getMaxLeds(device);
    //console.log('maxLeds:', maxLeds);

    var frames = [];

    for (var index = 0; index < frameCount; ++index) {

      var frame = new ChromaAnimationFrame1D();

      readSize = Float32Array.BYTES_PER_ELEMENT;
      var duration = new Float32Array(arrayBuffer.slice(readIndex, readIndex+readSize))[0];
      readIndex += readSize;

      if (duration < 0.1) {
        duration = 0.1;
      }

      frame.Duration = duration;

      //console.log('Frame '+index+': duration='+duration);

      readSize = 4 * maxLeds;
      var colors = new Uint32Array(arrayBuffer.slice(readIndex, readIndex+readSize));
      readIndex += readSize;
      //console.log(colors);
	  
      frame.Colors = new Array(maxLeds);  
      for (var i = 0; i < maxLeds; ++i) {
        var color = colors[i];
        frame.Colors[i] = color;
      }

      frames.push(frame);
    }

    this.Frames = frames;
  },
  getFrame: function() {
    if (this.CurrentIndex < this.Frames.length) {
      return this.Frames[this.CurrentIndex];
    } else {
      return undefined;
    }
  },
  getDuration: function() {
    var frame = this.getFrame();
    if (frame != undefined) {
      return frame.Duration;
    } else {
      return 0;
    }
  },
  playFrame: function() {
    if (this.CurrentIndex < this.Frames.length) {
      var duration = this.getDuration();
      //console.log('Play Frame: '+this.CurrentIndex+' of: '+this.Frames.length+' Duration: '+duration);

      if (this.Device == EChromaSDKDevice1DEnum.DE_ChromaLink) {
        chromaSDK.createChromaLinkEffect("CHROMA_CUSTOM", this.getFrame().Colors);
      } else if (this.Device == EChromaSDKDevice1DEnum.DE_Headset) {
        chromaSDK.createHeadsetEffect("CHROMA_CUSTOM", this.getFrame().Colors);
      } else if (this.Device == EChromaSDKDevice1DEnum.DE_Mousepad) {
        chromaSDK.createMousematEffect("CHROMA_CUSTOM", this.getFrame().Colors);
      }
		  
      // schedule next frame
      var refThis = this;
      this.PlayTimeout = setTimeout(function() { refThis.playFrame(); }, duration * 1000);
      ++this.CurrentIndex;
    } else {
      //console.log('Animation complete.');
      if (this.Loop) {
        this.play(this.Loop);
      } else {
        this.stop();
      }
    }
  },
  stop: function () {
    if (this.PlayTimeout != undefined) {
      clearTimeout(this.PlayTimeout);
      this.PlayTimeout = undefined;
	  //console.log('stop:', this.Name);
    }
    this.CurrentIndex = 0;
    this.Loop = false;
  },
  play: function (loop) {
    this.stop();
    this.CurrentIndex = 0;
    this.Loop = loop;
	//console.log('play:', this.Name);
    this.playFrame();
  }
};

function ChromaAnimation2D() {
  var Device;
  var Frames = [];
  var CurrentIndex = 0;
  var Loop = false;
  var PlayTimeout = undefined;
}

ChromaAnimation2D.prototype = {
	
  DeviceType: EChromaSDKDeviceTypeEnum.DE_2D,

  openAnimation: function(arrayBuffer, readIndex) {

    readSize = 1;
    var device = new Uint8Array(arrayBuffer.slice(readIndex, readIndex+readSize))[0];
    readIndex += readSize;
    //console.log('device:', device);
    this.Device = device;

    readSize = 4;
    var frameCount = new Uint32Array(arrayBuffer.slice(readIndex, readIndex+readSize))[0];
    readIndex += readSize;
    //console.log('frameCount:', frameCount);

    var maxRow = ChromaAnimation.getMaxRow(device);
    //console.log('maxRow:', maxRow);

    var maxColumn = ChromaAnimation.getMaxColumn(device);
    //console.log('maxColumn:', maxColumn);

    var frames = [];

    for (var index = 0; index < frameCount; ++index) {

      var frame = new ChromaAnimationFrame2D();

      readSize = Float32Array.BYTES_PER_ELEMENT;
      var duration = new Float32Array(arrayBuffer.slice(readIndex, readIndex+readSize))[0];
      readIndex += readSize;

      if (duration < 0.1) {
        duration = 0.1;
      }

      frame.Duration = duration;

      //console.log('Frame '+index+': duration='+duration);

      readSize = 4 * maxRow * maxColumn;
      var colors = new Uint32Array(arrayBuffer.slice(readIndex, readIndex+readSize));
      readIndex += readSize;
      //console.log(colors);
	  
      frame.Colors = new Array(maxRow);  
      for (var i = 0; i < maxRow; ++i) {
        frame.Colors[i] = new Array(maxColumn);
        for (var j = 0; j < maxColumn; ++j) {
          var color = colors[i * maxColumn + j];
          frame.Colors[i][j] = color;
        }
      }

      frames.push(frame);
    }

    this.Frames = frames;
  },
  getFrame: function() {
    if (this.CurrentIndex < this.Frames.length) {
      return this.Frames[this.CurrentIndex];
    } else {
      return undefined;
    }
  },
  getDuration: function() {
    var frame = this.getFrame();
    if (frame != undefined) {
      return frame.Duration;
    } else {
      return 0;
    }
  },
  playFrame: function() {
    if (this.CurrentIndex < this.Frames.length) {
      var duration = this.getDuration();
      //console.log('Play Frame: '+this.CurrentIndex+' of: '+this.Frames.length+' Duration: '+duration);

      if (this.Device == EChromaSDKDevice2DEnum.DE_Keyboard) {
        chromaSDK.createKeyboardEffect("CHROMA_CUSTOM", this.getFrame().Colors);
      } else if (this.Device == EChromaSDKDevice2DEnum.DE_Keypad) {
        chromaSDK.createKeypadEffect("CHROMA_CUSTOM", this.getFrame().Colors);
      } else if (this.Device == EChromaSDKDevice2DEnum.DE_Mouse) {
        chromaSDK.createMouseEffect("CHROMA_CUSTOM2", this.getFrame().Colors);
      }
	  
      // schedule next frame
      var refThis = this;
      this.PlayTimeout = setTimeout(function() { refThis.playFrame(); }, duration * 1000);
      ++this.CurrentIndex;
    } else {
      //console.log('Animation complete.');
      if (this.Loop) {
        this.play(this.Loop);
      } else {
        this.stop();
      }
    }
  },
  stop: function () {
    if (this.PlayTimeout != undefined) {
      clearTimeout(this.PlayTimeout);
      this.PlayTimeout = undefined;
	  //console.log('stop:', this.Name);
    }
    this.CurrentIndex = 0;
    this.Loop = false;
  },
  play: function (loop) {
    this.stop();
    this.CurrentIndex = 0;
	this.Loop = loop;
	//console.log('play:', this.Name);
    this.playFrame();
  }
};
