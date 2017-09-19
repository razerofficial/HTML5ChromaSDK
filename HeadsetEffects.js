// JavaScript source code

function HeadsetEffects() {
    this.alertFrames = false;
    this.positiveAlert;
    this.negativeAlert;
    this.noAlert;

    this.damageFrames = false;
    this.damageOn;
    this.damageOff;
}

HeadsetEffects.prototype = {
    createHealthAmmoMana: function(type, value) {
        var data;
        if (type == 1) {    // Health
            var green = (value / 100.0) * 0xff;
            var red = 0xff - ((value / 100.0) * 0xff);
            var color = (green) << 8 | red;

            for (i = 0; i < 5; i++) {
                data = color;
            }
        }

        chromaSDK.createHeadsetEffect("CHROMA_STATIC", data);
    },
    createAlerts: function(type) {
        if (this.alertFrames == false) {
            this.positiveAlert = chromaSDK.preCreateHeadsetEffect("CHROMA_STATIC", 0xff00);
            this.negativeAlert = chromaSDK.preCreateHeadsetEffect("CHROMA_STATIC", 0xff);
            this.noAlert = chromaSDK.preCreateHeadsetEffect("CHROMA_NONE");
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
    createDamageTaken: function(){

        if (this.damageFrames == false) {
            this.damageOn = chromaSDK.preCreateHeadsetEffect("CHROMA_STATIC", 0xff);

            this.damageOff = chromaSDK.preCreateHeadsetEffect("CHROMA_NONE");
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

