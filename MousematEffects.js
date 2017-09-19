// JavaScript source code

function MousematEffects() {
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
    this.loadingFrame11;
    this.loadingFrame12;

    this.alertFrames = false;
    this.positiveAlert;
    this.negativeAlert;
    this.noAlert;

    this.damageFrames = false;
    this.damageOn;
    this.damageOff;
}

MousematEffects.prototype = {
    createLoadingAnimation() {

        if (this.loadingFrames == false) {
            this.loadingFrame1 = chromaSDK.preCreateMousematEffect("CHROMA_NONE");

            var data = new Array(15);
            for (i = 0; i < 15; i++) data[i] = 0;

            data[14] = 0xa5ff;

            this.loadingFrame2 = chromaSDK.preCreateMousematEffect("CHROMA_CUSTOM", data);

            data[13] = 0xa5ff;

            this.loadingFrame3 = chromaSDK.preCreateMousematEffect("CHROMA_CUSTOM", data);

            data[12] = 0xa5ff;

            this.loadingFrame4 = chromaSDK.preCreateMousematEffect("CHROMA_CUSTOM", data);

            data[11] = 0xa5ff;

            this.loadingFrame5 = chromaSDK.preCreateMousematEffect("CHROMA_CUSTOM", data);

            data[10] = 0xa5ff;

            this.loadingFrame6 = chromaSDK.preCreateMousematEffect("CHROMA_CUSTOM", data);

            data[9] = 0xa5ff;

            this.loadingFrame7 = chromaSDK.preCreateMousematEffect("CHROMA_CUSTOM", data);

            data[8] = 0xa5ff;

            this.loadingFrame8 = chromaSDK.preCreateMousematEffect("CHROMA_CUSTOM", data);

            data[7] = 0xa5ff;

            this.loadingFrame9 = chromaSDK.preCreateMousematEffect("CHROMA_CUSTOM", data);

            data[6] = 0xa5ff;

            this.loadingFrame10 = chromaSDK.preCreateMousematEffect("CHROMA_CUSTOM", data);

            data[5] = 0xa5ff;

            this.loadingFrame11 = chromaSDK.preCreateMousematEffect("CHROMA_CUSTOM", data);

            data[4] = 0xa5ff;

            this.loadingFrame12 = chromaSDK.preCreateMousematEffect("CHROMA_CUSTOM", data);

            data[3] = 0xa5ff;

            this.loadingFrame13 = chromaSDK.preCreateMousematEffect("CHROMA_CUSTOM", data);

            data[2] = 0xa5ff;

            this.loadingFrame12 = chromaSDK.preCreateMousematEffect("CHROMA_CUSTOM", data);

            data[1] = 0xa5ff;

            this.loadingFrame11 = chromaSDK.preCreateMousematEffect("CHROMA_CUSTOM", data);

            this.loadingFrame12 = chromaSDK.preCreateMousematEffect("CHROMA_STATIC", 0xa5ff);

            this.loadingFrames = true;
        }

        chromaSDK.setEffect(this.loadingFrame1);

        sleep(500);

        chromaSDK.setEffect(this.loadingFrame2);

        sleep(50);

        chromaSDK.setEffect(this.loadingFrame3);

        sleep(50);

        chromaSDK.setEffect(this.loadingFrame4);

        sleep(50);

        chromaSDK.setEffect(this.loadingFrame5);

        sleep(50);

        chromaSDK.setEffect(this.loadingFrame6);

        sleep(50);

        chromaSDK.setEffect(this.loadingFrame7);

        sleep(50);

        chromaSDK.setEffect(this.loadingFrame8);

        sleep(50);

        chromaSDK.setEffect(this.loadingFrame9);

        sleep(50);

        chromaSDK.setEffect(this.loadingFrame10);

        sleep(50);

        chromaSDK.setEffect(this.loadingFrame11);

        sleep(50);

        chromaSDK.setEffect(this.loadingFrame12);

        sleep(50);
    },
    createHealthAmmoMana: function (type, value) {
        var steps = Math.ceil(value / 100.0 * 5);

        var data = new Array(15);
        for (i = 0; i < 15; i++) {
            data[i] = 0;
        }

        if (type == 1) {    // Health
            var green = (value / 100.0) * 0xff;
            var red = 0xff - ((value / 100.0) * 0xff);
            var color = (green) << 8 | red;

            for (i = 0; i < steps; i++) {
                data[10 + i] = color;
            }
        } else if (type == 2) { // Ammo
            for (i = 0; i < steps; i++) {
                data[4 - i] = 0xffff;
            }
        }

        chromaSDK.createMousematEffect("CHROMA_CUSTOM", data);
    },
    createAlerts: function (type) {
        if (this.alertFrames == false) {
            this.positiveAlert = chromaSDK.preCreateMousematEffect("CHROMA_STATIC", 0xff00);
            this.negativeAlert = chromaSDK.preCreateMousematEffect("CHROMA_STATIC", 0xff);
            this.noAlert = chromaSDK.preCreateMousematEffect("CHROMA_NONE");
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
    createCooldownTimer(value) {
        var steps = Math.ceil(15 * (value / 100.0));

        var data = new Array(15);

        for (i = 0; i < 15; i++) {
            if (i < steps) {
                data[i] = 0xff
            } else {
                data[i] = 0;
            }
        }

        chromaSDK.createMousematEffect("CHROMA_CUSTOM", data);
    },
    createDamageTaken: function(){

        if (this.damageFrames == false) {
            this.damageOn = chromaSDK.preCreateMousematEffect("CHROMA_STATIC", 0xff);

            this.damageOff = chromaSDK.preCreateMousematEffect("CHROMA_NONE");
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
            chromaSDK.deleteEffect(this.loadingFrame7);
            chromaSDK.deleteEffect(this.loadingFrame8);
            chromaSDK.deleteEffect(this.loadingFrame9);
            chromaSDK.deleteEffect(this.loadingFrame10);
            chromaSDK.deleteEffect(this.loadingFrame11);
            chromaSDK.deleteEffect(this.loadingFrame12);
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
