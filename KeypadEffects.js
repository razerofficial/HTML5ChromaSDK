// JavaScript source code
function KeypadEffects () {
    this.loadingFrames = false;
    this.loadingFrame1;
    this.loadingFrame2;
    this.loadingFrame3;
    this.loadingFrame4;
    this.loadingFrame5;
    this.loadingFrame6;

    this.alertFrames = false;
    this.positiveAlert;
    this.negativeAlert;
    this.noAlert;

    this.damageFrames = false;
    this.damageOn;
    this.damageOff;
}

var timerId;
var blink = 0;
function onKeypadTimer(keyCode) {
    var color = new Array(4);
    for (r = 0; r < 4; r++) {
        color[r] = new Array(5);
        for (c = 0; c < 5; c++) {
            color[r][c] = 0;
        }
    }

    if (blink == 0) {
        if (keyCode == '87') {
            color[1][2] = 0;
            color[2][1] = 0;
            color[2][2] = 0;
            color[2][3] = 0;
        } else if (keyCode == '65') {
            color[1][2] = 0xffffff;
            color[2][1] = 0;
            color[2][2] = 0;
            color[2][3] = 0;
        } else if (keyCode == '83') {
            color[1][2] = 0xffffff;
            color[2][1] = 0xffffff;
            color[2][2] = 0;
            color[2][3] = 0;
        } else if (keyCode == '68') {
            color[1][2] = 0xffffff;
            color[2][1] = 0xffffff;
            color[2][2] = 0xffffff;
            color[2][3] = 0;
        }
        blink = 1;
    } else if (blink == 1) {
        if (keyCode == '87') {
            color[1][2] = 0x01000000 | 0xffffff;
        } else if (keyCode == '65') {
            color[1][2] = 0x01000000 | 0xffffff;
            color[2][1] = 0x01000000 | 0xffffff;
        } else if (keyCode == '83') {
            color[1][2] = 0x01000000 | 0xffffff;
            color[2][1] = 0x01000000 | 0xffffff;
            color[2][2] = 0x01000000 | 0xffffff;
        } else if (keyCode == '68') {
            color[1][2] = 0x01000000 | 0xffffff;
            color[2][1] = 0x01000000 | 0xffffff;
            color[2][2] = 0x01000000 | 0xffffff;
            color[2][3] = 0x01000000 | 0xffffff;
        }
        blink = 0;
    }

    chromaSDK.createKeypadEffect("CHROMA_CUSTOM", color);
}

