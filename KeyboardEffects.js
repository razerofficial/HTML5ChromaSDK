// JavaScript source code

function KeyboardEffects() {
    this.loadingFrames = false;
    this.loadingFrame1;
    this.loadingFrame2;
    this.loadingFrame3;
    this.loadingFrame4;
    this.loadingFrame5;
    this.loadingFrame6;
    this.loadingFrame7;
    this.loadingFrame8;

    this.alertFrames = false;
    this.positiveAlert;
    this.negativeAlert;
    this.noAlert;

    this.damageFrames = false;
    this.damageOn;
    this.damageOff;
}

var timerId = 0;
var blink = 0;
function onKeyboadTimer(keyCode) {
    var color = new Array(6);
    for (r = 0; r < 6; r++) {
        color[r] = new Array(22);
        for (c = 0; c < 22; c++) {
            color[r][c] = 0;
        }
    }

    var key = new Array(6);
    for (r = 0; r < 6; r++) {
        key[r] = new Array(22);
        for (c = 0; c < 22; c++) {
            key[r][c] = 0;
        }
    }

    if (blink == 0) {
        if (keyCode == '87') {
            key[2][3] = 0;
            key[3][2] = 0;
            key[3][3] = 0;
            key[3][4] = 0;
        } else if (keyCode == '65') {
            key[2][3] = 0x01000000 | 0xffffff;
            key[3][2] = 0;
            key[3][3] = 0;
            key[3][4] = 0;
        } else if (keyCode == '83') {
            key[2][3] = 0x01000000 | 0xffffff;
            key[3][2] = 0x01000000 | 0xffffff;
            key[3][3] = 0;
            key[3][4] = 0;
        } else if (keyCode == '68') {
            key[2][3] = 0x01000000 | 0xffffff;
            key[3][2] = 0x01000000 | 0xffffff;
            key[3][3] = 0x01000000 | 0xffffff;
            key[3][4] = 0;
        }
        blink = 1;
    } else if (blink == 1) {
        if (keyCode == '87') {
            key[2][3] = 0x01000000 | 0xffffff;
        } else if (keyCode == '65') {
            key[2][3] = 0x01000000 | 0xffffff;
            key[3][2] = 0x01000000 | 0xffffff;
        } else if (keyCode == '83') {
            key[2][3] = 0x01000000 | 0xffffff;
            key[3][2] = 0x01000000 | 0xffffff;
            key[3][3] = 0x01000000 | 0xffffff;
        } else if (keyCode == '68') {
            key[2][3] = 0x01000000 | 0xffffff;
            key[3][2] = 0x01000000 | 0xffffff;
            key[3][3] = 0x01000000 | 0xffffff;
            key[3][4] = 0x01000000 | 0xffffff;
        }
        blink = 0;
    }

    var data = { 'color': color, 'key': key };

    chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", data);
}

