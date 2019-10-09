// JavaScript source code

function ChromaSDK() {
    var uri = undefined;
    var timerId = undefined;
    var initialized = false;
}

function onTimer() {
    if (this.uri == undefined) {
      return;
    }

    if (!initialized) {
      return;
    }

    var request = new XMLHttpRequest();

    request.open("PUT", uri + "/heartbeat", true);

    request.setRequestHeader("content-type", "application/json");

    request.onerror = function () {
      console.log('request onerror', request.status);
    };

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status != 200){
            console.log('request onreadystatechange', request.status);
            /*
            setTimeout(function() {
              chromaSDK.uninit();
            }, 0);
            setTimeout(function() {
              chromaSDK.init();
            }, 100);
            */
        }
    }

    request.send(null);
}

ChromaSDK.prototype = {
	uri: undefined,
    init: function () {
		setTimeout(function() {

      if (this.timerId != undefined) {
        clearInterval(this.timerId);
        this.timerId = undefined;
      }

      var request = new XMLHttpRequest();

      request.open("POST", "https://chromasdk.io:54236/razer/chromasdk", true);

      request.setRequestHeader("content-type", "application/json");

      var data = JSON.stringify({
          "title": "HTML5ChromaSDK",
          "description": "JS Library for playing Chroma animations",
          "author": {
              "name": "Razer, Inc.",
              "contact": "https://github.com/RazerOfficial/HTML5ChromaSDK"
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
              initialized = true;
          }
      }
		}, 0);
    },
    uninit: function () {
      setTimeout(function() {

        initialized = false;

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
        uri = undefined;
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
            var color = { "color": data, "key": data };
            jsonObj = JSON.stringify({ effect: effect, param: color });
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

// keyboard keys
var RZKEY = {
	RZKEY_ESC: 0x0001,                 /*!< Esc (VK_ESCAPE) */
	RZKEY_F1: 0x0003,                  /*!< F1 (VK_F1) */
	RZKEY_F2: 0x0004,                  /*!< F2 (VK_F2) */
	RZKEY_F3: 0x0005,                  /*!< F3 (VK_F3) */
	RZKEY_F4: 0x0006,                  /*!< F4 (VK_F4) */
	RZKEY_F5: 0x0007,                  /*!< F5 (VK_F5) */
	RZKEY_F6: 0x0008,                  /*!< F6 (VK_F6) */
	RZKEY_F7: 0x0009,                  /*!< F7 (VK_F7) */
	RZKEY_F8: 0x000A,                  /*!< F8 (VK_F8) */
	RZKEY_F9: 0x000B,                  /*!< F9 (VK_F9) */
	RZKEY_F10: 0x000C,                 /*!< F10 (VK_F10) */
	RZKEY_F11: 0x000D,                 /*!< F11 (VK_F11) */
	RZKEY_F12: 0x000E,                 /*!< F12 (VK_F12) */
	RZKEY_1: 0x0102,                   /*!< 1 (VK_1) */
	RZKEY_2: 0x0103,                   /*!< 2 (VK_2) */
	RZKEY_3: 0x0104,                   /*!< 3 (VK_3) */
	RZKEY_4: 0x0105,                   /*!< 4 (VK_4) */
	RZKEY_5: 0x0106,                   /*!< 5 (VK_5) */
	RZKEY_6: 0x0107,                   /*!< 6 (VK_6) */
	RZKEY_7: 0x0108,                   /*!< 7 (VK_7) */
	RZKEY_8: 0x0109,                   /*!< 8 (VK_8) */
	RZKEY_9: 0x010A,                   /*!< 9 (VK_9) */
	RZKEY_0: 0x010B,                   /*!< 0 (VK_0) */
	RZKEY_A: 0x0302,                   /*!< A (VK_A) */
	RZKEY_B: 0x0407,                   /*!< B (VK_B) */
	RZKEY_C: 0x0405,                   /*!< C (VK_C) */
	RZKEY_D: 0x0304,                   /*!< D (VK_D) */
	RZKEY_E: 0x0204,                   /*!< E (VK_E) */
	RZKEY_F: 0x0305,                   /*!< F (VK_F) */
	RZKEY_G: 0x0306,                   /*!< G (VK_G) */
	RZKEY_H: 0x0307,                   /*!< H (VK_H) */
	RZKEY_I: 0x0209,                   /*!< I (VK_I) */
	RZKEY_J: 0x0308,                   /*!< J (VK_J) */
	RZKEY_K: 0x0309,                   /*!< K (VK_K) */
	RZKEY_L: 0x030A,                   /*!< L (VK_L) */
	RZKEY_M: 0x0409,                   /*!< M (VK_M) */
	RZKEY_N: 0x0408,                   /*!< N (VK_N) */
	RZKEY_O: 0x020A,                   /*!< O (VK_O) */
	RZKEY_P: 0x020B,                   /*!< P (VK_P) */
	RZKEY_Q: 0x0202,                   /*!< Q (VK_Q) */
	RZKEY_R: 0x0205,                   /*!< R (VK_R) */
	RZKEY_S: 0x0303,                   /*!< S (VK_S) */
	RZKEY_T: 0x0206,                   /*!< T (VK_T) */
	RZKEY_U: 0x0208,                   /*!< U (VK_U) */
	RZKEY_V: 0x0406,                   /*!< V (VK_V) */
	RZKEY_W: 0x0203,                   /*!< W (VK_W) */
	RZKEY_X: 0x0404,                   /*!< X (VK_X) */
	RZKEY_Y: 0x0207,                   /*!< Y (VK_Y) */
	RZKEY_Z: 0x0403,                   /*!< Z (VK_Z) */
	RZKEY_NUMLOCK: 0x0112,             /*!< Numlock (VK_NUMLOCK) */
	RZKEY_NUMPAD0: 0x0513,             /*!< Numpad 0 (VK_NUMPAD0) */
	RZKEY_NUMPAD1: 0x0412,             /*!< Numpad 1 (VK_NUMPAD1) */
	RZKEY_NUMPAD2: 0x0413,             /*!< Numpad 2 (VK_NUMPAD2) */
	RZKEY_NUMPAD3: 0x0414,             /*!< Numpad 3 (VK_NUMPAD3) */
	RZKEY_NUMPAD4: 0x0312,             /*!< Numpad 4 (VK_NUMPAD4) */
	RZKEY_NUMPAD5: 0x0313,             /*!< Numpad 5 (VK_NUMPAD5) */
	RZKEY_NUMPAD6: 0x0314,             /*!< Numpad 6 (VK_NUMPAD6) */
	RZKEY_NUMPAD7: 0x0212,             /*!< Numpad 7 (VK_NUMPAD7) */
	RZKEY_NUMPAD8: 0x0213,             /*!< Numpad 8 (VK_NUMPAD8) */
	RZKEY_NUMPAD9: 0x0214,             /*!< Numpad 9 (VK_ NUMPAD9*/
	RZKEY_NUMPAD_DIVIDE: 0x0113,       /*!< Divide (VK_DIVIDE) */
	RZKEY_NUMPAD_MULTIPLY: 0x0114,     /*!< Multiply (VK_MULTIPLY) */
	RZKEY_NUMPAD_SUBTRACT: 0x0115,     /*!< Subtract (VK_SUBTRACT) */
	RZKEY_NUMPAD_ADD: 0x0215,          /*!< Add (VK_ADD) */
	RZKEY_NUMPAD_ENTER: 0x0415,        /*!< Enter (VK_RETURN - Extended) */
	RZKEY_NUMPAD_DECIMAL: 0x0514,      /*!< Decimal (VK_DECIMAL) */
	RZKEY_PRINTSCREEN: 0x000F,         /*!< Print Screen (VK_PRINT) */
	RZKEY_SCROLL: 0x0010,              /*!< Scroll Lock (VK_SCROLL) */
	RZKEY_PAUSE: 0x0011,               /*!< Pause (VK_PAUSE) */
	RZKEY_INSERT: 0x010F,              /*!< Insert (VK_INSERT) */
	RZKEY_HOME: 0x0110,                /*!< Home (VK_HOME) */
	RZKEY_PAGEUP: 0x0111,              /*!< Page Up (VK_PRIOR) */
	RZKEY_DELETE: 0x020f,              /*!< Delete (VK_DELETE) */
	RZKEY_END: 0x0210,                 /*!< End (VK_END) */
	RZKEY_PAGEDOWN: 0x0211,            /*!< Page Down (VK_NEXT) */
	RZKEY_UP: 0x0410,                  /*!< Up (VK_UP) */
	RZKEY_LEFT: 0x050F,                /*!< Left (VK_LEFT) */
	RZKEY_DOWN: 0x0510,                /*!< Down (VK_DOWN) */
	RZKEY_RIGHT: 0x0511,               /*!< Right (VK_RIGHT) */
	RZKEY_TAB: 0x0201,                 /*!< Tab (VK_TAB) */
	RZKEY_CAPSLOCK: 0x0301,            /*!< Caps Lock(VK_CAPITAL) */
	RZKEY_BACKSPACE: 0x010E,           /*!< Backspace (VK_BACK) */
	RZKEY_ENTER: 0x030E,               /*!< Enter (VK_RETURN) */
	RZKEY_LCTRL: 0x0501,               /*!< Left Control(VK_LCONTROL) */
	RZKEY_LWIN: 0x0502,                /*!< Left Window (VK_LWIN) */
	RZKEY_LALT: 0x0503,                /*!< Left Alt (VK_LMENU) */
	RZKEY_SPACE: 0x0507,               /*!< Spacebar (VK_SPACE) */
	RZKEY_RALT: 0x050B,                /*!< Right Alt (VK_RMENU) */
	RZKEY_FN: 0x050C,                  /*!< Function key. */
	RZKEY_RMENU: 0x050D,               /*!< Right Menu (VK_APPS) */
	RZKEY_RCTRL: 0x050E,               /*!< Right Control (VK_RCONTROL) */
	RZKEY_LSHIFT: 0x0401,              /*!< Left Shift (VK_LSHIFT) */
	RZKEY_RSHIFT: 0x040E,              /*!< Right Shift (VK_RSHIFT) */
	RZKEY_MACRO1: 0x0100,              /*!< Macro Key 1 */
	RZKEY_MACRO2: 0x0200,              /*!< Macro Key 2 */
	RZKEY_MACRO3: 0x0300,              /*!< Macro Key 3 */
	RZKEY_MACRO4: 0x0400,              /*!< Macro Key 4 */
	RZKEY_MACRO5: 0x0500,              /*!< Macro Key 5 */
	RZKEY_OEM_1: 0x0101,               /*!< ~ (tilde/半角/全角) (VK_OEM_3) */
	RZKEY_OEM_2: 0x010C,               /*!< -- (minus) (VK_OEM_MINUS) */
	RZKEY_OEM_3: 0x010D,               /*!< = (equal) (VK_OEM_PLUS) */
	RZKEY_OEM_4: 0x020C,               /*!< [ (left sqaure bracket) (VK_OEM_4) */
	RZKEY_OEM_5: 0x020D,               /*!< ] (right square bracket) (VK_OEM_6) */
	RZKEY_OEM_6: 0x020E,               /*!< \ (backslash) (VK_OEM_5) */
	RZKEY_OEM_7: 0x030B,               /*!< ; (semi-colon) (VK_OEM_1) */
	RZKEY_OEM_8: 0x030C,               /*!< ' (apostrophe) (VK_OEM_7) */
	RZKEY_OEM_9: 0x040A,               /*!< , (comma) (VK_OEM_COMMA) */
	RZKEY_OEM_10: 0x040B,              /*!< . (period) (VK_OEM_PERIOD) */
	RZKEY_OEM_11: 0x040C,              /*!< / (forward slash) (VK_OEM_2) */
	RZKEY_EUR_1: 0x030D,               /*!< "#" (VK_OEM_5) */
	RZKEY_EUR_2: 0x0402,               /*!< \ (VK_OEM_102) */
	RZKEY_JPN_1: 0x0015,               /*!< ¥ (0xFF) */
	RZKEY_JPN_2: 0x040D,               /*!< \ (0xC1) */
	RZKEY_JPN_3: 0x0504,               /*!< 無変換 (VK_OEM_PA1) */
	RZKEY_JPN_4: 0x0509,               /*!< 変換 (0xFF) */
	RZKEY_JPN_5: 0x050A,               /*!< ひらがな/カタカナ (0xFF) */
	RZKEY_KOR_1: 0x0015,               /*!< | (0xFF) */
	RZKEY_KOR_2: 0x030D,               /*!< (VK_OEM_5) */
	RZKEY_KOR_3: 0x0402,               /*!< (VK_OEM_102) */
	RZKEY_KOR_4: 0x040D,               /*!< (0xC1) */
	RZKEY_KOR_5: 0x0504,               /*!< (VK_OEM_PA1) */
	RZKEY_KOR_6: 0x0509,               /*!< 한/영 (0xFF) */
	RZKEY_KOR_7: 0x050A,               /*!< (0xFF) */
	RZKEY_INVALID: 0xFFFF              /*!< Invalid keys. */
};

// keyboard leds
var RZLED = {
	RZLED_LOGO: 0x0014                 /*!< Razer logo */
};

// mouse leds
var Mouse = {};
Mouse.RZLED2 = {
  RZLED2_SCROLLWHEEL:   0x0203,  //!< Scroll Wheel LED.
  RZLED2_LOGO:          0x0703,  //!< Logo LED.
  RZLED2_BACKLIGHT:     0x0403,  //!< Backlight LED.
  RZLED2_LEFT_SIDE1:    0x0100,  //!< Left LED 1.
  RZLED2_LEFT_SIDE2:    0x0200,  //!< Left LED 2.
  RZLED2_LEFT_SIDE3:    0x0300,  //!< Left LED 3.
  RZLED2_LEFT_SIDE4:    0x0400,  //!< Left LED 4.
  RZLED2_LEFT_SIDE5:    0x0500,  //!< Left LED 5.
  RZLED2_LEFT_SIDE6:    0x0600,  //!< Left LED 6.
  RZLED2_LEFT_SIDE7:    0x0700,  //!< Left LED 7.
  RZLED2_BOTTOM1:       0x0801,  //!< Bottom LED 1.
  RZLED2_BOTTOM2:       0x0802,  //!< Bottom LED 2.
  RZLED2_BOTTOM3:       0x0803,  //!< Bottom LED 3.
  RZLED2_BOTTOM4:       0x0804,  //!< Bottom LED 4.
  RZLED2_BOTTOM5:       0x0805,  //!< Bottom LED 5.
  RZLED2_RIGHT_SIDE1:   0x0106,  //!< Right LED 1.
  RZLED2_RIGHT_SIDE2:   0x0206,  //!< Right LED 2.
  RZLED2_RIGHT_SIDE3:   0x0306,  //!< Right LED 3.
  RZLED2_RIGHT_SIDE4:   0x0406,  //!< Right LED 4.
  RZLED2_RIGHT_SIDE5:   0x0506,  //!< Right LED 5.
  RZLED2_RIGHT_SIDE6:   0x0606,  //!< Right LED 6.
  RZLED2_RIGHT_SIDE7:   0x0706   //!< Right LED 7.
};

function getHighByte(key) {
	return (key & 0xFF00) >> 8;
}

function getLowByte(key) {
	return (key & 0xFF);
}

var EChromaSDKDeviceTypeEnum = {
  'DE_1D': 0,
  'DE_2D': 1
};

var EChromaSDKDevice1DEnum = {
  'DE_ChromaLink': 0,
  'DE_Headset': 1,
  'DE_Mousepad': 2,
  'DE_MAX': 3
};

var EChromaSDKDevice2DEnum = {
  'DE_Keyboard': 0,
  'DE_Keypad': 1,
  'DE_Mouse': 2,
  'DE_MAX': 3
};

var EChromaSDKDeviceEnum = {
  'DE_ChromaLink': 0,
  'DE_Headset': 1,
  'DE_Keyboard': 2,
  'DE_Keypad': 3,
  'DE_Mouse': 4,
  'DE_Mousepad': 5,
  'DE_MAX': 6
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
  PlayingAnimations1D: {},
  PlayingAnimations2D: {},
  UseIdleAnimation1D: {},
  UseIdleAnimation2D: {},
  IdleAnimation1D: {},
  IdleAnimation2D: {},
  IntervalUpdateFrame: undefined,
  updateFrame: function() {
    if (ChromaAnimation.IntervalUpdateFrame == undefined) {

      ChromaAnimation.useIdleAnimations(false);

      ChromaAnimation.IdleAnimation1D[EChromaSDKDevice1DEnum.DE_ChromaLink] = {};
      ChromaAnimation.IdleAnimation1D[EChromaSDKDevice1DEnum.DE_Headset] = {};
      ChromaAnimation.IdleAnimation1D[EChromaSDKDevice1DEnum.DE_Mousepad] = {};
      ChromaAnimation.IdleAnimation2D[EChromaSDKDevice2DEnum.DE_Keyboard] = {};
      ChromaAnimation.IdleAnimation2D[EChromaSDKDevice2DEnum.DE_Keypad] = {};
      ChromaAnimation.IdleAnimation2D[EChromaSDKDevice2DEnum.DE_Mouse] = {};

      ChromaAnimation.PlayingAnimations1D[EChromaSDKDevice1DEnum.DE_ChromaLink] = {};
      ChromaAnimation.PlayingAnimations1D[EChromaSDKDevice1DEnum.DE_Headset] = {};
      ChromaAnimation.PlayingAnimations1D[EChromaSDKDevice1DEnum.DE_Mousepad] = {};
      ChromaAnimation.PlayingAnimations2D[EChromaSDKDevice2DEnum.DE_Keyboard] = {};
      ChromaAnimation.PlayingAnimations2D[EChromaSDKDevice2DEnum.DE_Keypad] = {};
      ChromaAnimation.PlayingAnimations2D[EChromaSDKDevice2DEnum.DE_Mouse] = {};
      ChromaAnimation.IntervalUpdateFrame = setInterval(this.updateFrame, 33);
    }

    // 1D Devices
    for (var device = 0; device < EChromaSDKDevice1DEnum.DE_MAX; ++device) {
      var idleAnimation = ChromaAnimation.getAnimation(ChromaAnimation.IdleAnimation1D[device]);
      var useIdleAnimation = true;

      for (var animationName in ChromaAnimation.PlayingAnimations1D[device]) {
        var animation = ChromaAnimation.PlayingAnimations1D[device][animationName];
        if (animation != undefined) {
          animation.playFrame();
          if (idleAnimation != animation) {
            useIdleAnimation = false;
          }
        }
      }

      // play idle animation if no other animations are playing
      if (useIdleAnimation &&
        ChromaAnimation.UseIdleAnimation1D[device] &&
        idleAnimation != undefined) {
        idleAnimation.playFrame();
      }
    }

    // 2D Devices
    for (var device = 0; device < EChromaSDKDevice2DEnum.DE_MAX; ++device) {
      var idleAnimation = ChromaAnimation.getAnimation(ChromaAnimation.IdleAnimation2D[device]);
      var useIdleAnimation = true;

      for (var animationName in ChromaAnimation.PlayingAnimations2D[device]) {
        var animation = ChromaAnimation.PlayingAnimations2D[device][animationName];
        if (animation != undefined) {
          animation.playFrame();
          if (idleAnimation != animation) {
            useIdleAnimation = false;
          }
        }
      }

      // play idle animation if no other animations are playing
      if (useIdleAnimation &&
        ChromaAnimation.UseIdleAnimation2D[device] &&
        idleAnimation != undefined) {
        idleAnimation.playFrame();
      }
    }

  },
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
    var refThis = this;
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status != 200) {
          console.error('Animation is missing!', animationName);
          return;
        }
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
          refThis.LoadedAnimations[animationName] = animation;
          callback(animation);
        } else if (deviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
          var animation = new ChromaAnimation2D();
          animation.openAnimation(arrayBuffer, readIndex);
          animation.Name = animationName;
          refThis.LoadedAnimations[animationName] = animation;
          if (callback != undefined) {
            callback(animation);
          }
        } else {
          if (callback != undefined) {
            callback(undefined);
          }
        }
      }
    }

    xhr.open('GET', animationName, true);
    xhr.responseType = "arraybuffer";
    xhr.send('');
  },
  getDeviceType(device) {
	  if (device == EChromaSDKDeviceEnum.DE_ChromaLink) {
		  return EChromaSDKDeviceTypeEnum.DE_1D;
	  } else if (device == EChromaSDKDeviceEnum.DE_Headset) {
		  return EChromaSDKDeviceTypeEnum.DE_1D;
	  } else if (device == EChromaSDKDeviceEnum.DE_Keyboard) {
		  return EChromaSDKDeviceTypeEnum.DE_2D;
	  } else if (device == EChromaSDKDeviceEnum.DE_Keypad) {
		  return EChromaSDKDeviceTypeEnum.DE_2D;
	  } else if (device == EChromaSDKDeviceEnum.DE_Mouse) {
		  return EChromaSDKDeviceTypeEnum.DE_2D;
	  } else if (device == EChromaSDKDeviceEnum.DE_Mousepad) {
		  return EChromaSDKDeviceTypeEnum.DE_1D;
	  } else {
		  return undefined;
	  }
  },
  getDevice1D(device) {
	  if (device == EChromaSDKDeviceEnum.DE_ChromaLink) {
		  return EChromaSDKDevice1DEnum.DE_ChromaLink;
	  } else if (device == EChromaSDKDeviceEnum.DE_Headset) {
		  return EChromaSDKDevice1DEnum.DE_Headset;
	  } else if (device == EChromaSDKDeviceEnum.DE_Mousepad) {
		  return EChromaSDKDevice1DEnum.DE_Mousepad;
	  } else {
		  return undefined;
	  }
  },
  getDevice2D(device) {
	  if (device == EChromaSDKDeviceEnum.DE_Keyboard) {
		  return EChromaSDKDevice2DEnum.DE_Keyboard;
	  } else if (device == EChromaSDKDeviceEnum.DE_Keypad) {
		  return EChromaSDKDevice2DEnum.DE_Keypad;
	  } else if (device == EChromaSDKDeviceEnum.DE_Mouse) {
		  return EChromaSDKDevice2DEnum.DE_Mouse;
	  } else {
		  return undefined;
	  }
  },
  getDeviceEnum(deviceType, device) {
	  if (deviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
        if (device == EChromaSDKDevice1DEnum.DE_ChromaLink) {
		  return EChromaSDKDeviceEnum.DE_ChromaLink;
		} else if (device == EChromaSDKDevice1DEnum.DE_Headset) {
		  return EChromaSDKDeviceEnum.DE_Headset;
		} else if (device == EChromaSDKDevice1DEnum.DE_Mousepad) {
		  return EChromaSDKDeviceEnum.DE_Mousepad;
		}
	  } else if (deviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
        if (device == EChromaSDKDevice2DEnum.DE_Keyboard) {
		  return EChromaSDKDeviceEnum.DE_Keyboard;
		} else if (device == EChromaSDKDevice2DEnum.DE_Keypad) {
		  return EChromaSDKDeviceEnum.DE_Keypad;
		} else if (device == EChromaSDKDevice2DEnum.DE_Mouse) {
		  return EChromaSDKDeviceEnum.DE_Mouse;
		}
	  } else {
	    return undefined;
	  }
  },
  lerp: function(start, end, amt) {
    return (1-amt)*start+amt*end;
  },
  lerpColor: function(from, to, t) {
    var red = Math.floor(this.lerp((from & 0xFF), (to & 0xFF), t));
    var green = Math.floor(this.lerp((from & 0xFF00) >> 8, (to & 0xFF00) >> 8, t));
    var blue = Math.floor(this.lerp((from & 0xFF0000) >> 16, (to & 0xFF0000) >> 16, t));
    var color = red | (green << 8) | (blue << 16);
    return color;
  },
  getAnimation: function(animationName) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return undefined;
    } else {
      return animation;
    }
  },
  getFrameCount: function(animationName) {
    var animation = this.getAnimation(animationName);
    if (animation == undefined) {
      return 0;
    } else {
      return animation.getFrameCount();
    }
  },
  stopByAnimationType: function(device) {
    if (chromaSDK == undefined) {
      setTimeout(function() { ChromaAnimation.stopByAnimationType(device); }, 100);
      return;
    }
    //1D
    if (this.getDeviceType(device) == EChromaSDKDeviceTypeEnum.DE_1D) {
	  var device1D = this.getDevice1D(device);
	  var animation = ChromaAnimation.LoadedAnimations1D[device1D];
      if (animation != undefined) {
        animation.stop();
      }
      ChromaAnimation.LoadedAnimations1D[device1D] = undefined;
    //2D
    } else if (this.getDeviceType(device) == EChromaSDKDeviceTypeEnum.DE_2D) {
	  var device2D = this.getDevice2D(device);
	  var animation = this.LoadedAnimations2D[device2D];
      if (animation != undefined) {
        animation.stop();
      }
      this.LoadedAnimations2D[device2D] = undefined;
    }
  },
  stopAll: function() {
	this.stopByAnimationType(EChromaSDKDeviceEnum.DE_ChromaLink);
	this.stopByAnimationType(EChromaSDKDeviceEnum.DE_Headset);
	this.stopByAnimationType(EChromaSDKDeviceEnum.DE_Keyboard);
	this.stopByAnimationType(EChromaSDKDeviceEnum.DE_Keypad);
	this.stopByAnimationType(EChromaSDKDeviceEnum.DE_Mouse);
	this.stopByAnimationType(EChromaSDKDeviceEnum.DE_Mousepad);
  },
  isPlaying: function(animationName) {
    if (chromaSDK == undefined) {
      return false;
    }
    if (this.LoadedAnimations[animationName] != undefined) {
      return this.LoadedAnimations[animationName].isPlaying();
    }
    return false;
  },
  playAnimation: function(animationName, loop, frameCallback) {
    if (chromaSDK == undefined) {
      setTimeout(function() { ChromaAnimation.playAnimation(animationName, loop, frameCallback); }, 100);
      return;
    }
    if (this.LoadedAnimations[animationName] == undefined) {
      var refThis = this;
      ChromaAnimation.openAnimation(animationName,
        function (animation) {
          //console.log(animation);
          refThis.LoadedAnimations[animationName] = animation;
          //console.log('playAnimation:', animationName);
          animation.FrameCallback = frameCallback;
          switch (animation.DeviceType) {
            case EChromaSDKDeviceTypeEnum.DE_1D:
              ChromaAnimation.PlayingAnimations1D[animation.Device][animationName] = animation;
              break;
            case EChromaSDKDeviceTypeEnum.DE_2D:
              ChromaAnimation.PlayingAnimations2D[animation.Device][animationName] = animation;
              break;
          }
          animation.play(loop);
        });
    } else {
      var animation = this.LoadedAnimations[animationName];
      //console.log('playAnimation:', animationName);
      animation.FrameCallback = frameCallback;
      switch (animation.DeviceType) {
        case EChromaSDKDeviceTypeEnum.DE_1D:
          ChromaAnimation.PlayingAnimations1D[animation.Device][animationName] = animation;
          break;
        case EChromaSDKDeviceTypeEnum.DE_2D:
          ChromaAnimation.PlayingAnimations2D[animation.Device][animationName] = animation;
          break;
      }
      animation.play(loop);
    }
  },
  stopAnimation: function(animationName) {
    var animation = this.LoadedAnimations[animationName];
    if (animation != undefined) {
      this.LoadedAnimations[animationName].stop();
      switch (animation.DeviceType) {
        case EChromaSDKDeviceTypeEnum.DE_1D:
          ChromaAnimation.PlayingAnimations1D[animation.Device][animationName] = undefined;
          break;
        case EChromaSDKDeviceTypeEnum.DE_2D:
          ChromaAnimation.PlayingAnimations2D[animation.Device][animationName] = undefined;
          break;
      }
    }
  },
  closeAnimation: function(animationName) {
    if (this.LoadedAnimations[animationName] != undefined) {
      this.LoadedAnimations[animationName].stop();
      this.LoadedAnimations[animationName] = undefined;
    }
  },
  useIdleAnimation: function(device, flag) {
    switch (device) {
      case EChromaSDKDeviceEnum.DE_ChromaLink:
        ChromaAnimation.UseIdleAnimation1D[EChromaSDKDevice1DEnum.DE_ChromaLink] = flag;
        break;
      case EChromaSDKDeviceEnum.DE_Headset:
        ChromaAnimation.UseIdleAnimation1D[EChromaSDKDevice1DEnum.DE_Headset] = flag;
        break;
      case EChromaSDKDeviceEnum.DE_Mousepad:
        ChromaAnimation.UseIdleAnimation1D[EChromaSDKDevice1DEnum.DE_Mousepad] = flag;
        break;
      case EChromaSDKDeviceEnum.DE_Keyboard:
        ChromaAnimation.UseIdleAnimation2D[EChromaSDKDevice2DEnum.DE_Keyboard] = flag;
        break;
      case EChromaSDKDeviceEnum.DE_Keypad:
        ChromaAnimation.UseIdleAnimation2D[EChromaSDKDevice2DEnum.DE_Keypad] = flag;
        break;
      case EChromaSDKDeviceEnum.DE_Mouse:
        ChromaAnimation.UseIdleAnimation2D[EChromaSDKDevice2DEnum.DE_Mouse] = flag;
        break;
    }
  },
  useIdleAnimations: function(flag) {
    ChromaAnimation.UseIdleAnimation1D[EChromaSDKDevice1DEnum.DE_ChromaLink] = flag;
    ChromaAnimation.UseIdleAnimation1D[EChromaSDKDevice1DEnum.DE_Headset] = flag;
    ChromaAnimation.UseIdleAnimation1D[EChromaSDKDevice1DEnum.DE_Mousepad] = flag;
    ChromaAnimation.UseIdleAnimation2D[EChromaSDKDevice2DEnum.DE_Keyboard] = flag;
    ChromaAnimation.UseIdleAnimation2D[EChromaSDKDevice2DEnum.DE_Keypad] = flag;
    ChromaAnimation.UseIdleAnimation2D[EChromaSDKDevice2DEnum.DE_Mouse] = flag;
  },
  setIdleAnimation: function(animationName) {
    var animation = ChromaAnimation.LoadedAnimations[animationName];
    if (animation == undefined) {
      ChromaAnimation.openAnimation(animationName, function (animation) {
        switch (animation.DeviceType) {
          case EChromaSDKDeviceTypeEnum.DE_1D:
            ChromaAnimation.IdleAnimation1D[animation.Device] = animationName;
            break;
          case EChromaSDKDeviceTypeEnum.DE_2D:
            ChromaAnimation.IdleAnimation2D[animation.Device] = animationName;
            break;
        }
      });
    } else {
      switch (animation.DeviceType) {
        case EChromaSDKDeviceTypeEnum.DE_1D:
          ChromaAnimation.IdleAnimation1D[animation.Device] = animationName;
          break;
        case EChromaSDKDeviceTypeEnum.DE_2D:
          ChromaAnimation.IdleAnimation2D[animation.Device] = animationName;
          break;
      }
    }
  },
  reverseAllFrames: function (animationName) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    animation.Frames = animation.Frames.reverse();
  },
  setKeysColor: function(animationName, frameId, keys, color) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    if (frameId >= 0 && frameId < frames.length) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          for (var k = 0; k < keys.length; ++k) {
            var key = keys[k];
            if (getHighByte(key) == i &&
              getLowByte(key) == j) {
              row[j] = color;
            }
          }
        }
      }
    }
  },
  setKeysColorRGB: function(animationName, frameId, keys, red, green, blue) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    var color = ChromaAnimation.getRGB(red, green, blue);
    //console.log(animation.Frames);
    if (frameId >= 0 && frameId < frames.length) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          for (var k = 0; k < keys.length; ++k) {
            var key = keys[k];
            if (getHighByte(key) == i &&
              getLowByte(key) == j) {
              row[j] = color;
            }
          }
        }
      }
    }
  },
  setKeyColor: function(animationName, frameId, key, color) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    if (frameId >= 0 && frameId < frames.length) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          if (getHighByte(key) == i &&
            getLowByte(key) == j) {
            row[j] = color;
          }
        }
      }
    }
  },
  setKeyColorAllFrames: function(animationName, key, color) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < frames.length; ++frameId) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          if (getHighByte(key) == i &&
            getLowByte(key) == j) {
            row[j] = color;
          }
        }
      }
    }
  },
  setKeyColorAllFramesRGB: function(animationName, key, red, green, blue) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    var color = (red & 0xFF) | ((green & 0xFF) << 8) | ((blue & 0xFF) << 16);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < frames.length; ++frameId) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          if (getHighByte(key) == i &&
            getLowByte(key) == j) {
            row[j] = color;
          }
        }
      }
    }
  },
  setKeysColorAllFrames: function(animationName, keys, color) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < frames.length; ++frameId) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          for (var k = 0; k < keys.length; ++k) {
            var key = keys[k];
            if (getHighByte(key) == i &&
              getLowByte(key) == j) {
              row[j] = color;
            }
          }
        }
      }
    }
  },
  setKeysColorAllFramesRGB: function(animationName, keys, red, green, blue) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    var color = (red & 0xFF) | ((green & 0xFF) << 8) | ((blue & 0xFF) << 16);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < frames.length; ++frameId) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          for (var k = 0; k < keys.length; ++k) {
            var key = keys[k];
            if (getHighByte(key) == i &&
              getLowByte(key) == j) {
              row[j] = color;
            }
          }
        }
      }
    }
  },
  copyKeyColorAllFrames: function(sourceAnimationName, targetAnimationName, key) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      sourceAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    if (targetAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      targetAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < targetFrames.length; ++frameId) {
      var sourceFrame = sourceFrames[frameId % sourceFrames.length];
      var targetFrame = targetFrames[frameId];
      var sourceColors = sourceFrame.Colors;
      var targetColors = targetFrame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var sourceRow = sourceColors[i];
        var targetRow = targetColors[i];
        for (var j = 0; j < maxColumn; ++j) {
          if (getHighByte(key) == i &&
            getLowByte(key) == j) {
            targetRow[j] = sourceRow[j];
          }
        }
      }
    }
  },
  copyKeyColorAllFramesOffset: function(sourceAnimationName, targetAnimationName, key, offset) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      sourceAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    if (targetAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      targetAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < sourceFrames.length && (frameId+offset) < targetFrames.length; ++frameId) {
      var sourceFrame = sourceFrames[frameId];
      var targetFrame = targetFrames[(frameId+offset) % targetFrames.length];
      var sourceColors = sourceFrame.Colors;
      var targetColors = targetFrame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var sourceRow = sourceColors[i];
        var targetRow = targetColors[i];
        for (var j = 0; j < maxColumn; ++j) {
          if (getHighByte(key) == i &&
            getLowByte(key) == j) {
            targetRow[j] = sourceRow[j];
          }
        }
      }
    }
  },
  copyKeysColorAllFrames: function(sourceAnimationName, targetAnimationName, keys) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      sourceAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    if (targetAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      targetAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < targetFrames.length; ++frameId) {
      var sourceFrame = sourceFrames[frameId % sourceFrames.length];
      var targetFrame = targetFrames[frameId];
      var sourceColors = sourceFrame.Colors;
      var targetColors = targetFrame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var sourceRow = sourceColors[i];
        var targetRow = targetColors[i];
        for (var j = 0; j < maxColumn; ++j) {
          for (var k = 0; k < keys.length; ++k) {
            var key = keys[k];
            if (getHighByte(key) == i &&
              getLowByte(key) == j) {
              targetRow[j] = sourceRow[j];
            }
          }
        }
      }
    }
  },
  copyNonZeroAllKeys: function(sourceAnimationName, targetAnimationName, frameId) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      sourceAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    if (targetAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      targetAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    if (frameId >= 0 && frameId < targetFrames.length) {
      var sourceFrame = sourceFrames[frameId % sourceFrames.length];
      var targetFrame = targetFrames[frameId];
      var sourceColors = sourceFrame.Colors;
      var targetColors = targetFrame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var sourceRow = sourceColors[i];
        var targetRow = targetColors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = sourceRow[j];
          if (color != 0) {
            targetRow[j] = color;
          }
        }
      }
    }
  },
  copyNonZeroAllKeysAllFrames: function(sourceAnimationName, targetAnimationName) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != targetAnimation.DeviceType ||
      sourceAnimation.Device != targetAnimation.Device) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    if (sourceAnimation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(sourceAnimation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < targetFrames.length; ++frameId) {
        var sourceFrame = sourceFrames[frameId % sourceFrames.length];
        var targetFrame = targetFrames[frameId];
        var sourceColors = sourceFrame.Colors;
        var targetColors = targetFrame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = sourceColors[i];
          if (color != 0) {
            targetColors[i] = color;
          }
        }
      }
    } else if (sourceAnimation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(sourceAnimation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(sourceAnimation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < targetFrames.length; ++frameId) {
        var sourceFrame = sourceFrames[frameId % sourceFrames.length];
        var targetFrame = targetFrames[frameId];
        var sourceColors = sourceFrame.Colors;
        var targetColors = targetFrame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var sourceRow = sourceColors[i];
          var targetRow = targetColors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = sourceRow[j];
            if (color != 0) {
              targetRow[j] = color;
            }
          }
        }
      }
    }
  },
  addNonZeroAllKeysAllFrames: function(sourceAnimationName, targetAnimationName) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != targetAnimation.DeviceType ||
      sourceAnimation.Device != targetAnimation.Device) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    if (sourceAnimation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(sourceAnimation.Device);
      for (var frameId = 0; frameId < targetFrames.length; ++frameId) {
        var sourceFrame = sourceFrames[frameId % sourceFrames.length];
        var targetFrame = targetFrames[frameId];
        var sourceColors = sourceFrame.Colors;
        var targetColors = targetFrame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = sourceColors[i];
          if (color != 0) {
            var sourceRed = color & 0xFF;
            var sourceGreen = (color & 0xFF00) >> 8;
            var sourceBlue = (color & 0xFF0000) >> 16;

            var oldColor = targetColors[i];
            var oldRed = oldColor & 0xFF;
            var oldGreen = (oldColor & 0xFF00) >> 8;
            var oldBlue = (oldColor & 0xFF0000) >> 16;

            var red = Math.min(255, Math.max(0, Number(oldRed) + Number(sourceRed))) & 0xFF;
            var green = Math.min(255, Math.max(0, Number(oldGreen) + Number(sourceGreen))) & 0xFF;
            var blue = Math.min(255, Math.max(0, Number(oldBlue) + Number(sourceBlue))) & 0xFF;
            var newColor = red | (green << 8) | (blue << 16);

            targetColors[i] = newColor;
          }
        }
      }
    } else if (sourceAnimation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(sourceAnimation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(sourceAnimation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < targetFrames.length; ++frameId) {
        var sourceFrame = sourceFrames[frameId % sourceFrames.length];
        var targetFrame = targetFrames[frameId];
        var sourceColors = sourceFrame.Colors;
        var targetColors = targetFrame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var sourceRow = sourceColors[i];
          var targetRow = targetColors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = sourceRow[j];
            if (color != 0) {
              var sourceRed = color & 0xFF;
              var sourceGreen = (color & 0xFF00) >> 8;
              var sourceBlue = (color & 0xFF0000) >> 16;

              var oldColor = targetRow[j];
              var oldRed = oldColor & 0xFF;
              var oldGreen = (oldColor & 0xFF00) >> 8;
              var oldBlue = (oldColor & 0xFF0000) >> 16;

              var red = Math.min(255, Math.max(0, Number(oldRed) + Number(sourceRed))) & 0xFF;
              var green = Math.min(255, Math.max(0, Number(oldGreen) + Number(sourceGreen))) & 0xFF;
              var blue = Math.min(255, Math.max(0, Number(oldBlue) + Number(sourceBlue))) & 0xFF;
              var newColor = red | (green << 8) | (blue << 16);

              targetRow[j] = newColor;
            }
          }
        }
      }
    }
  },
  subtractNonZeroAllKeysAllFrames: function(sourceAnimationName, targetAnimationName) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != targetAnimation.DeviceType ||
      sourceAnimation.Device != targetAnimation.Device) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    if (sourceAnimation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(sourceAnimation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < targetFrames.length; ++frameId) {
        var sourceFrame = sourceFrames[frameId % sourceFrames.length];
        var targetFrame = targetFrames[frameId];
        var sourceColors = sourceFrame.Colors;
        var targetColors = targetFrame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = sourceColors[i];
          if (color != 0) {
            var sourceRed = color & 0xFF;
            var sourceGreen = (color & 0xFF00) >> 8;
            var sourceBlue = (color & 0xFF0000) >> 16;

            var oldColor = targetColors[i];
            var oldRed = oldColor & 0xFF;
            var oldGreen = (oldColor & 0xFF00) >> 8;
            var oldBlue = (oldColor & 0xFF0000) >> 16;

            var red = Math.min(255, Math.max(0, Number(oldRed) - Number(sourceRed))) & 0xFF;
            var green = Math.min(255, Math.max(0, Number(oldGreen) - Number(sourceGreen))) & 0xFF;
            var blue = Math.min(255, Math.max(0, Number(oldBlue) - Number(sourceBlue))) & 0xFF;
            var newColor = red | (green << 8) | (blue << 16);

            targetColors[i] = newColor;
          }
        }
      }
    } else if (sourceAnimation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(sourceAnimation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(sourceAnimation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < targetFrames.length; ++frameId) {
        var sourceFrame = sourceFrames[frameId % sourceFrames.length];
        var targetFrame = targetFrames[frameId];
        var sourceColors = sourceFrame.Colors;
        var targetColors = targetFrame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var sourceRow = sourceColors[i];
          var targetRow = targetColors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = sourceRow[j];
            if (color != 0) {
              var sourceRed = color & 0xFF;
              var sourceGreen = (color & 0xFF00) >> 8;
              var sourceBlue = (color & 0xFF0000) >> 16;

              var oldColor = targetRow[j];
              var oldRed = oldColor & 0xFF;
              var oldGreen = (oldColor & 0xFF00) >> 8;
              var oldBlue = (oldColor & 0xFF0000) >> 16;

              var red = Math.min(255, Math.max(0, Number(oldRed) - Number(sourceRed))) & 0xFF;
              var green = Math.min(255, Math.max(0, Number(oldGreen) - Number(sourceGreen))) & 0xFF;
              var blue = Math.min(255, Math.max(0, Number(oldBlue) - Number(sourceBlue))) & 0xFF;
              var newColor = red | (green << 8) | (blue << 16);

              targetRow[j] = newColor;
            }
          }
        }
      }
    }
  },
  addNonZeroAllKeysAllFramesOffset: function(sourceAnimationName, targetAnimationName, offset) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      sourceAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    if (targetAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      targetAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = sourceFrames.length-1; frameId >= 0; --frameId) {
      var sourceFrame = sourceFrames[frameId];
      var targetFrame = targetFrames[(frameId+offset) % targetFrames.length];
      var sourceColors = sourceFrame.Colors;
      var targetColors = targetFrame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var sourceRow = sourceColors[i];
        var targetRow = targetColors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = sourceRow[j];
          if (color != 0) {
            var sourceRed = color & 0xFF;
            var sourceGreen = (color & 0xFF00) >> 8;
            var sourceBlue = (color & 0xFF0000) >> 16;

            var oldColor = targetRow[j];
            var oldRed = oldColor & 0xFF;
            var oldGreen = (oldColor & 0xFF00) >> 8;
            var oldBlue = (oldColor & 0xFF0000) >> 16;

            var red = Math.min(255, Math.max(0, Number(oldRed) + Number(sourceRed))) & 0xFF;
            var green = Math.min(255, Math.max(0, Number(oldGreen) + Number(sourceGreen))) & 0xFF;
            var blue = Math.min(255, Math.max(0, Number(oldBlue) + Number(sourceBlue))) & 0xFF;
            var newColor = red | (green << 8) | (blue << 16);

            targetRow[j] = newColor;
          }
        }
      }
    }
  },
  subtractNonZeroAllKeysAllFramesOffset: function(sourceAnimationName, targetAnimationName, offset) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      sourceAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    if (targetAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      targetAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < sourceFrames.length && frameId < targetFrames.length; ++frameId) {
      var sourceFrame = sourceFrames[frameId];
      var targetFrame = targetFrames[(frameId+offset) % targetFrames.length];
      var sourceColors = sourceFrame.Colors;
      var targetColors = targetFrame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var sourceRow = sourceColors[i];
        var targetRow = targetColors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = sourceRow[j];
          if (color != 0) {
            var sourceRed = color & 0xFF;
            var sourceGreen = (color & 0xFF00) >> 8;
            var sourceBlue = (color & 0xFF0000) >> 16;

            var oldColor = targetRow[j];
            var oldRed = oldColor & 0xFF;
            var oldGreen = (oldColor & 0xFF00) >> 8;
            var oldBlue = (oldColor & 0xFF0000) >> 16;

            var red = Math.min(255, Math.max(0, Number(oldRed) - Number(sourceRed))) & 0xFF;
            var green = Math.min(255, Math.max(0, Number(oldGreen) - Number(sourceGreen))) & 0xFF;
            var blue = Math.min(255, Math.max(0, Number(oldBlue) - Number(sourceBlue))) & 0xFF;
            var newColor = red | (green << 8) | (blue << 16);

            targetRow[j] = newColor;
          }
        }
      }
    }
  },
  copyNonZeroAllKeysOffset: function(sourceAnimationName, targetAnimationName, frameId, offset) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      sourceAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    if (targetAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      targetAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    if (frameId >= 0 && frameId < sourceFrames.length) {
      var sourceFrame = sourceFrames[frameId];
      var targetFrame = targetFrames[(frameId+offset) % targetFrames.length];
      var sourceColors = sourceFrame.Colors;
      var targetColors = targetFrame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var sourceRow = sourceColors[i];
        var targetRow = targetColors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = sourceRow[j];
          if (color != 0) {
            targetRow[j] = color;
          }
        }
      }
    }
  },
  copyNonZeroAllKeysAllFramesOffset: function(sourceAnimationName, targetAnimationName, offset) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      sourceAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    if (targetAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      targetAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < sourceFrames.length && (frameId+offset) < targetFrames.length; ++frameId) {
      var sourceFrame = sourceFrames[frameId];
      var targetFrame = targetFrames[(frameId+offset) % targetFrames.length];
      var sourceColors = sourceFrame.Colors;
      var targetColors = targetFrame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var sourceRow = sourceColors[i];
        var targetRow = targetColors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = sourceRow[j];
          if (color != 0) {
            targetRow[j] = color;
          }
        }
      }
    }
  },
  copyNonZeroTargetAllKeys: function(sourceAnimationName, targetAnimationName, frameId) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      sourceAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    if (targetAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      targetAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    if (frameId >= 0 && frameId < targetFrames.length) {
      var sourceFrame = sourceFrames[frameId % sourceFrames.length];
      var targetFrame = targetFrames[frameId];
      var sourceColors = sourceFrame.Colors;
      var targetColors = targetFrame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var sourceRow = sourceColors[i];
        var targetRow = targetColors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = sourceRow[j];
          if (color != 0 &&
            targetRow[j] != 0) {
            targetRow[j] = color;
          }
        }
      }
    }
  },
  copyNonZeroTargetAllKeysAllFrames: function(sourceAnimationName, targetAnimationName) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      sourceAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    if (targetAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      targetAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < targetFrames.length; ++frameId) {
      var sourceFrame = sourceFrames[frameId % sourceFrames.length];
      var targetFrame = targetFrames[frameId];
      var sourceColors = sourceFrame.Colors;
      var targetColors = targetFrame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var sourceRow = sourceColors[i];
        var targetRow = targetColors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = sourceRow[j];
          if (color != 0 &&
            targetRow[j] != 0) {
            targetRow[j] = color;
          }
        }
      }
    }
  },
  copyNonZeroTargetZeroAllKeysAllFrames: function(sourceAnimationName, targetAnimationName) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      sourceAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    if (targetAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      targetAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < targetFrames.length; ++frameId) {
      var sourceFrame = sourceFrames[frameId % sourceFrames.length];
      var targetFrame = targetFrames[frameId];
      var sourceColors = sourceFrame.Colors;
      var targetColors = targetFrame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var sourceRow = sourceColors[i];
        var targetRow = targetColors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = sourceRow[j];
          if (color != 0 &&
            targetRow[j] == 0) {
            targetRow[j] = color;
          }
        }
      }
    }
  },
  copyNonZeroTargetAllKeysAllFramesOffset: function(sourceAnimationName, targetAnimationName, offset) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      sourceAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    if (targetAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      targetAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < targetFrames.length; ++frameId) {
      var sourceFrame = sourceFrames[frameId];
      var targetFrame = targetFrames[(frameId+offset) % targetFrames.length];
      var sourceColors = sourceFrame.Colors;
      var targetColors = targetFrame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var sourceRow = sourceColors[i];
        var targetRow = targetColors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = sourceRow[j];
          if (color != 0 &&
            targetRow[j] != 0) {
            targetRow[j] = color;
          }
        }
      }
    }
  },
  addNonZeroTargetAllKeysAllFrames: function(sourceAnimationName, targetAnimationName) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      sourceAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    if (targetAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      targetAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < targetFrames.length; ++frameId) {
      var sourceFrame = sourceFrames[frameId % sourceFrames.length];
      var targetFrame = targetFrames[frameId];
      var sourceColors = sourceFrame.Colors;
      var targetColors = targetFrame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var sourceRow = sourceColors[i];
        var targetRow = targetColors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = sourceRow[j];
          if (color != 0 &&
            targetRow[j] != 0) {
            var sourceRed = color & 0xFF;
            var sourceGreen = (color & 0xFF00) >> 8;
            var sourceBlue = (color & 0xFF0000) >> 16;

            var oldColor = targetRow[j];
            var oldRed = oldColor & 0xFF;
            var oldGreen = (oldColor & 0xFF00) >> 8;
            var oldBlue = (oldColor & 0xFF0000) >> 16;

            var red = Math.min(255, Math.max(0, Number(oldRed) + Number(sourceRed))) & 0xFF;
            var green = Math.min(255, Math.max(0, Number(oldGreen) + Number(sourceGreen))) & 0xFF;
            var blue = Math.min(255, Math.max(0, Number(oldBlue) + Number(sourceBlue))) & 0xFF;
            var newColor = red | (green << 8) | (blue << 16);

            targetRow[j] = newColor;
          }
        }
      }
    }
  },
  subtractNonZeroTargetAllKeysAllFrames: function(sourceAnimationName, targetAnimationName) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      sourceAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    if (targetAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      targetAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < targetFrames.length; ++frameId) {
      var sourceFrame = sourceFrames[frameId % sourceFrames.length];
      var targetFrame = targetFrames[frameId];
      var sourceColors = sourceFrame.Colors;
      var targetColors = targetFrame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var sourceRow = sourceColors[i];
        var targetRow = targetColors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = sourceRow[j];
          if (color != 0 &&
            targetRow[j] != 0) {
            var sourceRed = color & 0xFF;
            var sourceGreen = (color & 0xFF00) >> 8;
            var sourceBlue = (color & 0xFF0000) >> 16;

            var oldColor = targetRow[j];
            var oldRed = oldColor & 0xFF;
            var oldGreen = (oldColor & 0xFF00) >> 8;
            var oldBlue = (oldColor & 0xFF0000) >> 16;

            var red = Math.min(255, Math.max(0, Number(oldRed) - Number(sourceRed))) & 0xFF;
            var green = Math.min(255, Math.max(0, Number(oldGreen) - Number(sourceGreen))) & 0xFF;
            var blue = Math.min(255, Math.max(0, Number(oldBlue) - Number(sourceBlue))) & 0xFF;
            var newColor = red | (green << 8) | (blue << 16);

            targetRow[j] = newColor;
          }
        }
      }
    }
  },
  copyZeroTargetAllKeysAllFrames: function(sourceAnimationName, targetAnimationName) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      sourceAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    if (targetAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      targetAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < targetFrames.length; ++frameId) {
      var sourceFrame = sourceFrames[frameId % sourceFrames.length];
      var targetFrame = targetFrames[frameId];
      var sourceColors = sourceFrame.Colors;
      var targetColors = targetFrame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var sourceRow = sourceColors[i];
        var targetRow = targetColors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = sourceRow[j];
          if (color == 0 &&
            targetRow[j] != 0) {
            targetRow[j] = color;
          }
        }
      }
    }
  },
  copyZeroTargetZeroAllKeysAllFrames: function(sourceAnimationName, targetAnimationName) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    if (sourceAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      sourceAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    if (targetAnimation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      targetAnimation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    if (sourceFrames.length == 0) {
      return;
    }
    var targetFrames = targetAnimation.Frames;
    if (targetFrames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < targetFrames.length; ++frameId) {
      var sourceFrame = sourceFrames[frameId % sourceFrames.length];
      var targetFrame = targetFrames[frameId];
      var sourceColors = sourceFrame.Colors;
      var targetColors = targetFrame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var sourceRow = sourceColors[i];
        var targetRow = targetColors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = sourceRow[j];
          if (color == 0 &&
            targetRow[j] == 0) {
            targetRow[j] = color;
          }
        }
      }
    }
  },
  fillColor: function(animationName, frameId, newColor) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      //console.log(animation.Frames);
      if (frameId >= 0 && frameId < frames.length) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = colors[i];
          colors[i] = newColor;
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      if (frameId >= 0 && frameId < frames.length) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = row[j];
            row[j] = newColor;
          }
        }
      }
    }
  },
  fillNonZeroColor: function(animationName, frameId, newColor) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    if (frameId >= 0 && frameId < frames.length) {
      var frame = frames[frameId];
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = row[j];
          if (color != 0) {
            row[j] = newColor;
          }
        }
      }
    }
  },
  fillNonZeroColorRGB: function(animationName, frameId, red, green, blue) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    var newColor = ChromaAnimation.getRGB(red, green, blue);
    //console.log(animation.Frames);
    if (frameId >= 0 && frameId < frames.length) {
      var frame = frames[frameId];
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = row[j];
          if (color != 0) {
            row[j] = newColor;
          }
        }
      }
    }
  },
  fillNonZeroColorAllFrames: function(animationName, newColor) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < frames.length; ++frameId) {
      var frame = frames[frameId];
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = row[j];
          if (color != 0) {
            row[j] = newColor;
          }
        }
      }
    }
  },
  fillNonZeroColorAllFramesRGB: function(animationName, red, green, blue) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    var newColor = red | (green << 8) | (blue << 16);
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = colors[i];
          if (color != 0) {
            colors[i] = newColor;
          }
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = row[j];
            if (color != 0) {
              row[j] = newColor;
            }
          }
        }
      }
    }
  },
  fillZeroColor: function(animationName, frameId, newColor) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      //console.log(animation.Frames);
      if (frameId >= 0 && frameId < frames.length) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = colors[i];
          if (color == 0) {
            colors[i] = newColor;
          }
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      if (frameId >= 0 && frameId < frames.length) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = row[j];
            if (color == 0) {
              row[j] = newColor;
            }
          }
        }
      }
    }
  },
  fillZeroColorAllFrames: function(animationName, newColor) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = colors[i];
          if (color == 0) {
            colors[i] = newColor;
          }
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = row[j];
            if (color == 0) {
              row[j] = newColor;
            }
          }
        }
      }
    }
  },
  fillZeroColorAllFramesRGB: function(animationName, red, green, blue) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    var newColor = red | (green << 8) | (blue << 16);
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = colors[i];
          if (color == 0) {
            colors[i] = newColor;
          }
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = row[j];
            if (color == 0) {
              row[j] = newColor;
            }
          }
        }
      }
    }
  },
  fillThresholdColors: function(animationName, frameId, threshold, color) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    if (frameId >= 0 && frameId < frames.length) {
      var frame = frames[frameId];
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var oldColor = row[j];
          var red = oldColor & 0xFF;
          var green = (oldColor & 0xFF00) >> 8;
          var blue = (oldColor & 0xFF0000) >> 16;
          if (red != 0 &&
            green != 0 &&
            blue != 0 &&
            red <= threshold &&
            green <= threshold &&
            blue <= threshold) {
            row[j] = color;
          }
        }
      }
    }
  },
  fillThresholdColorsAllFrames: function(animationName, threshold, color) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var oldColor = colors[i];
          var red = oldColor & 0xFF;
          var green = (oldColor & 0xFF00) >> 8;
          var blue = (oldColor & 0xFF0000) >> 16;
          if ((red != 0 ||
            green != 0 ||
            blue != 0) &&
            red <= threshold &&
            green <= threshold &&
            blue <= threshold) {
            colors[i] = color;
          }
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var oldColor = row[j];
            var red = oldColor & 0xFF;
            var green = (oldColor & 0xFF00) >> 8;
            var blue = (oldColor & 0xFF0000) >> 16;
            if ((red != 0 ||
              green != 0 ||
              blue != 0) &&
              red <= threshold &&
              green <= threshold &&
              blue <= threshold) {
              row[j] = color;
            }
          }
        }
      }
    }
  },
  fillThresholdColorsRGB: function(animationName, frameId, threshold, red, green, blue) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      var color = ChromaAnimation.getRGB(red, green, blue);
      //console.log(animation.Frames);
      if (frameId >= 0 && frameId < frames.length) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var oldColor = colors[i];
          var red = oldColor & 0xFF;
          var green = (oldColor & 0xFF00) >> 8;
          var blue = (oldColor & 0xFF0000) >> 16;
          if ((red != 0 ||
            green != 0 ||
            blue != 0) &&
            red <= threshold &&
            green <= threshold &&
            blue <= threshold) {
            colors[i] = color;
          }
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      var color = ChromaAnimation.getRGB(red, green, blue);
      //console.log(animation.Frames);
      if (frameId >= 0 && frameId < frames.length) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var oldColor = row[j];
            var red = oldColor & 0xFF;
            var green = (oldColor & 0xFF00) >> 8;
            var blue = (oldColor & 0xFF0000) >> 16;
            if ((red != 0 ||
              green != 0 ||
              blue != 0) &&
              red <= threshold &&
              green <= threshold &&
              blue <= threshold) {
              row[j] = color;
            }
          }
        }
      }
    }
  },
  fillThresholdColorsAllFramesRGB: function(animationName, threshold, red, green, blue) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      var color = ChromaAnimation.getRGB(red, green, blue);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var oldColor = colors[i];
          var red = oldColor & 0xFF;
          var green = (oldColor & 0xFF00) >> 8;
          var blue = (oldColor & 0xFF0000) >> 16;
          if ((red != 0 ||
            green != 0 ||
            blue != 0) &&
            red <= threshold &&
            green <= threshold &&
            blue <= threshold) {
            colors[i] = color;
          }
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      var color = ChromaAnimation.getRGB(red, green, blue);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var oldColor = row[j];
            var red = oldColor & 0xFF;
            var green = (oldColor & 0xFF00) >> 8;
            var blue = (oldColor & 0xFF0000) >> 16;
            if ((red != 0 ||
              green != 0 ||
              blue != 0) &&
              red <= threshold &&
              green <= threshold &&
              blue <= threshold) {
              row[j] = color;
            }
          }
        }
      }
    }
  },
  fillThresholdColorsMinMaxRGB: function(animationName, frameId, minThreshold, minRed, minGreen, minBlue, maxThreshold, maxRed, maxGreen, maxBlue) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    var minColor = ChromaAnimation.getRGB(minRed, minGreen, minBlue);
    var maxColor = ChromaAnimation.getRGB(maxRed, maxGreen, maxBlue);
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      if (frameId >= 0 && frameId < frames.length) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var oldColor = colors[i];
          var red = oldColor & 0xFF;
          var green = (oldColor & 0xFF00) >> 8;
          var blue = (oldColor & 0xFF0000) >> 16;
          if (red != 0 ||
            green != 0 ||
            blue != 0) {
            if (red <= minThreshold &&
              green <= minThreshold &&
              blue <= minThreshold) {
              colors[i] = minColor;
            } else if (red >= maxThreshold ||
              green >= maxThreshold ||
              blue >= maxThreshold) {
              colors[i] = maxColor;
            }
          }
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
      var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
      //console.log(animation.Frames);
      if (frameId >= 0 && frameId < frames.length) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var oldColor = row[j];
            var red = oldColor & 0xFF;
            var green = (oldColor & 0xFF00) >> 8;
            var blue = (oldColor & 0xFF0000) >> 16;
            if (red != 0 ||
              green != 0 ||
              blue != 0) {
              if (red <= minThreshold &&
                green <= minThreshold &&
                blue <= minThreshold) {
                row[j] = minColor;
              } else if (red >= maxThreshold ||
                green >= maxThreshold ||
                blue >= maxThreshold) {
                row[j] = maxColor;
              }
            }
          }
        }
      }
    }
  },
  fillThresholdColorsMinMaxAllFramesRGB: function(animationName, minThreshold, minRed, minGreen, minBlue, maxThreshold, maxRed, maxGreen, maxBlue) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      var minColor = ChromaAnimation.getRGB(minRed, minGreen, minBlue);
      var maxColor = ChromaAnimation.getRGB(maxRed, maxGreen, maxBlue);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var oldColor = colors[i];
          var red = oldColor & 0xFF;
          var green = (oldColor & 0xFF00) >> 8;
          var blue = (oldColor & 0xFF0000) >> 16;
          if (red != 0 ||
            green != 0 ||
            blue != 0) {
            if (red <= minThreshold &&
              green <= minThreshold &&
              blue <= minThreshold) {
              colors[i] = minColor;
            } else if (red >= maxThreshold ||
              green >= maxThreshold ||
              blue >= maxThreshold) {
              colors[i] = maxColor;
            }
          }
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      var minColor = ChromaAnimation.getRGB(minRed, minGreen, minBlue);
      var maxColor = ChromaAnimation.getRGB(maxRed, maxGreen, maxBlue);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var oldColor = row[j];
            var red = oldColor & 0xFF;
            var green = (oldColor & 0xFF00) >> 8;
            var blue = (oldColor & 0xFF0000) >> 16;
            if (red != 0 ||
              green != 0 ||
              blue != 0) {
              if (red <= minThreshold &&
                green <= minThreshold &&
                blue <= minThreshold) {
                row[j] = minColor;
              } else if (red >= maxThreshold ||
                green >= maxThreshold ||
                blue >= maxThreshold) {
                row[j] = maxColor;
              }
            }
          }
        }
      }
    }
  },
  fillThresholdRGBColorsAllFramesRGB: function(animationName, redThreshold, greenThreshold, blueThreshold, red, green, blue) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    var color = ChromaAnimation.getRGB(red, green, blue);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < frames.length; ++frameId) {
      var frame = frames[frameId];
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var oldColor = row[j];
          var red = oldColor & 0xFF;
          var green = (oldColor & 0xFF00) >> 8;
          var blue = (oldColor & 0xFF0000) >> 16;
          if ((red != 0 ||
            green != 0 ||
            blue != 0) &&
            red <= redThreshold &&
            green <= greenThreshold &&
            blue <= blueThreshold) {
            row[j] = color;
          }
        }
      }
    }
  },
  fillRandomColors: function(animationName, frameId) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    if (frameId >= 0 && frameId < frames.length) {
      var frame = frames[frameId];
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var red = Math.floor(Math.random() * 256) % 256;
          var green = Math.floor(Math.random() * 256) % 256;
          var blue = Math.floor(Math.random() * 256) % 256;
          var color = red | (green << 8) | (blue << 16);
          row[j] = color;
        }
      }
    }
  },
  fillRandomColorsAllFrames: function(animationName) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var red = Math.floor(Math.random() * 256) % 256;
          var green = Math.floor(Math.random() * 256) % 256;
          var blue = Math.floor(Math.random() * 256) % 256;
          var color = red | (green << 8) | (blue << 16);
          colors[i] = color;
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var red = Math.floor(Math.random() * 256) % 256;
            var green = Math.floor(Math.random() * 256) % 256;
            var blue = Math.floor(Math.random() * 256) % 256;
            var color = red | (green << 8) | (blue << 16);
            row[j] = color;
          }
        }
      }
    }
  },
  fillRandomColorsBlackAndWhite: function(animationName, frameId) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    if (frameId >= 0 && frameId < frames.length) {
      var frame = frames[frameId];
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var c = Math.floor(Math.random() * 256) % 256;
          var red = c;
          var green = c;
          var blue = c;
          var color = red | (green << 8) | (blue << 16);
          row[j] = color;
        }
      }
    }
  },
  fillRandomColorsBlackAndWhiteAllFrames: function(animationName) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }
    //console.log(animation.Frames);
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var c = Math.floor(Math.random() * 256) % 256;
          var red = c;
          var green = c;
          var blue = c;
          var color = red | (green << 8) | (blue << 16);
          colors[i] = color;
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var c = Math.floor(Math.random() * 256) % 256;
            var red = c;
            var green = c;
            var blue = c;
            var color = red | (green << 8) | (blue << 16);
            row[j] = color;
          }
        }
      }
    }
  },
  invertColorsAllFrames: function(animationName) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (frames.length == 0) {
      return;
    }

    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = colors[i];
          var red = 255 - (color & 0xFF);
          var green = 255 - ((color & 0xFF00) >> 8);
          var blue = 255 - ((color & 0xFF0000) >> 16);
          color = red | (green << 8) | (blue << 16);
          colors[i] = color;
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = row[j];
            var red = 255 - (color & 0xFF);
            var green = 255 - ((color & 0xFF00) >> 8);
            var blue = 255 - ((color & 0xFF0000) >> 16);
            color = red | (green << 8) | (blue << 16);
            row[j] = color;
          }
        }
      }
    }
  },
  insertFrame: function(animationName, sourceFrame, targetFrame) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    this.stopAnimation(animationName);
    if (animation.Frames.length == 0) {
      console.error('insertFrame', 'Frame length is zero!', animationName)
      return;
    }
    if (sourceFrame < 0 ||
      sourceFrame >= animation.Frames.length) {
      return;
    }
    var copyFrame = animation.Frames[sourceFrame];
    var frames = [];
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < animation.Frames.length; ++frameId) {
        var oldFrame = animation.Frames[frameId];
        if (frameId == targetFrame) {
          var frame = new ChromaAnimationFrame1D();
          frame.Colors = new Array(maxLeds);
          for (var i = 0; i < maxLeds; ++i) {
            frame.Colors[i] = copyFrame.Colors[i];
          }
          frame.Duration = copyFrame.Duration;
          frames.push(frame);
        }
        frames.push(oldFrame);
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < animation.Frames.length; ++frameId) {
        var oldFrame = animation.Frames[frameId];
        if (frameId == targetFrame) {
          var frame = new ChromaAnimationFrame2D();
          frame.Colors = new Array(maxRow);
          for (var i = 0; i < maxRow; ++i) {
            frame.Colors[i] = new Array(maxColumn);
            for (var j = 0; j < maxColumn; ++j) {
              frame.Colors[i][j] = copyFrame.Colors[i][j];
            }
          }
          frame.Duration = copyFrame.Duration;
          frames.push(frame);
        }
        frames.push(oldFrame);
      }
    }
    animation.Frames = frames;
  },
  insertDelay: function(animationName, frameId, delay) {
    for (var i = 0; i < delay; ++i) {
      this.insertFrame(animationName, frameId, frameId);
    }
  },
  appendAllFrames: function(sourceAnimationName, targetAnimationName) {
    var sourceAnimation = this.LoadedAnimations[sourceAnimationName];
    if (sourceAnimation == undefined) {
      return;
    }
    var targetAnimation = this.LoadedAnimations[targetAnimationName];
    if (targetAnimation == undefined) {
      return;
    }
    this.stopAnimation(targetAnimationName);
    if (sourceAnimation.Frames.length == 0) {
      console.error('appendAllFrames', 'Source Frame length is zero!', animationName)
      return;
    }
    var sourceFrames = sourceAnimation.Frames;
    var targetFrames = targetAnimation.Frames;
    var frameCount = sourceFrames.length;
    if (sourceAnimation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(sourceAnimation.Device);
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        var sourceFrame = sourceFrames[frameId];
        var frame = new ChromaAnimationFrame1D();
        frame.Colors = new Array(maxLeds);
        for (var i = 0; i < maxLeds; ++i) {
          frame.Colors[i] = sourceFrame.Colors[i];
        }
        frame.Duration = sourceFrame.Duration;
        targetFrames.push(frame);
      }
    } else if (sourceAnimation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(sourceAnimation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(sourceAnimation.Device);
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        var sourceFrame = sourceFrames[frameId];
        var frame = new ChromaAnimationFrame2D();
        frame.Colors = new Array(maxRow);
        for (var i = 0; i < maxRow; ++i) {
          frame.Colors[i] = new Array(maxColumn);
          for (var j = 0; j < maxColumn; ++j) {
            frame.Colors[i][j] = sourceFrame.Colors[i][j];
          }
        }
        frame.Duration = sourceFrame.Duration;
        targetFrames.push(frame);
      }
    }
  },
  duplicateFirstFrame: function(animationName, frameCount) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    this.stopAnimation(animationName);
    if (animation.Frames.length == 0) {
      console.error('duplicateFirstFrame', 'Frame length is zero!', animationName)
      return;
    }
    var firstFrame = animation.Frames[0];
    var frames = [];
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        var frame = new ChromaAnimationFrame1D();
        frame.Colors = new Array(maxLeds);
        for (var i = 0; i < maxLeds; ++i) {
          frame.Colors[i] = firstFrame.Colors[i];
        }
        frame.Duration = firstFrame.Duration;
        frames.push(frame);
      }
      animation.Frames = frames;
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        var frame = new ChromaAnimationFrame2D();
        frame.Colors = new Array(maxRow);
        for (var i = 0; i < maxRow; ++i) {
          frame.Colors[i] = new Array(maxColumn);
          for (var j = 0; j < maxColumn; ++j) {
            frame.Colors[i][j] = firstFrame.Colors[i][j];
          }
        }
        frame.Duration = firstFrame.Duration;
        frames.push(frame);
      }
      animation.Frames = frames;
    }
  },
  duplicateFrames: function(animationName) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    this.stopAnimation(animationName);
    if (animation.Frames.length == 0) {
      console.error('duplicateFrames', 'Frame length is zero!', animationName)
      return;
    }
    var frames = [];
    var frameCount = animation.Frames.length;
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        for (var d = 0; d < 2; ++d) {
          var copyFrame = animation.Frames[frameId];
          var frame = new ChromaAnimationFrame1D();
          frame.Colors = new Array(maxLeds);
          for (var i = 0; i < maxLeds; ++i) {
            frame.Colors[i] = copyFrame.Colors[i];
          }
          frame.Duration = copyFrame.Duration;
          frames.push(frame);
        }
      }
      animation.Frames = frames;
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        for (var d = 0; d < 2; ++d) {
          var copyFrame = animation.Frames[frameId];
          var frame = new ChromaAnimationFrame2D();
          frame.Colors = new Array(maxRow);
          for (var i = 0; i < maxRow; ++i) {
            frame.Colors[i] = new Array(maxColumn);
            for (var j = 0; j < maxColumn; ++j) {
              frame.Colors[i][j] = copyFrame.Colors[i][j];
            }
          }
          frame.Duration = copyFrame.Duration;
          frames.push(frame);
        }
      }
    }
    animation.Frames = frames;
  },
  duplicateMirrorFrames: function(animationName) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    this.stopAnimation(animationName);
    if (animation.Frames.length == 0) {
      console.error('duplcateMirrorFrames', 'Frame length is zero!', animationName)
      return;
    }
    var frames = [];
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      //console.log(animation.Frames);
      var frameCount = animation.Frames.length;
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        var copyFrame = animation.Frames[frameId];
        var frame = new ChromaAnimationFrame1D();
        frame.Colors = new Array(maxLeds);
        for (var i = 0; i < maxLeds; ++i) {
          frame.Colors[i] = copyFrame.Colors[i];
        }
        frame.Duration = copyFrame.Duration;
        frames.push(frame);
      }
      for (var frameId = frameCount - 1; frameId >= 0; --frameId) {
        var copyFrame = animation.Frames[frameId];
        var frame = new ChromaAnimationFrame1D();
        frame.Colors = new Array(maxLeds);
        for (var i = 0; i < maxLeds; ++i) {
          frame.Colors[i] = copyFrame.Colors[i];
        }
        frame.Duration = copyFrame.Duration;
        frames.push(frame);
      }
      animation.Frames = frames;
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      var frameCount = animation.Frames.length;
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        var copyFrame = animation.Frames[frameId];
        var frame = new ChromaAnimationFrame2D();
        frame.Colors = new Array(maxRow);
        for (var i = 0; i < maxRow; ++i) {
          frame.Colors[i] = new Array(maxColumn);
          for (var j = 0; j < maxColumn; ++j) {
            frame.Colors[i][j] = copyFrame.Colors[i][j];
          }
        }
        frame.Duration = copyFrame.Duration;
        frames.push(frame);
      }
      for (var frameId = frameCount - 1; frameId >= 0; --frameId) {
        var copyFrame = animation.Frames[frameId];
        var frame = new ChromaAnimationFrame2D();
        frame.Colors = new Array(maxRow);
        for (var i = 0; i < maxRow; ++i) {
          frame.Colors[i] = new Array(maxColumn);
          for (var j = 0; j < maxColumn; ++j) {
            frame.Colors[i][j] = copyFrame.Colors[i][j];
          }
        }
        frame.Duration = copyFrame.Duration;
        frames.push(frame);
      }
      animation.Frames = frames;
    }
  },
  copyAnimation: function(animationName, newAnimationName) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.Frames.length == 0) {
      console.error('duplicateFirstFrame', 'Frame length is zero!', animationName)
      return;
    }
    var frames = [];
    var frameCount = animation.Frames.length;
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        var copyFrame = animation.Frames[frameId];
        var frame = new ChromaAnimationFrame1D();
        frame.Colors = new Array(maxLeds);
        for (var i = 0; i < maxLeds; ++i) {
          frame.Colors[i] = copyFrame.Colors[i];
        }
        frame.Duration = copyFrame.Duration;
        frames.push(frame);
      }
      var newAnimation = new ChromaAnimation1D();
      newAnimation.Device = animation.Device;
      newAnimation.DeviceType = animation.DeviceType;
      newAnimation.Frames = frames;
      this.LoadedAnimations[newAnimationName] = newAnimation;
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        var copyFrame = animation.Frames[frameId];
        var frame = new ChromaAnimationFrame2D();
        frame.Colors = new Array(maxRow);
        for (var i = 0; i < maxRow; ++i) {
          frame.Colors[i] = new Array(maxColumn);
          for (var j = 0; j < maxColumn; ++j) {
            frame.Colors[i][j] = copyFrame.Colors[i][j];
          }
        }
        frame.Duration = copyFrame.Duration;
        frames.push(frame);
      }
      var newAnimation = new ChromaAnimation2D();
      newAnimation.Device = animation.Device;
      newAnimation.DeviceType = animation.DeviceType;
      newAnimation.Frames = frames;
      this.LoadedAnimations[newAnimationName] = newAnimation;
    }
  },
  convertAnimation: function(animationName, newAnimationName, newDeviceType, newDevice) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.Frames.length == 0) {
      console.error('duplicateFirstFrame', 'Frame length is zero!', animationName)
      return;
    }
    ChromaAnimation.closeAnimation(newAnimationName);
    var frames = [];
    var frameCount = animation.Frames.length;

    // this only converts keyboard frames to *.*
    var keyboardMaxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var keyboardMaxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);

    if (newDeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        var copyFrame = animation.Frames[frameId];
        var maxLeds = ChromaAnimation.getMaxLeds(newDevice);
        var frame = new ChromaAnimationFrame1D();
        frame.Colors = new Array(maxLeds);
        for (var i = 0; i < keyboardMaxRow; ++i) {
          if (i >= 1) {
            continue;
          }
          for (var j = 0; j < keyboardMaxColumn; ++j) {
            if (j >= maxLeds) {
              continue;
            }
            frame.Colors[j] = copyFrame.Colors[i][j];
          }
        }
        frame.Duration = copyFrame.Duration;
        frames.push(frame);
      }

      var newAnimation = new ChromaAnimation1D();
      newAnimation.Name = newAnimationName;
      newAnimation.Device = newDevice;
      newAnimation.DeviceType = newDeviceType;
      newAnimation.Frames = frames;
      this.LoadedAnimations[newAnimationName] = newAnimation;
      return newAnimation;
    } else if (newDeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        var copyFrame = animation.Frames[frameId];
        var maxRow = ChromaAnimation.getMaxRow(newDevice);
        var maxColumn = ChromaAnimation.getMaxColumn(newDevice);
        var frame = new ChromaAnimationFrame2D();
        frame.Colors = new Array(maxRow);
        for (var i = 0; i < keyboardMaxRow || i < maxRow; ++i) {
          if (i >= maxRow) {
            continue;
          }
          frame.Colors[i] = new Array(maxColumn);
          for (var j = 0; j < keyboardMaxColumn || j < maxColumn; ++j) {
            if (j >= maxColumn) {
              continue;
            }
            var color = undefined;
            if (i >= keyboardMaxRow ||
              j >= keyboardMaxColumn) {
              color = 0;
            } else {
              color = copyFrame.Colors[i][j];
            }
            frame.Colors[i][j] = color;
          }
        }
        frame.Duration = copyFrame.Duration;
        frames.push(frame);
      }

      var newAnimation = new ChromaAnimation2D();
      newAnimation.Name = newAnimationName;
      newAnimation.Device = newDevice;
      newAnimation.DeviceType = newDeviceType;
      newAnimation.Frames = frames;
      this.LoadedAnimations[newAnimationName] = newAnimation;
      return newAnimation;
    }
  },
  createAnimation: function(animationName, deviceType, device) {
    this.closeAnimation(animationName);
    var frames = [];
    var frameCount = 1;
    if (deviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        var frame = new ChromaAnimationFrame1D();
        frame.Colors = new Array(maxLeds);
        for (var i = 0; i < maxLeds; ++i) {
          frame.Colors[i] = 0;
        }
        frame.Duration = 0.1;
        frames.push(frame);
      }
      var newAnimation = new ChromaAnimation1D();
      newAnimation.Device = device;
      newAnimation.DeviceType = deviceType;
      newAnimation.Frames = frames;
      this.LoadedAnimations[animationName] = newAnimation;
    } else if (deviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(device);
      var maxColumn = ChromaAnimation.getMaxColumn(device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        var frame = new ChromaAnimationFrame2D();
        frame.Colors = new Array(maxRow);
        for (var i = 0; i < maxRow; ++i) {
          frame.Colors[i] = new Array(maxColumn);
          for (var j = 0; j < maxColumn; ++j) {
            frame.Colors[i][j] = 0;
          }
        }
        frame.Duration = 0.1;
        frames.push(frame);
      }
      var newAnimation = new ChromaAnimation2D();
      newAnimation.Device = device;
      newAnimation.DeviceType = deviceType;
      newAnimation.Frames = frames;
      this.LoadedAnimations[animationName] = newAnimation;
    }
  },
  reduceFrames: function(animationName, n) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    this.stopAnimation(animationName);
    if (animation.Frames.length == 0) {
      console.error('duplicateFirstFrame', 'Frame length is zero!', animationName)
      return;
    }
    var frames = [];
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      var frameCount = animation.Frames.length;
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        if (frameId % n == 0) {
          continue;
        }
        var copyFrame = animation.Frames[frameId];
        var frame = new ChromaAnimationFrame1D();
        frame.Colors = new Array(maxLeds);
        for (var i = 0; i < maxLeds; ++i) {
          frame.Colors[i] = copyFrame.Colors[i];
        }
        frame.Duration = copyFrame.Duration;
        frames.push(frame);
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      var frameCount = animation.Frames.length;
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        if (frameId % n == 0) {
          continue;
        }
        var copyFrame = animation.Frames[frameId];
        var frame = new ChromaAnimationFrame2D();
        frame.Colors = new Array(maxRow);
        for (var i = 0; i < maxRow; ++i) {
          frame.Colors[i] = new Array(maxColumn);
          for (var j = 0; j < maxColumn; ++j) {
            frame.Colors[i][j] = copyFrame.Colors[i][j];
          }
        }
        frame.Duration = copyFrame.Duration;
        frames.push(frame);
      }
    }
    animation.Frames = frames;
  },
  trimFrame: function(animationName, removeFrameId) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    this.stopAnimation(animationName);
    if (animation.Frames.length == 0) {
      console.error('duplicateFirstFrame', 'Frame length is zero!', animationName)
      return;
    }
    var frames = [];
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    var frameCount = animation.Frames.length;
    for (var frameId = 0; frameId < frameCount; ++frameId) {
      if (frameId == removeFrameId) {
        continue;
      }
      var frame = animation.Frames[frameId];
      frames.push(frame);
    }
    animation.Frames = frames;
  },
  trimStartFrames: function(animationName, numberOfFrames) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    this.stopAnimation(animationName);
    if (animation.Frames.length == 0) {
      console.error('trimStartFrames', 'Frame length is zero!', animationName)
      return;
    }
    //console.log(animation.Frames);
    for (var i = 0; i < numberOfFrames; ++i) {
      this.trimFrame(animationName, 0);
    }
  },
  trimEndFrames: function(animationName, lastFrameId) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    this.stopAnimation(animationName);
    if (animation.Frames.length == 0) {
      console.error('trimEndFrames', 'Frame length is zero!', animationName)
      return;
    }
    //console.log(animation.Frames);
    while (lastFrameId >= 0 &&
      (lastFrameId+1) < animation.Frames.length) {
        this.trimFrame(animationName, animation.Frames.length - 1);
    }
  },
  fadeStartFrames: function(animationName, fade) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    this.stopAnimation(animationName);
    if (animation.Frames.length == 0) {
      console.error('fadeStartFrames', 'Frame length is zero!', animationName)
      return;
    }
    if (fade <= 0) {
      return;
    }
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < fade; ++frameId) {
      var t = (frameId+1) / fade;
      this.multiplyIntensity(animationName, frameId, t);
    }
  },
  fadeEndFrames: function(animationName, fade) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    this.stopAnimation(animationName);
    if (animation.Frames.length == 0) {
      console.error('fadeEndFrames', 'Frame length is zero!', animationName)
      return;
    }
    if (fade <= 0) {
      return;
    }
    //console.log(animation.Frames);
    for (var offset = 0; offset < fade; ++offset) {
      var frameId = animation.Frames.length - 1 - offset;
      var t = (offset+1) / fade;
      this.multiplyIntensity(animationName, frameId, t);
    }
  },
  makeBlankFrames: function(animationName, frameCount, duration, color) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    this.stopAnimation(animationName);
    var frames = [];
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        var frame = new ChromaAnimationFrame1D();
        frame.Colors = new Array(maxLeds);
        for (var i = 0; i < maxLeds; ++i) {
          frame.Colors[i] = color;
        }
        frame.Duration = duration;
        frames.push(frame);
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        var frame = new ChromaAnimationFrame2D();
        frame.Colors = new Array(maxRow);
        for (var i = 0; i < maxRow; ++i) {
          frame.Colors[i] = new Array(maxColumn);
          for (var j = 0; j < maxColumn; ++j) {
            frame.Colors[i][j] = color;
          }
        }
        frame.Duration = duration;
        frames.push(frame);
      }
    }
    animation.Frames = frames;
  },
  makeBlankFramesRGB: function(animationName, frameCount, duration, red, green, blue) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    this.stopAnimation(animationName);
    var frames = [];
    var color = ChromaAnimation.getRGB(red, green, blue);
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        var frame = new ChromaAnimationFrame1D();
        frame.Colors = new Array(maxLeds);
        for (var i = 0; i < maxLeds; ++i) {
          frame.Colors[i] = color;
        }
        frame.Duration = duration;
        frames.push(frame);
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frameCount; ++frameId) {
        var frame = new ChromaAnimationFrame2D();
        frame.Colors = new Array(maxRow);
        for (var i = 0; i < maxRow; ++i) {
          frame.Colors[i] = new Array(maxColumn);
          for (var j = 0; j < maxColumn; ++j) {
            frame.Colors[i][j] = color;
          }
        }
        frame.Duration = duration;
        frames.push(frame);
      }
    }
    animation.Frames = frames;
  },
  offsetColors: function(animationName, frameId, redOffset, greenOffset, blueOffset) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    if (frameId >= 0 && frameId < frames.length) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = row[j];
          //console.log('color', color);
          var red = (color & 0xFF);
          var green = (color & 0xFF00) >> 8;
          var blue = (color & 0xFF0000) >> 16;
          red = Math.min(255, Math.max(0, Number(red) + Number(redOffset))) & 0xFF;
          green = Math.min(255, Math.max(0, Number(green) + Number(greenOffset))) & 0xFF;
          blue = Math.min(255, Math.max(0, Number(blue) + Number(blueOffset))) & 0xFF;
          color = red | (green << 8) | (blue << 16);
          row[j] = color;
        }
      }
    }
  },
  offsetColorsWithColor: function(animationName, frameId, color) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var redOffset = (color & 0xFF);
    var greenOffset = (color & 0xFF00) >> 8;
    var blueOffset = (color & 0xFF0000) >> 16;
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    if (frameId >= 0 && frameId < frames.length) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = row[j];
          //console.log('color', color);
          var red = (color & 0xFF);
          var green = (color & 0xFF00) >> 8;
          var blue = (color & 0xFF0000) >> 16;
          red = Math.min(255, Math.max(0, Number(red) + Number(redOffset))) & 0xFF;
          green = Math.min(255, Math.max(0, Number(green) + Number(greenOffset))) & 0xFF;
          blue = Math.min(255, Math.max(0, Number(blue) + Number(blueOffset))) & 0xFF;
          color = red | (green << 8) | (blue << 16);
          row[j] = color;
        }
      }
    }
  },
  offsetColorsWithColorAllFrames: function(animationName, color) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var redOffset = (color & 0xFF);
    var greenOffset = (color & 0xFF00) >> 8;
    var blueOffset = (color & 0xFF0000) >> 16;
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < frames.length; ++frameId) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = row[j];
          //console.log('color', color);
          var red = (color & 0xFF);
          var green = (color & 0xFF00) >> 8;
          var blue = (color & 0xFF0000) >> 16;
          red = Math.min(255, Math.max(0, Number(red) + Number(redOffset))) & 0xFF;
          green = Math.min(255, Math.max(0, Number(green) + Number(greenOffset))) & 0xFF;
          blue = Math.min(255, Math.max(0, Number(blue) + Number(blueOffset))) & 0xFF;
          color = red | (green << 8) | (blue << 16);
          row[j] = color;
        }
      }
    }
  },
  offsetNonZeroColorsWithColorAllFrames: function(animationName, color) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var redOffset = (color & 0xFF);
    var greenOffset = (color & 0xFF00) >> 8;
    var blueOffset = (color & 0xFF0000) >> 16;
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < frames.length; ++frameId) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = row[j];
          if (color != 0) {
            //console.log('color', color);
            var red = (color & 0xFF);
            var green = (color & 0xFF00) >> 8;
            var blue = (color & 0xFF0000) >> 16;
            red = Math.min(255, Math.max(0, Number(red) + Number(redOffset))) & 0xFF;
            green = Math.min(255, Math.max(0, Number(green) + Number(greenOffset))) & 0xFF;
            blue = Math.min(255, Math.max(0, Number(blue) + Number(blueOffset))) & 0xFF;
            color = red | (green << 8) | (blue << 16);
            row[j] = color;
          }
        }
      }
    }
  },
  offsetColorsAllFrames: function(animationName, redOffset, greenOffset, blueOffset) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = colors[i];
          //console.log('color', color);
          var red = (color & 0xFF);
          var green = (color & 0xFF00) >> 8;
          var blue = (color & 0xFF0000) >> 16;
          red = Math.min(255, Math.max(0, Number(red) + Number(redOffset))) & 0xFF;
          green = Math.min(255, Math.max(0, Number(green) + Number(greenOffset))) & 0xFF;
          blue = Math.min(255, Math.max(0, Number(blue) + Number(blueOffset))) & 0xFF;
          color = red | (green << 8) | (blue << 16);
          colors[i] = color;
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = row[j];
            //console.log('color', color);
            var red = (color & 0xFF);
            var green = (color & 0xFF00) >> 8;
            var blue = (color & 0xFF0000) >> 16;
            red = Math.min(255, Math.max(0, Number(red) + Number(redOffset))) & 0xFF;
            green = Math.min(255, Math.max(0, Number(green) + Number(greenOffset))) & 0xFF;
            blue = Math.min(255, Math.max(0, Number(blue) + Number(blueOffset))) & 0xFF;
            color = red | (green << 8) | (blue << 16);
            row[j] = color;
          }
        }
      }
    }
  },
  offsetNonZeroColors: function(animationName, frameId, redOffset, greenOffset, blueOffset) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    if (frameId >= 0 && frameId < frames.length) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = row[j];
          if (color != 0) {
            //console.log('color', color);
            var red = (color & 0xFF);
            var green = (color & 0xFF00) >> 8;
            var blue = (color & 0xFF0000) >> 16;
            red = Math.min(255, Math.max(0, Number(red) + Number(redOffset))) & 0xFF;
            green = Math.min(255, Math.max(0, Number(green) + Number(greenOffset))) & 0xFF;
            blue = Math.min(255, Math.max(0, Number(blue) + Number(blueOffset))) & 0xFF;
            color = red | (green << 8) | (blue << 16);
            row[j] = color;
          }
        }
      }
    }
  },
  offsetNonZeroColorsAllFrames: function(animationName, redOffset, greenOffset, blueOffset) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < frames.length; ++frameId) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = row[j];
          if (color != 0) {
            //console.log('color', color);
            var red = (color & 0xFF);
            var green = (color & 0xFF00) >> 8;
            var blue = (color & 0xFF0000) >> 16;
            red = Math.min(255, Math.max(0, Number(red) + Number(redOffset))) & 0xFF;
            green = Math.min(255, Math.max(0, Number(green) + Number(greenOffset))) & 0xFF;
            blue = Math.min(255, Math.max(0, Number(blue) + Number(blueOffset))) & 0xFF;
            color = red | (green << 8) | (blue << 16);
            row[j] = color;
          }
        }
      }
    }
  },
  multiplyIntensity: function(animationName, frameId, intensity) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      //console.log(animation.Frames);
      if (frameId >= 0 && frameId < frames.length) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = colors[i];
          //console.log('color', color);
          var red = (color & 0xFF);
          var green = (color & 0xFF00) >> 8;
          var blue = (color & 0xFF0000) >> 16;
          red = Math.min(255, Math.max(0, Number(red) * Number(intensity))) & 0xFF;
          green = Math.min(255, Math.max(0, Number(green) * Number(intensity))) & 0xFF;
          blue = Math.min(255, Math.max(0, Number(blue) * Number(intensity))) & 0xFF;
          color = red | (green << 8) | (blue << 16);
          colors[i] = color;
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      if (frameId >= 0 && frameId < frames.length) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = row[j];
            //console.log('color', color);
            var red = (color & 0xFF);
            var green = (color & 0xFF00) >> 8;
            var blue = (color & 0xFF0000) >> 16;
            red = Math.min(255, Math.max(0, Number(red) * Number(intensity))) & 0xFF;
            green = Math.min(255, Math.max(0, Number(green) * Number(intensity))) & 0xFF;
            blue = Math.min(255, Math.max(0, Number(blue) * Number(intensity))) & 0xFF;
            color = red | (green << 8) | (blue << 16);
            row[j] = color;
          }
        }
      }
    }
  },
  getRGB(red, green, blue) {
    return (red & 0xFF) | ((green & 0xFF) << 8) | ((blue & 0xFF) << 16);
  },
  getRed(color) {
    var red = (color & 0xFF);
    return red;
  },
  getGreen(color) {
    var green = (color & 0xFF00) >> 8;
    return green;
  },
  getBlue(color) {
    var blue = (color & 0xFF0000) >> 16;
    return blue;
  },
  debugColor(color) {
    var red = (color & 0xFF);
    var green = (color & 0xFF00) >> 8;
    var blue = (color & 0xFF0000) >> 16;
    console.log('Red', red, 'Green', green, 'Blue', blue);
  },
  multiplyIntensityColor: function(animationName, frameId, colorTint) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      var red = (colorTint & 0xFF);
      var green = (colorTint & 0xFF00) >> 8;
      var blue = (colorTint & 0xFF0000) >> 16;
      var redIntensity = red / 255.0;
      var greenIntensity = green / 255.0;
      var blueIntensity = blue / 255.0;
      //console.log(animation.Frames);
      if (frameId >= 0 && frameId < frames.length) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = colors[i];
          //console.log('color', color);
          var red = (color & 0xFF);
          var green = (color & 0xFF00) >> 8;
          var blue = (color & 0xFF0000) >> 16;
          red = Math.min(255, Math.max(0, Number(red) * Number(redIntensity))) & 0xFF;
          green = Math.min(255, Math.max(0, Number(green) * Number(greenIntensity))) & 0xFF;
          blue = Math.min(255, Math.max(0, Number(blue) * Number(blueIntensity))) & 0xFF;
          color = red | (green << 8) | (blue << 16);
          colors[i] = color;
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      var red = (colorTint & 0xFF);
      var green = (colorTint & 0xFF00) >> 8;
      var blue = (colorTint & 0xFF0000) >> 16;
      var redIntensity = red / 255.0;
      var greenIntensity = green / 255.0;
      var blueIntensity = blue / 255.0;
      //console.log(animation.Frames);
      if (frameId >= 0 && frameId < frames.length) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = row[j];
            //console.log('color', color);
            var red = (color & 0xFF);
            var green = (color & 0xFF00) >> 8;
            var blue = (color & 0xFF0000) >> 16;
            red = Math.min(255, Math.max(0, Number(red) * Number(redIntensity))) & 0xFF;
            green = Math.min(255, Math.max(0, Number(green) * Number(greenIntensity))) & 0xFF;
            blue = Math.min(255, Math.max(0, Number(blue) * Number(blueIntensity))) & 0xFF;
            color = red | (green << 8) | (blue << 16);
            row[j] = color;
          }
        }
      }
    }
  },
  multiplyIntensityColorAllFrames: function(animationName, colorTint) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      var red = (colorTint & 0xFF);
      var green = (colorTint & 0xFF00) >> 8;
      var blue = (colorTint & 0xFF0000) >> 16;
      var redIntensity = red / 255.0;
      var greenIntensity = green / 255.0;
      var blueIntensity = blue / 255.0;
      //console.log(animation.Frames);
      for (frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = colors[i];
          //console.log('color', color);
          var red = (color & 0xFF);
          var green = (color & 0xFF00) >> 8;
          var blue = (color & 0xFF0000) >> 16;
          red = Math.min(255, Math.max(0, Number(red) * Number(redIntensity))) & 0xFF;
          green = Math.min(255, Math.max(0, Number(green) * Number(greenIntensity))) & 0xFF;
          blue = Math.min(255, Math.max(0, Number(blue) * Number(blueIntensity))) & 0xFF;
          color = red | (green << 8) | (blue << 16);
          colors[i] = color;
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      var red = (colorTint & 0xFF);
      var green = (colorTint & 0xFF00) >> 8;
      var blue = (colorTint & 0xFF0000) >> 16;
      var redIntensity = red / 255.0;
      var greenIntensity = green / 255.0;
      var blueIntensity = blue / 255.0;
      //console.log(animation.Frames);
      for (frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = row[j];
            //console.log('color', color);
            var red = (color & 0xFF);
            var green = (color & 0xFF00) >> 8;
            var blue = (color & 0xFF0000) >> 16;
            red = Math.min(255, Math.max(0, Number(red) * Number(redIntensity))) & 0xFF;
            green = Math.min(255, Math.max(0, Number(green) * Number(greenIntensity))) & 0xFF;
            blue = Math.min(255, Math.max(0, Number(blue) * Number(blueIntensity))) & 0xFF;
            color = red | (green << 8) | (blue << 16);
            row[j] = color;
          }
        }
      }
    }
  },
  multiplyIntensityRGB: function(animationName, frameId, red, green, blue) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }

    var frames = animation.Frames;
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      var redIntensity = red / 255.0;
      var greenIntensity = green / 255.0;
      var blueIntensity = blue / 255.0;
      //console.log(animation.Frames);
      if (frameId >= 0 && frameId < frames.length) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = colors[i];
          //console.log('color', color);
          var red = (color & 0xFF);
          var green = (color & 0xFF00) >> 8;
          var blue = (color & 0xFF0000) >> 16;
          red = Math.min(255, Math.max(0, Number(red) * Number(redIntensity))) & 0xFF;
          green = Math.min(255, Math.max(0, Number(green) * Number(greenIntensity))) & 0xFF;
          blue = Math.min(255, Math.max(0, Number(blue) * Number(blueIntensity))) & 0xFF;
          color = red | (green << 8) | (blue << 16);
          colors[i] = color;
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      var redIntensity = red / 255.0;
      var greenIntensity = green / 255.0;
      var blueIntensity = blue / 255.0;
      //console.log(animation.Frames);
      if (frameId >= 0 && frameId < frames.length) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = row[j];
            //console.log('color', color);
            var red = (color & 0xFF);
            var green = (color & 0xFF00) >> 8;
            var blue = (color & 0xFF0000) >> 16;
            red = Math.min(255, Math.max(0, Number(red) * Number(redIntensity))) & 0xFF;
            green = Math.min(255, Math.max(0, Number(green) * Number(greenIntensity))) & 0xFF;
            blue = Math.min(255, Math.max(0, Number(blue) * Number(blueIntensity))) & 0xFF;
            color = red | (green << 8) | (blue << 16);
            row[j] = color;
          }
        }
      }
    }
  },
  multiplyIntensityAllFrames: function(animationName, intensity) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = colors[i];
          //console.log('color', color);
          var red = (color & 0xFF);
          var green = (color & 0xFF00) >> 8;
          var blue = (color & 0xFF0000) >> 16;
          red = Math.min(255, Math.max(0, Number(red) * Number(intensity))) & 0xFF;
          green = Math.min(255, Math.max(0, Number(green) * Number(intensity))) & 0xFF;
          blue = Math.min(255, Math.max(0, Number(blue) * Number(intensity))) & 0xFF;
          color = red | (green << 8) | (blue << 16);
          colors[i] = color;
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = row[j];
            //console.log('color', color);
            var red = (color & 0xFF);
            var green = (color & 0xFF00) >> 8;
            var blue = (color & 0xFF0000) >> 16;
            red = Math.min(255, Math.max(0, Number(red) * Number(intensity))) & 0xFF;
            green = Math.min(255, Math.max(0, Number(green) * Number(intensity))) & 0xFF;
            blue = Math.min(255, Math.max(0, Number(blue) * Number(intensity))) & 0xFF;
            color = red | (green << 8) | (blue << 16);
            row[j] = color;
          }
        }
      }
    }
  },
  multiplyIntensityAllFramesRGB: function(animationName, red, green, blue) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    var redIntensity = red / 255.0;
    var greenIntensity = green / 255.0;
    var blueIntensity = blue / 255.0;
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = colors[i];
          //console.log('color', color);
          var red = (color & 0xFF);
          var green = (color & 0xFF00) >> 8;
          var blue = (color & 0xFF0000) >> 16;
          red = Math.min(255, Math.max(0, Number(red) * Number(redIntensity))) & 0xFF;
          green = Math.min(255, Math.max(0, Number(green) * Number(greenIntensity))) & 0xFF;
          blue = Math.min(255, Math.max(0, Number(blue) * Number(blueIntensity))) & 0xFF;
          color = red | (green << 8) | (blue << 16);
          colors[i] = color;
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = row[j];
            //console.log('color', color);
            var red = (color & 0xFF);
            var green = (color & 0xFF00) >> 8;
            var blue = (color & 0xFF0000) >> 16;
            red = Math.min(255, Math.max(0, Number(red) * Number(redIntensity))) & 0xFF;
            green = Math.min(255, Math.max(0, Number(green) * Number(greenIntensity))) & 0xFF;
            blue = Math.min(255, Math.max(0, Number(blue) * Number(blueIntensity))) & 0xFF;
            color = red | (green << 8) | (blue << 16);
            row[j] = color;
          }
        }
      }
    }
  },
  multiplyColorLerpAllFrames: function(animationName, color1, color2) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    var frameCount = frames.length;
    for (var frameId = 0; frameId < frameCount; ++frameId) {
      var t = (frameId+1) / frameCount;
      var color = this.lerpColor(color1, color2, t);
      this.multiplyIntensityColor(animationName, frameId, color);
    }
  },
  multiplyTargetColorLerpAllFrames: function(animationName, color1, color2) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = colors[i];
          //console.log('color', color);
          var red = (color & 0xFF) / 255.0;
          var green = ((color & 0xFF00) >> 8) / 255.0;
          var blue = ((color & 0xFF0000) >> 16) / 255.0;
          var t = (red+green+blue) / 3.0;
          colors[i] = ChromaAnimation.lerpColor(color1, color2, t);
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = row[j];
            //console.log('color', color);
            var red = (color & 0xFF) / 255.0;
            var green = ((color & 0xFF00) >> 8) / 255.0;
            var blue = ((color & 0xFF0000) >> 16) / 255.0;
            var t = (red+green+blue) / 3.0;
            row[j] = ChromaAnimation.lerpColor(color1, color2, t);
          }
        }
      }
    }
  },
  multiplyNonZeroTargetColorLerpAllFrames: function(animationName, color1, color2) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_1D) {
      var maxLeds = ChromaAnimation.getMaxLeds(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxLeds; ++i) {
          var color = colors[i];
          if (color != 0) {
            //console.log('color', color);
            var red = (color & 0xFF) / 255.0;
            var green = ((color & 0xFF00) >> 8) / 255.0;
            var blue = ((color & 0xFF0000) >> 16) / 255.0;
            var t = (red+green+blue) / 3.0;
            colors[i] = ChromaAnimation.lerpColor(color1, color2, t);
          }
        }
      }
    } else if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
      var maxRow = ChromaAnimation.getMaxRow(animation.Device);
      var maxColumn = ChromaAnimation.getMaxColumn(animation.Device);
      //console.log(animation.Frames);
      for (var frameId = 0; frameId < frames.length; ++frameId) {
        var frame = frames[frameId];
        //console.log(frame);
        var colors = frame.Colors;
        for (var i = 0; i < maxRow; ++i) {
          var row = colors[i];
          for (var j = 0; j < maxColumn; ++j) {
            var color = row[j];
            if (color != 0) {
              //console.log('color', color);
              var red = (color & 0xFF) / 255.0;
              var green = ((color & 0xFF00) >> 8) / 255.0;
              var blue = ((color & 0xFF0000) >> 16) / 255.0;
              var t = (red+green+blue) / 3.0;
              row[j] = ChromaAnimation.lerpColor(color1, color2, t);
            }
          }
        }
      }
    }
  },
  copyRedChannelAllFrames: function(animationName, greenIntensity, blueIntensity) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < frames.length; ++frameId) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = row[j];
          //console.log('color', color);
          var red = (color & 0xFF);
          var green = (color & 0xFF00) >> 8;
          var blue = (color & 0xFF0000) >> 16;
          green = Math.min(255, Math.max(0, Number(red) * Number(greenIntensity))) & 0xFF;
          blue = Math.min(255, Math.max(0, Number(red) * Number(blueIntensity))) & 0xFF;
          color = red | (green << 8) | (blue << 16);
          row[j] = color;
        }
      }
    }
  },
  copyGreenChannelAllFrames: function(animationName, redIntensity, blueIntensity) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < frames.length; ++frameId) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = row[j];
          //console.log('color', color);
          var red = (color & 0xFF);
          var green = (color & 0xFF00) >> 8;
          var blue = (color & 0xFF0000) >> 16;
          red = Math.min(255, Math.max(0, Number(green) * Number(redIntensity))) & 0xFF;
          blue = Math.min(255, Math.max(0, Number(green) * Number(blueIntensity))) & 0xFF;
          color = red | (green << 8) | (blue << 16);
          row[j] = color;
        }
      }
    }
  },
  copyBlueChannelAllFrames: function(animationName, redIntensity, greenIntensity) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < frames.length; ++frameId) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = row[j];
          //console.log('color', color);
          var red = (color & 0xFF);
          var green = (color & 0xFF00) >> 8;
          var blue = (color & 0xFF0000) >> 16;
          red = Math.min(255, Math.max(0, Number(blue) * Number(redIntensity))) & 0xFF;
          green = Math.min(255, Math.max(0, Number(blue) * Number(greenIntensity))) & 0xFF;
          color = red | (green << 8) | (blue << 16);
          row[j] = color;
        }
      }
    }
  },
  desaturateAllFrames: function(animationName) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < frames.length; ++frameId) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = row[j];
          //console.log('color', color);
          var red = (color & 0xFF);
          var green = (color & 0xFF00) >> 8;
          var blue = (color & 0xFF0000) >> 16;
          var gray = Math.sqrt(red*red + green*green + blue*blue);
          color = gray | (gray << 8) | (gray << 16);
          row[j] = color;
        }
      }
    }
  },
  multiplyIntensityKey: function(animationName, frameId, key, intensity) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    if (frameId >= 0 && frameId < frames.length) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          if (getHighByte(key) == i &&
            getLowByte(key) == j) {

            var color = row[j];
            //console.log('color', color);
            var red = (color & 0xFF);
            var green = (color & 0xFF00) >> 8;
            var blue = (color & 0xFF0000) >> 16;
            red = Math.min(255, Math.max(0, Number(red) * Number(intensity))) & 0xFF;
            green = Math.min(255, Math.max(0, Number(green) * Number(intensity))) & 0xFF;
            blue = Math.min(255, Math.max(0, Number(blue) * Number(intensity))) & 0xFF;
            color = red | (green << 8) | (blue << 16);
            row[j] = color;
          }
        }
      }
    }
  },
  multiplyIntensityKeyAllFrames: function(animationName, key, intensity) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < frames.length; ++frameId) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          if (getHighByte(key) == i &&
            getLowByte(key) == j) {

            var color = row[j];
            //console.log('color', color);
            var red = (color & 0xFF);
            var green = (color & 0xFF00) >> 8;
            var blue = (color & 0xFF0000) >> 16;
            red = Math.min(255, Math.max(0, Number(red) * Number(intensity))) & 0xFF;
            green = Math.min(255, Math.max(0, Number(green) * Number(intensity))) & 0xFF;
            blue = Math.min(255, Math.max(0, Number(blue) * Number(intensity))) & 0xFF;
            color = red | (green << 8) | (blue << 16);
            row[j] = color;
          }
        }
      }
    }
  },
  multiplyIntensityKeyAllFramesRGB: function(animationName, key, red, green, blue) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    var redIntensity = red / 255.0;
    var greenIntensity = green / 255.0;
    var blueIntensity = blue / 255.0;
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < frames.length; ++frameId) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          if (getHighByte(key) == i &&
            getLowByte(key) == j) {

            var color = row[j];
            //console.log('color', color);
            var red = (color & 0xFF);
            var green = (color & 0xFF00) >> 8;
            var blue = (color & 0xFF0000) >> 16;
            red = Math.min(255, Math.max(0, Number(red) * Number(redIntensity))) & 0xFF;
            green = Math.min(255, Math.max(0, Number(green) * Number(greenIntensity))) & 0xFF;
            blue = Math.min(255, Math.max(0, Number(blue) * Number(blueIntensity))) & 0xFF;
            color = red | (green << 8) | (blue << 16);
            row[j] = color;
          }
        }
      }
    }
  },
  setChromaCustomColorAllFrames: function(animationName) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    var frames = animation.Frames;
    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < frames.length; ++frameId) {
      var frame = frames[frameId];
      //console.log(frame);
      var colors = frame.Colors;
      for (var i = 0; i < maxRow; ++i) {
        var row = colors[i];
        for (var j = 0; j < maxColumn; ++j) {
          var color = row[j];
          //console.log('color', color);
          var customFlag = 0x01;
          var red = (color & 0xFF);
          var green = (color & 0xFF00) >> 8;
          var blue = (color & 0xFF0000) >> 16;
          color = red | (green << 8) | (blue << 16) | (customFlag << 24);
          row[j] = color;
        }
      }
    }
  },
  setChromaCustomFlag: function(animationName, flag) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    if (animation.DeviceType != EChromaSDKDeviceTypeEnum.DE_2D ||
      animation.Device != EChromaSDKDevice2DEnum.DE_Keyboard) {
      return;
    }
    animation.setChromaCustomFlag(flag);
  },
  playComposite: function(animationName, loop, frameCallback) {
    if (chromaSDK == undefined) {
      setTimeout(function() { ChromaAnimation.playComposite(animationName, loop); }, 100);
      return;
    }
    this.playAnimation(animationName + "_ChromaLink.chroma", loop, frameCallback);
    this.playAnimation(animationName + "_Headset.chroma", loop, frameCallback);
    this.playAnimation(animationName + "_Keyboard.chroma", loop, frameCallback);
    this.playAnimation(animationName + "_Keypad.chroma", loop, frameCallback);
    this.playAnimation(animationName + "_Mouse.chroma", loop, frameCallback);
    this.playAnimation(animationName + "_Mousepad.chroma", loop, frameCallback);
  },
  overrideFrameDuration: function(animationName, duration) {
    var animation = this.LoadedAnimations[animationName];
    if (animation == undefined) {
      return;
    }
    var frames = animation.Frames;
    //console.log(animation.Frames);
    for (var frameId = 0; frameId < frames.length; ++frameId) {
      var frame = frames[frameId];
      frame.Duration = duration;
    }
  },
  stopComposite: function(animationName) {
    if (chromaSDK == undefined) {
      setTimeout(function() { ChromaAnimation.stopComposite(animationName, loop); }, 100);
      return;
    }
    this.stopAnimation(animationName + "_ChromaLink.chroma");
    this.stopAnimation(animationName + "_Headset.chroma");
    this.stopAnimation(animationName + "_Keyboard.chroma");
    this.stopAnimation(animationName + "_Keypad.chroma");
    this.stopAnimation(animationName + "_Mouse.chroma");
    this.stopAnimation(animationName + "_Mousepad.chroma");
  },
  staticColor: function (device, color) {
    if (chromaSDK == undefined) {
      setTimeout(function() { ChromaAnimation.staticColor(device, color); }, 100);
      return;
    }
    this.stopByAnimationType(device);
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
  staticColorAll: function(color) {
    this.staticColor(EChromaSDKDeviceEnum.DE_ChromaLink, color);
    this.staticColor(EChromaSDKDeviceEnum.DE_Headset, color);
    this.staticColor(EChromaSDKDeviceEnum.DE_Keyboard, color);
    this.staticColor(EChromaSDKDeviceEnum.DE_Keypad, color);
    this.staticColor(EChromaSDKDeviceEnum.DE_Mouse, color);
    this.staticColor(EChromaSDKDeviceEnum.DE_Mousepad, color);
  },
  custom: function(device, colors) {
    if (chromaSDK == undefined) {
      setTimeout(function() {
        ChromaAnimation.custom(device, colors);
      }, 100);
      return;
    }
	this.stopByAnimationType(device);
    if (device == EChromaSDKDeviceEnum.DE_ChromaLink) {
      chromaSDK.createChromaLinkEffect("CHROMA_CUSTOM", colors);
    } else if (device == EChromaSDKDeviceEnum.DE_Headset) {
      chromaSDK.createHeadsetEffect("CHROMA_CUSTOM", colors);
    } else if (device == EChromaSDKDeviceEnum.DE_Keyboard) {
      chromaSDK.createKeyboardEffect("CHROMA_CUSTOM", colors);
    } else if (device == EChromaSDKDeviceEnum.DE_Keypad) {
      chromaSDK.createKeypadEffect("CHROMA_CUSTOM", colors);
    } else if (device == EChromaSDKDeviceEnum.DE_Mouse) {
      chromaSDK.createMouseEffect("CHROMA_CUSTOM2", colors);
    } else if (device == EChromaSDKDeviceEnum.DE_Mousepad) {
      chromaSDK.createMousematEffect("CHROMA_CUSTOM", colors);
    }
  },
  customKey: function(colors) {
    if (chromaSDK == undefined) {
      setTimeout(function() {
        ChromaAnimation.customKey(colors);
      }, 100);
      return;
    }
    this.stopByAnimationType(EChromaSDKDeviceEnum.DE_Keyboard);
    chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", colors);
  },
  clear: function (device) {
    if (chromaSDK == undefined) {
      setTimeout(function() { ChromaAnimation.clear(device); }, 100);
      return;
    }
	this.stopByAnimationType(device);
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
  },
  clearAll: function () {
    this.clear(EChromaSDKDeviceEnum.DE_ChromaLink);
    this.clear(EChromaSDKDeviceEnum.DE_Headset);
    this.clear(EChromaSDKDeviceEnum.DE_Keyboard);
    this.clear(EChromaSDKDeviceEnum.DE_Keypad);
    this.clear(EChromaSDKDeviceEnum.DE_Mouse);
    this.clear(EChromaSDKDeviceEnum.DE_Mousepad);
  },
  getKey: function (row, col) {
    return (row << 8) | col;
  },

  // Helper function to implement reactive key setEffect
  reactiveKeyEffectAllFrames: function (layer, key, lineWidth, color) {

    var frameCount = ChromaAnimation.getFrameCount(layer);

    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);

    var startRow = getHighByte(key);
    var startColumn = getLowByte(key);

    // console.log('Start Column =', startColumn);
    // console.log('Start Row =', startRow);

    var radius = 0;
    var speed = 25/ frameCount;

    for (var frameIndex = 0; frameIndex < frameCount; ++frameIndex) {
      var stroke = radius;
      for (var t = 0; t < lineWidth; ++t) {
        for (var i = 0; i < 360; ++i) {
          var angle = i * Math.PI / 180;
          var r = Math.floor(startRow + stroke * Math.sin(angle));
          var c = Math.floor(startColumn + stroke * Math.cos(angle));
          if (r >= 0 && r < maxRow &&
            c >= 0 && c < maxColumn) {
              var rkey = ChromaAnimation.getKey(r, c);
              ChromaAnimation.setKeyColor(layer, frameIndex, rkey, color);
          }
        }
        stroke += speed;
      }
      radius += speed;
    }
  },

  reactiveKeyEffectAllFramesRGB: function (layer, key, lineWidth, red, green, blue) {

    var frameCount = ChromaAnimation.getFrameCount(layer);

    var maxRow = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
    var maxColumn = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);

    var startRow = getHighByte(key);
    var startColumn = getLowByte(key);

    // console.log('Start Column =', startColumn);
    // console.log('Start Row =', startRow);

    var color = ChromaAnimation.getRGB(red, green, blue);
    var radius = 0;
    var speed = 25/ frameCount;

    for (var frameIndex = 0; frameIndex < frameCount; ++frameIndex) {
      var stroke = radius;
      for (var t = 0; t < lineWidth; ++t) {
        for (var i = 0; i < 360; ++i) {
          var angle = i * Math.PI / 180;
          var r = Math.floor(startRow + stroke * Math.sin(angle));
          var c = Math.floor(startColumn + stroke * Math.cos(angle));
          if (r >= 0 && r < maxRow &&
            c >= 0 && c < maxColumn) {
              var rkey = ChromaAnimation.getKey(r, c);
              ChromaAnimation.setKeyColor(layer, frameIndex, rkey, color);
          }
        }
        stroke += speed;
      }
      radius += speed;
    }
  }
};
ChromaAnimation.updateFrame();