KeypadEffects.prototype = {
    createLoadingAnimation: function () {
        var data = new Array(4);
        for (r = 0; r < 4; r++) {
            data[r] = new Array(5);

            for (c = 0; c < 5; c++) {
                data[r][c] = 0;
            }
        }

        chromaSDK.createKeypadEffect("CHROMA_NONE");

        sleep(500);

        for (c = 0; c < 5; c++) {

            for (r = 0; r < 4; r++) {
                data[r][c] = 0xa5ff;
            }

            sleep(100);

            chromaSDK.createKeypadEffect("CHROMA_CUSTOM", data);
        }
    },
    createTutorial: function (keyCode) {
        var color = new Array(4);
        for (r = 0; r < 4; r++) {
            color[r] = new Array(5);
            for (c = 0; c < 5; c++) {
                color[r][c] = 0;
            }
        }

        if (keyCode != '0') {

            if (keyCode == '87') {
                color[1][2] = 0xffffff;
            } else if (keyCode == '65') {
                color[1][2] = 0xffffff;
                color[2][1] = 0xffffff;
            } else if (keyCode == '83') {
                color[1][2] = 0xffffff;
                color[2][1] = 0xffffff;
                color[2][2] = 0xffffff;
            } else if (keyCode == '68') {
                color[1][2] = 0xffffff;
                color[2][1] = 0xffffff;
                color[2][2] = 0xffffff;
                color[2][3] = 0xffffff;
            }

            clearInterval(timerId);
            timerId = setInterval(onKeypadTimer, 500, keyCode);
        } else {
            clearInterval(timerId);
            timerId = 0;

            var color = new Array(4);
            for (r = 0; r < 4; r++) {
                color[r] = new Array(5);
                for (c = 0; c < 5; c++) {
                    color[r][c] = 0;
                }
            }

            color[1][2] = 0xffffff;
            color[2][1] = 0xffffff;
            color[2][2] = 0xffffff;
            color[2][3] = 0xffffff;
        }

        chromaSDK.createKeypadEffect("CHROMA_CUSTOM", color);
    },
    createActiveKeys: function() {
        var color = new Array(4);
        for (r = 0; r < 4; r++) {
            color[r] = new Array(5);
            for (c = 0; c < 5; c++) {
                color[r][c] = 0;
            }
        }

        color[1][2] = 0xff00;
        color[2][1] = 0xff00;
        color[2][2] = 0xff00;
        color[2][3] = 0xff00;

        chromaSDK.createKeypadEffect("CHROMA_CUSTOM", color);

        sleep(50);

        for (c = 0; c < 5; c++) {
            color[0][c] = 0xa5ff;
        }

        color[1][2] = 0xff00;
        color[2][1] = 0xff00;
        color[2][2] = 0xff00;
        color[2][3] = 0xff00;

        chromaSDK.createKeypadEffect("CHROMA_CUSTOM", color);

        sleep(50);

        for (c = 0; c < 5; c++) {
            color[0][c] = ((0xa5 * 0.3) << 8) | (0xff * 0.3);
            color[1][c] = 0xa5ff;
        }

        color[1][2] = 0xff00;
        color[2][1] = 0xff00;
        color[2][2] = 0xff00;
        color[2][3] = 0xff00;

        chromaSDK.createKeypadEffect("CHROMA_CUSTOM", color);

        sleep(50);

        for (c = 0; c < 5; c++) {
            color[0][c] = ((0xa5 * 0.1) << 8) | (0xff * 0.1);
            color[1][c] = ((0xa5 * 0.3) << 8) | (0xff * 0.3);
            color[2][c] = 0xa5ff;
        }

        color[1][2] = 0xff00;
        color[2][1] = 0xff00;
        color[2][2] = 0xff00;
        color[2][3] = 0xff00;

        chromaSDK.createKeypadEffect("CHROMA_CUSTOM", color);

        sleep(50);

        for (c = 0; c < 5; c++) {
            color[0][c] = 0;
            color[1][c] = ((0xa5 * 0.1) << 8) | (0xff * 0.1);
            color[2][c] = ((0xa5 * 0.3) << 8) | (0xff * 0.3);
            color[3][c] = 0xa5ff;
        }

        color[1][2] = 0xff00;
        color[2][1] = 0xff00;
        color[2][2] = 0xff00;
        color[2][3] = 0xff00;

        chromaSDK.createKeypadEffect("CHROMA_CUSTOM", color);

        sleep(50);

        for (c = 0; c < 5; c++) {
            color[0][c] = 0;
            color[1][c] = 0;
            color[2][c] = ((0xa5 * 0.1) << 8) | (0xff * 0.1);
            color[3][c] = ((0xa5 * 0.3) << 8) | (0xff * 0.3);
        }

        color[1][2] = 0xff00;
        color[2][1] = 0xff00;
        color[2][2] = 0xff00;
        color[2][3] = 0xff00;

        chromaSDK.createKeypadEffect("CHROMA_CUSTOM", color);

        sleep(50);

        for (c = 0; c < 5; c++) {
            color[0][c] = 0;
            color[1][c] = 0;
            color[2][c] = 0;
            color[3][c] = ((0xa5 * 0.1) << 8) | (0xff * 0.1);
        }

        color[1][2] = 0xff00;
        color[2][1] = 0xff00;
        color[2][2] = 0xff00;
        color[2][3] = 0xff00;

        chromaSDK.createKeypadEffect("CHROMA_CUSTOM", color);

        sleep(50);

        for (c = 0; c < 5; c++) {
            color[0][c] = 0;
            color[1][c] = 0;
            color[2][c] = 0;
            color[3][c] = 0;
        }

        color[1][2] = 0xff00;
        color[2][1] = 0xff00;
        color[2][2] = 0xff00;
        color[2][3] = 0xff00;

        chromaSDK.createKeypadEffect("CHROMA_CUSTOM", color);
    },
    createHealthAmmoMana: function(type, value) {
        var data = new Array(4);
        for (r = 0; r < 4; r++) {
            data[r] = new Array(5);
            for (c = 0; c < 5; c++) {
                data[r][c] = 0;
            }
        }

        if (type == 1) {
            for (c = 0; c < (5 * (value / 100.0)) ; c++) {
                var green = (value / 100.0) * 0xff;
                var red = 0xff - ((value / 100.0) * 0xff);
                var color = (green) << 8 | red;

                data[0][c] = color;
            }
        } else if (type == 2) {
            for (c = 0; c < (5 * (value / 100.0)) ; c++) {
                data[3][c] = 0xffff;
            }
        }

        chromaSDK.createKeypadEffect("CHROMA_CUSTOM", data);
    },
    createAlerts: function(type) {

        if (this.alertFrames == false) {
            this.positiveAlert = chromaSDK.preCreateKeypadEffect("CHROMA_STATIC", 0xff00);
            this.negativeAlert = chromaSDK.preCreateKeypadEffect("CHROMA_STATIC", 0xff);
            this.noAlert = chromaSDK.preCreateKeypadEffect("CHROMA_NONE");
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
    createCooldownTimer: function(value) {
        var steps = Math.ceil(14 * (value / 100.0));

        var rowIndex = [0, 0, 0, 0, 0, 1, 2, 3, 3, 3, 3, 3, 2, 1];
        var colIndex = [0, 1, 2, 3, 4, 4, 4, 4, 3, 2, 1, 0, 0, 0];

        var color= new Array(4);
        for (r = 0; r < 4; r++) {
            color[r] = new Array(5);
            for (c = 0; c < 5; c++) {
                color[r][c] = 0;
            }
        }

        for (i = 0; i < steps; i++) {
            color[rowIndex[i]][colIndex[i]] = 0xffff;
        }

        chromaSDK.createKeypadEffect("CHROMA_CUSTOM", color);
    },
    createDamagaTaken: function() {
        if (this.damageFrames == false) {
            this.damageOn = chromaSDK.preCreateKeypadEffect("CHROMA_STATIC", 0xff);

            this.damageOff = chromaSDK.preCreateKeypadEffect("CHROMA_NONE");
            this.damageFrames = true;
        }

        chromaSDK.setEffect(this.damageOn);

        sleep(50);

        chromaSDK.setEffect(this.damageOff);
    },
    free: function(){
        if (this.loadingFrames == true) {
            chromaSDK.deleteEffect(this.loadingFrame1);
            chromaSDK.deleteEffect(this.loadingFrame2);
            chromaSDK.deleteEffect(this.loadingFrame3);
            chromaSDK.deleteEffect(this.loadingFrame4);
            chromaSDK.deleteEffect(this.loadingFrame5);
            chromaSDK.deleteEffect(this.loadingFrame6);
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