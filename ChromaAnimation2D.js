function ChromaAnimation2D() {
  var Device;
  var Frames = [];
  var CurrentIndex = 0;
  var Loop = false;
  var PlayTimeout = undefined;
}

ChromaAnimation2D.prototype = {

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
      if (duration > 0) {
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
        this.PlayTimeout = setTimeout(function(animation) { refThis.playFrame(); }, duration * 1000);
        ++this.CurrentIndex;
      }
    } else {
      //console.log('Animation complete.');
      this.PlayTimeout = undefined;
      if (this.Loop) {
        this.play(this.Loop);
      }
    }
  },
  stop: function () {
    if (this.PlayTimeout != undefined) {
      clearTimeout(this.PlayTimeout);
      this.PlayTimeout = undefined;
    }
  },
  play: function (loop) {
    this.stop();
    this.CurrentIndex = 0;
	this.Loop = loop;
    this.playFrame();
  }
};
