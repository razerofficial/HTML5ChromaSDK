// JavaScript source code

function ChromaSDK() {
    var uri = undefined;
    var timerId = undefined;
}

function onTimer() {
    if (this.uri == undefined) {
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
            setTimeout(function() {
              chromaSDK.uninit();
            }, 0);
            setTimeout(function() {
              chromaSDK.init();
            }, 100);
        }
    }

    request.send(null);
}

ChromaSDK.prototype = {
	uri: undefined,
    init: function () {
		setTimeout(function() {

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
        this.uri = undefined;
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

var RZLED = {
	RZLED_LOGO: 0x0014                 /*!< Razer logo */
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
    var refThis = this;
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
          refThis.LoadedAnimations[animationName] = animation;
          callback(animation);
        } else if (deviceType == EChromaSDKDeviceTypeEnum.DE_2D) {
          var animation = new ChromaAnimation2D();
          animation.openAnimation(arrayBuffer, readIndex);
          animation.Name = animationName;
          refThis.LoadedAnimations[animationName] = animation;
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
  playAnimation: function(animationName, loop, frameCallback, useCustomKey) {
    if (chromaSDK == undefined) {
      setTimeout(function() { ChromaAnimation.playAnimation(animationName, loop, frameCallback, useCustomKey); }, 100);
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
          if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D &&
            animation.Device == EChromaSDKDevice2DEnum.DE_Keyboard) {
            if (useCustomKey == true) {
              animation.UseCustomKey = true;
            } else {
              animation.UseCustomKey = false;
            }
          }
          animation.play(loop);
        });
    } else {
      var animation = this.LoadedAnimations[animationName];
      //console.log('playAnimation:', animationName);
      animation.FrameCallback = frameCallback;
      if (animation.DeviceType == EChromaSDKDeviceTypeEnum.DE_2D &&
        animation.Device == EChromaSDKDevice2DEnum.DE_Keyboard) {
        if (useCustomKey == true) {
          animation.UseCustomKey = true;
        } else {
          animation.UseCustomKey = false;
        }
      }
      animation.play(loop);
    }
  },
  stopAnimation: function(animationName) {
    if (this.LoadedAnimations[animationName] != undefined) {
      this.LoadedAnimations[animationName].stop();
    }
  },
  closeAnimation: function(animationName) {
    if (this.LoadedAnimations[animationName] != undefined) {
      this.LoadedAnimations[animationName].stop();
      this.LoadedAnimations[animationName] = undefined;
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
  copyNonZeroAllKeysAllFrames: function(sourceAnimationName, targetAnimationName) {
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
          if (color != 0) {
            targetRow[j] = color;
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
            red = Math.min(255, Math.max(0, red + redOffset)) & 0xFF;
            green = Math.min(255, Math.max(0, green + greenOffset)) & 0xFF;
            blue = Math.min(255, Math.max(0, blue + blueOffset)) & 0xFF;
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
          red = Math.floor(red * intensity) & 0xFF;
          green = Math.floor(green * intensity) & 0xFF;
          blue = Math.floor(blue * intensity) & 0xFF;
          color = red | (green << 8) | (blue << 16);
          row[j] = color;
        }
      }
    }
  },
  playComposite: function(animationName, loop) {
    if (chromaSDK == undefined) {
      setTimeout(function() { ChromaAnimation.playComposite(animationName, loop); }, 100);
      return;
    }
    this.playAnimation(animationName + "_ChromaLink.chroma", loop);
    this.playAnimation(animationName + "_Headset.chroma", loop);
    this.playAnimation(animationName + "_Keyboard.chroma", loop);
    this.playAnimation(animationName + "_Keypad.chroma", loop);
    this.playAnimation(animationName + "_Mouse.chroma", loop);
    this.playAnimation(animationName + "_Mousepad.chroma", loop);
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
  }
};

function ChromaAnimation1D() {
  var Device;
  var Frames = [];
  var CurrentIndex = 0;
  var Loop = true;
  var PlayTimeout = undefined;
  var FrameCallback = undefined;
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

	  if (this.FrameCallback != undefined) {
        this.FrameCallback(this, this.getFrame().Colors);
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
	if (ChromaAnimation.LoadedAnimations1D[this.Device] == this) {
	  ChromaAnimation.LoadedAnimations1D[this.Device] = undefined;
	}
  },
  play: function (loop) {
    this.stop();
	ChromaAnimation.stopByAnimationType(ChromaAnimation.getDeviceEnum(this.DeviceType, this.Device));
	ChromaAnimation.LoadedAnimations1D[this.Device] = this;
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
  var FrameCallback = undefined;
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
        if (this.UseCustomKey == true) {
          chromaSDK.createKeyboardEffect(
            "CHROMA_CUSTOM_KEY",
            this.getFrame().Colors
          );
        } else {
          chromaSDK.createKeyboardEffect(
            "CHROMA_CUSTOM",
            this.getFrame().Colors
          );
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
	if (ChromaAnimation.LoadedAnimations2D[this.Device] == this) {
	  ChromaAnimation.LoadedAnimations2D[this.Device] = undefined;
	}
  },
  play: function (loop) {
    this.stop();
	ChromaAnimation.stopByAnimationType(ChromaAnimation.getDeviceEnum(this.DeviceType, this.Device));
	ChromaAnimation.LoadedAnimations2D[this.Device] = this;
    this.CurrentIndex = 0;
	this.Loop = loop;
	//console.log('play:', this.Name);
    this.playFrame();
  }
};
