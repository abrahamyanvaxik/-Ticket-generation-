const pdfCreator = require("pdf-creator-node");
let fs = require('fs')

export class Pdf {
    private readonly html: string;
    private pdfDocument: object;
    private readonly img: string;
    private readonly name: string;
    private readonly fileName: string;

    constructor(img:string, name:string,fileName:string) {

        this.img = img;
        this.name = name;
        this.fileName = fileName;

        this.html = fs.readFileSync("./public/template.html", "utf8");
        this.pdfDocument = {
            html: this.html,
            data: {
                img: this.img,
                name: this.name,
            },
            path: `./public/pdf/${this.fileName}.pdf`,
            type: "",
        };
    }

    private options:object = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            contents: '<div style="text-align: center;">Ticket</div>'
        },
        footer: {
            height: "28mm",
            contents: {
                first: 'Cover page',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
    };

    async create() {
        await pdfCreator
            .create(this.pdfDocument, this.options)
            .then((res: { filename: string }) => {
                return res
            })
            .catch((error: any) => {
                return error
            });
    }
}








