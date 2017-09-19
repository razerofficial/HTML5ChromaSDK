// JavaScript source code

function MouseEffects() {
    this.loadingFrames = false;
    this.loadingFrame1;
    this.loadingFrame2;
    this.loadingFrame3;
    this.loadingFrame4;
    this.loadingFrame5;
    this.loadingFrame6;
    this.loadingFrame7;
    this.loadingFrame8;
    this.loadingFrame9;
    this.loadingFrame10;

    this.alertFrames = false;
    this.positiveAlert;
    this.negativeAlert;
    this.noAlert;

    this.damageFrames = false;
    this.damageOn;
    this.damageOff;
}

MouseEffects.prototype = {
    createLoadingAnimation: function () {
        if (this.loadingFrames == false) {
            this.loadingFrame1 = chromaSDK.preCreateMouseEffect("CHROMA_NONE");

            var data = new Array(9);
            for (r = 0; r < 9; r++) {
                data[r] = new Array(7);
                for (c = 0; c < 7; c++) {
                    data[r][c] = 0;
                }
            }

            for (c = 0; c < 7; c++) {
                data[8][c] = 0xa5ff;
            }

            this.loadingFrame2 = chromaSDK.preCreateMouseEffect("CHROMA_CUSTOM2", data);

            for (c = 0; c < 7; c++) {
                data[7][c] = 0xa5ff;
            }

            this.loadingFrame3 = chromaSDK.preCreateMouseEffect("CHROMA_CUSTOM2", data);

            for (c = 0; c < 7; c++) {
                data[6][c] = 0xa5ff;
            }

            this.loadingFrame4 = chromaSDK.preCreateMouseEffect("CHROMA_CUSTOM2", data);

            for (c = 0; c < 7; c++) {
                data[5][c] = 0xa5ff;
            }

            this.loadingFrame5 = chromaSDK.preCreateMouseEffect("CHROMA_CUSTOM2", data);

            for (c = 0; c < 7; c++) {
                data[4][c] = 0xa5ff;
            }

            this.loadingFrame6 = chromaSDK.preCreateMouseEffect("CHROMA_CUSTOM2", data);

            for (c = 0; c < 7; c++) {
                data[3][c] = 0xa5ff;
            }

            this.loadingFrame7 = chromaSDK.preCreateMouseEffect("CHROMA_CUSTOM2", data);

            for (c = 0; c < 7; c++) {
                data[2][c] = 0xa5ff;
            }

            this.loadingFrame8 = chromaSDK.preCreateMouseEffect("CHROMA_CUSTOM2", data);

            for (c = 0; c < 7; c++) {
                data[1][c] = 0xa5ff;
            }

            this.loadingFrame9 = chromaSDK.preCreateMouseEffect("CHROMA_CUSTOM2", data);

            this.loadingFrame10 = chromaSDK.preCreateMouseEffect("CHROMA_STATIC", 0xa5ff);

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

        sleep(100);

        chromaSDK.setEffect(this.loadingFrame9);

        sleep(100);

        chromaSDK.setEffect(this.loadingFrame10);
    },
    createHealthAmmoMana: function(type, value){
        var steps = Math.ceil(value / 100.0 * 7);

        var data = new Array(9);
        for (r = 0; r < 9; r++) {
            data[r] = new Array(7);
            for (c = 0; c < 7; c++) {
                data[r][c] = 0;
            }
        }

        var healthRowIndex = [7, 6, 5, 4, 3, 2, 1];
        var healthColIndex = [0, 0, 0, 0, 0, 0, 0];
        var ammoRowIndex = [7, 6, 5, 4, 3, 2, 1];
        var ammoColIndex = [6, 6, 6, 6, 6, 6];

        if (type == 1) {    // Health
            var green = (value / 100.0) * 0xff;
            var red = 0xff - ((value / 100.0) * 0xff);
            var color = (green) << 8 | red;

            for (i = 0; i < steps; i++) {
                data[healthRowIndex[i]][healthColIndex[i]] = color;
            }
        } else if (type == 2) { // Ammo
            for (i = 0; i < steps; i++) {
                data[ammoRowIndex[i]][ammoColIndex[i]] = 0xffff;
            }
        }

        chromaSDK.createMouseEffect("CHROMA_CUSTOM2", data);
    },
    createAlerts: function (type) {

        if (this.alertFrames == false) {
            this.positiveAlert = chromaSDK.preCreateMouseEffect("CHROMA_STATIC", 0xff00);
            this.negativeAlert = chromaSDK.preCreateMouseEffect("CHROMA_STATIC", 0xff);
            this.noAlert = chromaSDK.preCreateMouseEffect("CHROMA_NONE");
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
    createDamageTaken: function() {
        if (this.damageFrames == false) {
            this.damageOn = chromaSDK.preCreateMouseEffect("CHROMA_STATIC", 0xff);

            this.damageOff = chromaSDK.preCreateMouseEffect("CHROMA_NONE");
            this.damageFrames = true;
        }

        chromaSDK.setEffect(this.damageOn);

        sleep(50);

        chromaSDK.setEffect(this.damageOff);
    },
    free: function () {
        if (this.loadingFrames == true) {
            chromaSDK.deleteEffect(this.loadingFrame1);
            chromaSDK.deleteEffect(this.loadingFrame2);
            chromaSDK.deleteEffect(this.loadingFrame3);
            chromaSDK.deleteEffect(this.loadingFrame4);
            chromaSDK.deleteEffect(this.loadingFrame5);
            chromaSDK.deleteEffect(this.loadingFrame6);
            chromaSDK.deleteEffect(this.loadingFrame7);
            chromaSDK.deleteEffect(this.loadingFrame8);
            chromaSDK.deleteEffect(this.loadingFrame9);
            chromaSDK.deleteEffect(this.loadingFrame10);
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