function ChromaAnimation1D() {
  var Name;
  var Device;
  var Frames = [];
  var Loop = true;
  var FrameTime = 0;
  var FrameCallback = undefined;
}

ChromaAnimation1D.prototype = {

  DeviceType: EChromaSDKDeviceTypeEnum.DE_1D,

  CurrentIndex: 0,

  IsPlaying: false,

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

      if (duration < 0.033) {
        duration = 0.033;
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
  saveAnimation: function() {

    var device = this.Device;
    var maxLeds = ChromaAnimation.getMaxLeds(device);
    var frames = this.Frames;
    var frameCount = frames.length;

    var writeArrays = [];


    var writeArray = new Uint32Array(1);
    var version = 1;
    writeArray[0] = version;
    writeArrays.push(writeArray.buffer);
    //console.log('version:', version);


    var writeArray = new Uint8Array(1);
    var deviceType = this.DeviceType;
    writeArray[0] = deviceType;
    writeArrays.push(writeArray.buffer);
    //console.log('deviceType:', deviceType);


    var writeArray = new Uint8Array(1);
    writeArray[0] = device;
    writeArrays.push(writeArray.buffer);
    //console.log('device:', device);


    var writeArray = new Uint32Array(1);
    writeArray[0] = frameCount;
    writeArrays.push(writeArray.buffer);
    //console.log('frameCount:', frameCount);

    for (var index = 0; index < frameCount; ++index) {

      var frame = frames[index];

      var writeArray = new Float32Array(1);
      var duration = frame.Duration;
      if (duration < 0.033) {
        duration = 0.033;
      }
      writeArray[0] = duration;
      writeArrays.push(writeArray.buffer);

      //console.log('Frame', index, 'duration', duration);

      var writeArray = new Uint32Array(maxLeds);
      for (var i = 0; i < maxLeds; ++i) {
        var color = frame.Colors[i];
        writeArray[i] = color;
      }
      writeArrays.push(writeArray.buffer);
    }

    var blob = new Blob(writeArrays, {type: 'application/octet-stream'});

    return blob;
  },
  getFrameCount: function() {
    return this.Frames.length;
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
    if (this.FrameTime < Date.now()) {
      return;
    }
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

      if (this.FrameCallback != undefined) {
        this.FrameCallback(this, this.getFrame().Colors);
      }

      // schedule next frame
      var refThis = this;
      if (duration < 0.1) {
        duration = 0.1;
      }
      this.FrameTime = Date.now() + Math.floor(duration * 1000);
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
    this.IsPlaying = false;
    this.CurrentIndex = 0;
    this.Loop = false;
  	if (ChromaAnimation.LoadedAnimations1D[this.Device] == this) {
  	  ChromaAnimation.LoadedAnimations1D[this.Device] = undefined;
  	}
    ChromaAnimation.PlayingAnimations1D[this.Device][this.Name] = undefined;
  },
  isPlaying: function() {
    return this.IsPlaying;
  },
  play: function (loop) {
    this.stop();
    this.IsPlaying = true;
    ChromaAnimation.stopByAnimationType(ChromaAnimation.getDeviceEnum(this.DeviceType, this.Device));
    ChromaAnimation.LoadedAnimations1D[this.Device] = this;
    ChromaAnimation.PlayingAnimations1D[this.Device][this.Name] = this;
    this.CurrentIndex = 0;
    this.Loop = loop;
    //console.log('play:', this.Name);
    this.playFrame();
  }
};

function ChromaAnimation2D() {
  var Name;
  var Device;
  var Frames = [];
  var Loop = false;
  var FrameTime = 0;
  var FrameCallback = undefined;
}

ChromaAnimation2D.prototype = {

  DeviceType: EChromaSDKDeviceTypeEnum.DE_2D,

  CurrentIndex: 0,

  UseChromaCustom: false,

  IsPlaying: false,

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

      if (duration < 0.033) {
        duration = 0.033;
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
  saveAnimation: function() {

    var device = this.Device;
    var maxRow = ChromaAnimation.getMaxRow(device);
    var maxColumn = ChromaAnimation.getMaxColumn(device);
    var frames = this.Frames;
    var frameCount = frames.length;

    var writeArrays = [];


    var writeArray = new Uint32Array(1);
    var version = 1;
    writeArray[0] = version;
    writeArrays.push(writeArray.buffer);
    //console.log('version:', version);


    var writeArray = new Uint8Array(1);
    var deviceType = this.DeviceType;
    writeArray[0] = deviceType;
    writeArrays.push(writeArray.buffer);
    //console.log('deviceType:', deviceType);


    var writeArray = new Uint8Array(1);
    writeArray[0] = device;
    writeArrays.push(writeArray.buffer);
    //console.log('device:', device);


    var writeArray = new Uint32Array(1);
    writeArray[0] = frameCount;
    writeArrays.push(writeArray.buffer);
    //console.log('frameCount:', frameCount);

    for (var index = 0; index < frameCount; ++index) {

      var frame = frames[index];

      var writeArray = new Float32Array(1);
      var duration = frame.Duration;
      if (duration < 0.033) {
        duration = 0.033;
      }
      writeArray[0] = duration;
      writeArrays.push(writeArray.buffer);

      //console.log('Frame', index, 'duration', duration);

      var writeArray = new Uint32Array(maxRow * maxColumn);
      for (var i = 0; i < maxRow; ++i) {
        for (var j = 0; j < maxColumn; ++j) {
          var color = frame.Colors[i][j];
          writeArray[i * maxColumn + j] = color;
        }
      }
      writeArrays.push(writeArray.buffer);
    }

    var blob = new Blob(writeArrays, {type: 'application/octet-stream'});

    return blob;
  },
  getFrameCount: function() {
    return this.Frames.length;
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
  setChromaCustomFlag: function(flag) {
    if (this.Device == EChromaSDKDevice2DEnum.DE_Keyboard) {
      if (flag == true) {
        this.UseChromaCustom = flag;
      } else {
        this.UseChromaCustom = false;
      }
    }
  },
  playFrame: function() {
    if (this.FrameTime < Date.now()) {
      return;
    }
    if (this.CurrentIndex < this.Frames.length) {
      var duration = this.getDuration();
      //console.log('Play Frame: '+this.CurrentIndex+' of: '+this.Frames.length+' Duration: '+duration);

      if (this.Device == EChromaSDKDevice2DEnum.DE_Keyboard) {
        if (this.UseChromaCustom) {
          chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", this.getFrame().Colors);
        } else {
          chromaSDK.createKeyboardEffect("CHROMA_CUSTOM", this.getFrame().Colors);
        }
      } else if (this.Device == EChromaSDKDevice2DEnum.DE_Keypad) {
        chromaSDK.createKeypadEffect("CHROMA_CUSTOM", this.getFrame().Colors);
      } else if (this.Device == EChromaSDKDevice2DEnum.DE_Mouse) {
        chromaSDK.createMouseEffect("CHROMA_CUSTOM2", this.getFrame().Colors);
      }

      if (this.FrameCallback != undefined) {
        this.FrameCallback(this, this.getFrame().Colors);
      }

      // schedule next frame
      var refThis = this;
      if (duration < 0.1) {
        duration = 0.1;
      }
      this.FrameTime = Date.now() + Math.floor(duration * 1000);
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
    this.IsPlaying = false;
    this.CurrentIndex = 0;
    this.Loop = false;
  	if (ChromaAnimation.LoadedAnimations2D[this.Device] == this) {
  	  ChromaAnimation.LoadedAnimations2D[this.Device] = undefined;
  	}
    ChromaAnimation.PlayingAnimations2D[this.Device][this.Name] = undefined;
  },
  isPlaying: function() {
    return this.IsPlaying;
  },
  play: function (loop) {
    this.stop();
    this.IsPlaying = true;
    ChromaAnimation.stopByAnimationType(ChromaAnimation.getDeviceEnum(this.DeviceType, this.Device));
    ChromaAnimation.LoadedAnimations2D[this.Device] = this;
    ChromaAnimation.PlayingAnimations2D[this.Device][this.Name] = this;
    this.CurrentIndex = 0;
    this.Loop = loop;
    //console.log('play:', this.Name);
    this.playFrame();
  }
};
