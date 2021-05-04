const bwipjs = require('bwip-js');
const fs = require('fs')

export class Barcode {
    private code: string;
    private name: string;

    constructor(code: string, name: string) {
        this.code = code;
        this.name = name;
    }

    create(): void {
        bwipjs.toBuffer({
            bcid: 'code39',       // Barcode type
            text: this.code.toUpperCase(),    // Text to encode
            scale: 3,               // 3x scaling factor
            height: 15,              // Bar height, in millimeters
            includetext: true,            // Show human-readable text
            textxalign: 'center',        // Always good to set this
        }).then((png: any) => {
            const fileContents = new Buffer(png, 'base64')
            fs.writeFile(`./public/barcode/${this.name}.png`, fileContents, (err: any) => {
                if (err) {
                    throw err
                }
            })
        }).catch((err: any) => {
            throw err
        });
    }
}

