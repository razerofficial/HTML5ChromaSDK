function ChromaAnimation1D() {
  var Device;
  var Frames = [];
  var CurrentIndex = 0;
  var PlayTimeout = undefined;
}

ChromaAnimation1D.prototype = {

  openAnimation: function(arrayBuffer, readIndex) {

    readSize = 1;
    var device = new Uint8Array(arrayBuffer.slice(readIndex, readIndex+readSize))[0];
    readIndex += readSize;
    //console.log('device:');
    //console.log(device);

    ChromaAnimation.displayInfo('Device: '+device);
    this.Device = device;

    readSize = 4;
    var frameCount = new Uint32Array(arrayBuffer.slice(readIndex, readIndex+readSize))[0];
    readIndex += readSize;
    //console.log('frameCount:');
    //console.log(frameCount);

    ChromaAnimation.displayInfo('Frame Count: '+frameCount);

    var maxLeds = ChromaAnimation.getMaxLeds(device);
    ChromaAnimation.displayInfo('Max Leds: '+maxLeds);

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

      ChromaAnimation.displayInfo('Frame '+index+': duration='+duration);

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
      if (duration > 0) {
        console.log('Play Frame: '+this.CurrentIndex+' of: '+this.Frames.length+' Duration: '+duration);

        if (this.Device == EChromaSDKDevice1DEnum.DE_ChromaLink) {
          chromaSDK.createChromaLinkEffect("CHROMA_CUSTOM", this.getFrame().Colors);
        } else if (this.Device == EChromaSDKDevice1DEnum.DE_Headset) {
          chromaSDK.createHeadsetEffect("CHROMA_CUSTOM", this.getFrame().Colors);
        } else if (this.Device == EChromaSDKDevice1DEnum.DE_Mousepad) {
          chromaSDK.createMousematEffect("CHROMA_CUSTOM", this.getFrame().Colors);
        }
		  
        // schedule next frame
        var refThis = this;
        this.PlayTimeout = setTimeout(function(animation) { refThis.playFrame(); }, duration * 1000);
        ++this.CurrentIndex;
      }
    } else {
      console.log('Animation complete.');
      this.PlayTimeout = undefined;
    }
  },
  stop: function () {
    if (this.PlayTimeout != undefined) {
      clearTimeout(this.PlayTimeout);
      this.PlayTimeout = undefined;
    }
  },
  play: function () {
    this.stop();
    this.CurrentIndex = 0;
    this.playFrame();
  }
};