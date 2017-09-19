// JavaScript source code

function ChromaLinkEffects() {
    this.loadingFrames = false;
    this.loadingFrame1;
    this.loadingFrame2;
    this.loadingFrame3;
    this.loadingFrame4;
    this.loadingFrame5;
    
    this.alertFrames = false;
    this.positiveAlert;
    this.negativeAlert;
    this.noAlert;

    this.damageFrames = false;
    this.damageOn;
    this.damageOff;
}

ChromaLinkEffects.prototype = {
    createLoadingAnimation: function () {
        chromaSDK.createChromaLinkEffect("CHROMA_NONE");

        sleep(500);

        var color = new Array(5);
        for (i = 0; i < 5; i++) color[i] = 0;

        for (i = 0; i < 5; i++) {
            color[i] = 0xa5ff;

            chromaSDK.createChromaLinkEffect("CHROMA_CUSTOM", color);

            sleep(50);
        }
    },
    createHealthAmmoMana: function (type, value){
        var steps = Math.ceil(value / 100.0 * 5);

        var data = new Array(5);
        for (i = 0; i < 5; i++) {
            data[i] = 0;
        }

        if (type == 1) {    // Health
            var green = (value / 100.0) * 0xff;
            var red = 0xff - ((value / 100.0) * 0xff);
            var color = (green) << 8 | red;

            for (i = 0; i < steps; i++) {
                data[0] = color;
            }
        } else if (type == 2) { // Ammo
            for (i = 1; i < steps; i++) {
                data[i] = 0xffff;
            }
        }

        chromaSDK.createChromaLinkEffect("CHROMA_CUSTOM", data);
    },
    createAlerts: function(type) {

        if (this.alertFrames == false) {
            this.positiveAlert = chromaSDK.preCreateChromaLinkEffect("CHROMA_STATIC", 0xff00);
            this.negativeAlert = chromaSDK.preCreateChromaLinkEffect("CHROMA_STATIC", 0xff);
            this.noAlert = chromaSDK.preCreateChromaLinkEffect("CHROMA_NONE");
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
    createDamageTaken: function () {
        if (this.damageFrames == false) {
            this.damageOn = chromaSDK.preCreateChromaLinkEffect("CHROMA_STATIC", 0xff);

            this.damageOff = chromaSDK.preCreateChromaLinkEffect("CHROMA_NONE");
            this.damageFrames = true;
        }

        chromaSDK.setEffect(this.damageOn);

        sleep(50);

        chromaSDK.setEffect(this.damageOff);
    },
    free: function() {
        if (this.loadingFrames == true) {
            chromaSDK.deleteEffect(this.loadingFrame1);
            chromaSDK.deleteEffect(this.loadingFrame2);
            chromaSDK.deleteEffect(this.loadingFrame3);
            chromaSDK.deleteEffect(this.loadingFrame4);
            chromaSDK.deleteEffect(this.loadingFrame5);
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