KeyboardEffects.prototype = {
    createLoadingAnimation: function () {
        if (this.loadingFrames == false) {
            this.loadingFrame1 = chromaSDK.preCreateKeyboardEffect("CHROMA_NONE");

            var data = new Array(6);
            for (r = 0; r < 6; r++) {
                data[r] = new Array(22);

                for (c = 0; c < 22; c++) {
                    if (c < 3) {
                        data[r][c] = 0x00a5ff;    // orange
                    } else {
                        data[r][c] = 0;    // black
                    }
                }
            }

            this.loadingFrame2 = chromaSDK.preCreateKeyboardEffect("CHROMA_CUSTOM", data);

            for (r = 0; r < 6; r++) {
                data[r] = new Array(22);

                for (c = 0; c < 22; c++) {
                    if (c < 6) {
                        data[r][c] = 0x00a5ff;    // orange
                    } else {
                        data[r][c] = 0;    // black
                    }
                }
            }

            this.loadingFrame3 = chromaSDK.preCreateKeyboardEffect("CHROMA_CUSTOM", data);

            for (r = 0; r < 6; r++) {
                data[r] = new Array(22);

                for (c = 0; c < 22; c++) {
                    if (c < 9) {
                        data[r][c] = 0x00a5ff;    // orange
                    } else {
                        data[r][c] = 0;    // black
                    }
                }
            }

            this.loadingFrame4 = chromaSDK.preCreateKeyboardEffect("CHROMA_CUSTOM", data);

            for (r = 0; r < 6; r++) {
                data[r] = new Array(22);

                for (c = 0; c < 22; c++) {
                    if (c < 12) {
                        data[r][c] = 0x00a5ff;    // orange
                    } else {
                        data[r][c] = 0;    // black
                    }
                }
            }

            this.loadingFrame5 = chromaSDK.preCreateKeyboardEffect("CHROMA_CUSTOM", data);

            for (r = 0; r < 6; r++) {
                data[r] = new Array(22);

                for (c = 0; c < 22; c++) {
                    if (c < 15) {
                        data[r][c] = 0x00a5ff;    // orange
                    } else {
                        data[r][c] = 0;    // black
                    }
                }
            }

            this.loadingFrame6 = chromaSDK.preCreateKeyboardEffect("CHROMA_CUSTOM", data);

            for (r = 0; r < 6; r++) {
                data[r] = new Array(22);

                for (c = 0; c < 22; c++) {
                    if (c < 18) {
                        data[r][c] = 0x00a5ff;    // orange
                    } else {
                        data[r][c] = 0;    // black
                    }
                }
            }

            this.loadingFrame7 = chromaSDK.preCreateKeyboardEffect("CHROMA_CUSTOM", data);

            var color = 0x00a5ff;

            this.loadingFrame8 = chromaSDK.preCreateKeyboardEffect("CHROMA_STATIC", color);

            this.loadingFrames = true;
        }

        chromaSDK.setEffect(this.loadingFrame1);

        sleep(500);

        chromaSDK.setEffect(this.loadingFrame2);

        sleep(100);

        chromaSDK.setEffect(this.loadingFrame3);

        sleep(100);

        chromaSDK.setEffect(this.loadingFrame4);

        sleep(100);

        chromaSDK.setEffect(this.loadingFrame5);

        sleep(100);

        chromaSDK.setEffect(this.loadingFrame6);

        sleep(100);

        chromaSDK.setEffect(this.loadingFrame7);

        sleep(100);

        chromaSDK.setEffect(this.loadingFrame8);
    },
    createTutorial: function (keyCode) {
        var color = new Array(6);
        for (r = 0; r < 6; r++) {
            color[r] = new Array(22);
            for (c = 0; c < 22; c++) {
                color[r][c] = 0;
            }
        }

        var key = new Array(6);
        for (r = 0; r < 6; r++) {
            key[r] = new Array(22);
            for (c = 0; c < 22; c++) {
                key[r][c] = 0;
            }
        }

        if (keyCode != '0') {
            if (keyCode == '87') {
                key[2][3] = 0x01000000 | 0xffffff;
            } else if (keyCode == '65') {
                key[2][3] = 0x01000000 | 0xffffff;
                key[3][2] = 0x01000000 | 0xffffff;
            } else if (keyCode == '83') {
                key[2][3] = 0x01000000 | 0xffffff;
                key[3][2] = 0x01000000 | 0xffffff;
                key[3][3] = 0x01000000 | 0xffffff;
            } else if (keyCode == '68') {
                key[2][3] = 0x01000000 | 0xffffff;
                key[3][2] = 0x01000000 | 0xffffff;
                key[3][3] = 0x01000000 | 0xffffff;
                key[3][4] = 0x01000000 | 0xffffff;
            }

            clearInterval(timerId);
            timerId = setInterval(onKeyboadTimer, 500, keyCode);
        } else {
            clearInterval(timerId);
            timerId = 0;

            for (r = 0; r < 6; r++) {
                for (c = 0; c < 22; c++) {
                    color[r][c] = 0;
                }
            }

            for (r = 0; r < 6; r++) {
                for (c = 0; c < 22; c++) {
                    key[r][c] = 0;
                }
            }

            key[2][3] = 0x01000000 | 0xffffff;
            key[3][2] = 0x01000000 | 0xffffff;
            key[3][3] = 0x01000000 | 0xffffff;
            key[3][4] = 0x01000000 | 0xffffff;
        }

        var data = { 'color': color, 'key': key };

        chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", data);
    },
    createActiveKeys: function () {
        var key = new Array(6);
        for (r = 0; r < 6; r++) {
            key[r] = new Array(22);
            for (c = 0; c < 22; c++) {
                if ((r == 0) && (c == 1)) { // Esc
                    key[r][c] = 0x01000000 | 0xff00;
                } else if ((r == 2) && (c == 3)) {  // W
                    key[r][c] = 0x01000000 | 0xff00;
                } else if ((r == 3) && (c == 2)) {  // A
                    key[r][c] = 0x01000000 | 0xff00;
                } else if ((r == 3) && (c == 3)) {  // S
                    key[r][c] = 0x01000000 | 0xff00;
                } else if ((r == 3) && (c == 4)) {  // D
                    key[r][c] = 0x01000000 | 0xff00;
                } else if ((r == 4) && (c == 1)) {  // Left Shift
                    key[r][c] = 0x01000000 | 0xff00;
                } else if ((r == 5) && (c == 1)) {
                    key[r][c] = 0x01000000 | 0xff00;    // Left Ctrl
                } else if ((r == 4) && (c == 16)) { // Up arrow
                    key[r][c] = 0x01000000 | 0xff00;
                } else if ((r == 5) && (c == 15)) { // Left Arrow
                    key[r][c] = 0x01000000 | 0xff00;
                } else if ((r == 5) && (c == 16)) {
                    key[r][c] = 0x01000000 | 0xff00;    // Down arrow
                } else if ((r == 5) && (c == 17)) {
                    key[r][c] = 0x01000000 | 0xff00;    // Right arrow
                } else {
                    key[r][c] = 0;
                }
            }
        }

        var color = new Array(6);
        for (r = 0; r < 6; r++) {
            color[r] = new Array(22);
            for (c = 0; c < 22; c++) {
                if (r == 0) {
                    color[r][c] = 0xa5ff;
                } else {
                    color[r][c] = 0;
                }
            }
        }

        color[0][20] = 0;

        var frame = { "color": color, "key": key };

        chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", frame);

        sleep(50);

        for (c = 0; c < 22; c++) {
            if (c != 20) {
                color[0][c] = ((0xa5 * 0.3) << 8) | (0xff * 0.3);
                color[1][c] = 0xa5ff;
            }
        }

        chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", frame);

        sleep(50);

        for (c = 0; c < 22; c++) {
            if (c != 20) {
                color[0][c] = ((0xa5 * 0.1) << 8) | (0xff * 0.1);
                color[1][c] = ((0xa5 * 0.3) << 8) | (0xff * 0.3);
                color[2][c] = 0xa5ff;
            }
        }

        chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", frame);

        sleep(50);

        for (c = 0; c < 22; c++) {
            if (c != 20) {
                color[0][c] = 0;
                color[1][c] = ((0xa5 * 0.1) << 8) | (0xff * 0.1);
                color[2][c] = ((0xa5 * 0.3) << 8) | (0xff * 0.3);
                color[3][c] = 0xa5ff;
            }
        }

        chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", frame);

        sleep(50);

        for (c = 0; c < 22; c++) {
            if (c != 20) {
                color[0][c] = 0;
                color[1][c] = 0;
                color[2][c] = ((0xa5 * 0.1) << 8) | (0xff * 0.1);
                color[3][c] = ((0xa5 * 0.3) << 8) | (0xff * 0.3);
                color[4][c] = 0xa5ff;
            }
        }

        chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", frame);

        sleep(50);

        for (c = 0; c < 22; c++) {
            if (c != 20) {
                color[0][c] = 0;
                color[1][c] = 0;
                color[2][c] = 0;
                color[3][c] = ((0xa5 * 0.1) << 8) | (0xff * 0.1);
                color[4][c] = ((0xa5 * 0.3) << 8) | (0xff * 0.3);
                color[5][c] = 0xa5ff;
            }
        }

        chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", frame);

        sleep(50);

        for (c = 0; c < 22; c++) {
            if (c != 20) {
                color[0][c] = 0;
                color[1][c] = 0;
                color[2][c] = 0;
                color[3][c] = 0;
                color[4][c] = ((0xa5 * 0.1) << 8) | (0xff * 0.1);
                color[5][c] = ((0xa5 * 0.3) << 8) | (0xff * 0.3);
            }
        }

        color[0][20] = 0xa5ff;

        chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", frame);

        sleep(50);

        for (c = 0; c < 22; c++) {
            if (c != 20) {
                color[0][c] = 0;
                color[1][c] = 0;
                color[2][c] = 0;
                color[3][c] = 0;
                color[4][c] = 0;
                color[5][c] = ((0xa5 * 0.1) << 8) | (0xff * 0.1);
            }
        }

        color[0][20] = ((0xa5 * 0.3) << 8) | (0xff * 0.3);

        chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", frame);

        sleep(50);

        for (c = 0; c < 22; c++) {
            if (c != 20) {
                color[0][c] = 0;
                color[1][c] = 0;
                color[2][c] = 0;
                color[3][c] = 0;
                color[4][c] = 0;
                color[5][c] = 0;
            }
        }

        color[0][20] = ((0xa5 * 0.1) << 8) | (0xff * 0.1);

        chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", frame);

        sleep(50);

        color[0][20] = 0;

        chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", frame);
    },
    createHealthAmmoMana: function (type, value) {
        var key = new Array(6);
        for (r = 0; r < 6; r++) {
            key[r] = new Array(22);
            for (c = 0; c < 22; c++) {
                key[r][c] = 0;
            }
        }

        if (type == 1) {
            for (c = 3; c < (3 + (12 * (value / 100.0))) ; c++) {
                var green = (value / 100.0) * 0xff;
                var red = 0xff - ((value / 100.0) * 0xff);
                var color = (green) << 8 | red;

                key[0][c] = 0x01000000 | color;
            }
        } else if (type == 2) {
            for (c = 2; c < (2 + (10 * (value / 100.0))) ; c++) {
                key[1][c] = 0x01000000 | 0xffff;
            }
        }

        var color = new Array(6);
        for (r = 0; r < 6; r++) {
            color[r] = new Array(22);
            for (c = 0; c < 22; c++) {
                color[r][c] = 0;
            }
        }

        var data = { "color": color, "key": key };

        chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", data);
    },
    createAlerts: function (type) {

        if (this.alertFrames == false) {
            this.positiveAlert = chromaSDK.preCreateKeyboardEffect("CHROMA_STATIC", 0xff00);
            this.negativeAlert = chromaSDK.preCreateKeyboardEffect("CHROMA_STATIC", 0xff);
            this.noAlert = chromaSDK.preCreateKeyboardEffect("CHROMA_NONE");
            this.alertFrames = true;
        }

        if (type == 1) {
            chromaSDK.setEffect(this.noAlert);

            sleep(200);

            chromaSDK.setEffect(this.positiveAlert);

            sleep(200);

            chromaSDK.setEffect(this.noAlert);

            sleep(200);

            chromaSDK.setEffect(this.positiveAlert);

            sleep(200);

            chromaSDK.setEffect(this.noAlert);

            sleep(200);

            chromaSDK.setEffect(this.positiveAlert);

            sleep(200);

            chromaSDK.setEffect(this.noAlert);


        } else if (type == 0) {

            chromaSDK.setEffect(this.noAlert);

            sleep(200);

            chromaSDK.setEffect(this.negativeAlert);

            sleep(200);

            chromaSDK.setEffect(this.noAlert);

            sleep(200);

            chromaSDK.setEffect(this.negativeAlert);

            sleep(200);

            chromaSDK.setEffect(this.noAlert);

            sleep(200);

            chromaSDK.setEffect(this.negativeAlert);

            sleep(200);

            chromaSDK.setEffect(this.noAlert);
        }
    },
    createCooldownTimer: function (value) {
        var steps = Math.ceil(18 * (value / 100.0));

        var rowIndex = [2, 2, 3, 4, 4, 4, 3, 2, 3, 2, 2, 3, 4, 4, 4, 3, 2, 3];
        var colIndex = [19, 20, 20, 20, 19, 18, 18, 18, 19, 19, 20, 20, 20, 19, 18, 18, 18, 19];
        var colors = [0x017d7d7d, 0x017d7d7d, 0x017d7d7d, 0x017d7d7d, 0x017d7d7d, 0x017d7d7d, 0x017d7d7d, 0x017d7d7d, 0x017d7d7d, 0x0100ffff, 0x0100ffff, 0x0100ffff, 0x0100ffff, 0x0100ffff, 0x0100ffff, 0x0100ffff, 0x0100ffff, 0x0100ffff]

        var key = new Array(6);
        for (r = 0; r < 6; r++) {
            key[r] = new Array(22);
            for (c = 0; c < 22; c++) {
                key[r][c] = 0;
            }
        }

        for (i = 0; i < steps; i++) {
            key[rowIndex[i]][colIndex[i]] = colors[i];
        }

        var color = new Array(6);
        for (r = 0; r < 6; r++) {
            color[r] = new Array(22);
            for (c = 0; c < 22; c++) {
                color[r][c] = 0;
            }
        }

        var data = { "color": color, "key": key };

        chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", data);
    },
    createDamagaTaken: function () {

        if (this.damageFrames == false) {
            this.damageOn = chromaSDK.preCreateKeyboardEffect("CHROMA_STATIC", 0xff);

            this.damageOff = chromaSDK.preCreateKeyboardEffect("CHROMA_NONE");
            this.damageFrames = true;
        }

        chromaSDK.setEffect(this.damageOn);

        sleep(50);

        chromaSDK.setEffect(this.damageOff);
    },
    free: function () {
        if (this.loadingFrames == true) {

            var effectIds = JSON.stringify({
                "id": [
                    this.loadingFrame1,
                    this.loadingFrame2,
                    this.loadingFrame3,
                    this.loadingFrame4,
                    this.loadingFrame5,
                    this.loadingFrame6,
                    this.loadingFrame7,
                    this.loadingFrame8
                ]
            });
            chromaSDK.deleteEffectGroup(effectIds);

            //chromaSDK.deleteEffect(this.loadingFrame1);
            //chromaSDK.deleteEffect(this.loadingFrame2);
            //chromaSDK.deleteEffect(this.loadingFrame3);
            //chromaSDK.deleteEffect(this.loadingFrame4);
            //chromaSDK.deleteEffect(this.loadingFrame5);
            //chromaSDK.deleteEffect(this.loadingFrame6);
            //chromaSDK.deleteEffect(this.loadingFrame7);
            //chromaSDK.deleteEffect(this.loadingFrame8);
            this.loadingFrames = false;
        }

        if (this.alertFrames == true) {
            chromaSDK.deleteEffect(this.positiveAlert);
            chromaSDK.deleteEffect(this.negativeAlert);
            chromaSDK.deleteEffect(this.noAlert);
            this.alertFrames = false;
        }

        if (this.damageFrames == true) {
            chromaSDK.deleteEffect(this.damageOn);
            chromaSDK.deleteEffect(this.damageOff);
            this.damageFrames = false;
        }
    }
}
