const {Router} = require("express");
const router = Router();
const {Qrcode} = require('../servaces/qrcode')
const {Barcode} = require('../servaces/barcode')
const {v4: uuidv4} = require('uuid');
const {Upload} = require('../servaces/upload')
const {Pdf} = require('../servaces/pdf')

interface RenderParams {
    title: string;
    isHome: boolean;
    data?: {
        url: string;
        fileName: string;
    }
}

router.get("/", (req: any, res: {
    status: (arg0: number) => void;
    render(index: string, renderParams: RenderParams): void;
}) => {

    const renderParams: RenderParams =  {
        title: 'Home',
        isHome: true
    }

    res.status(200)
    res.render('index', renderParams)
});

router.post("/", async (req: any, res: {
    status: (arg0: number) => void;
    render: (arg0: string, renderParams: RenderParams) => void;
    redirect(regExp: string): void;
}) => {
    try {
        const fileName = uuidv4();

        if (req.body.code_type == 'qrcode') {

            const qrCodeGenerator = new Qrcode(req.body.code, fileName);
            await qrCodeGenerator.create();
        } else {

            const barCodeGenerator = new Barcode(req.body.code, fileName);
            await barCodeGenerator.create();
        }

        const pdfGenerator = new Pdf(`http://localhost:8001/${req.body.code_type}/${fileName}.png`, req.body.name, fileName);
        await pdfGenerator.create();

        const storageUpload = new Upload(fileName);
        const url: string = await storageUpload.upload()
            .then((url: string) => {
                return url
            })

        const renderParams:RenderParams = {
            title: 'Home',
            isHome: true,
            data: {
                url,
                fileName
            }
        }

        res.status(200)
        res.render('index', renderParams)
    } catch (e) {
        res.redirect('/')
    }
});


module.exports = router