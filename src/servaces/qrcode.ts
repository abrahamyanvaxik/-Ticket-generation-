const QRCode = require('qrcode')

export class Qrcode {
    private readonly code: string;
    private readonly name: string;

    constructor(code: string, name: string) {
        this.code = code;
        this.name = name;
    }
    async create():Promise<boolean>{
        return await QRCode.toFile(`./public/qrcode/${this.name}.png`, this.code, {
                width:250,
            },
            function (err: any) {
            if (err) throw err
            return true
        })
    }
}
