const fs = require('fs')
const path = require('path')
import firebase from "firebase/app";
import "firebase/storage";
const {FirebaseConfig} = require('../firebaseConfig')
let conf = new FirebaseConfig();
const firebaseConfig = conf.get();
firebase.initializeApp(firebaseConfig);

export class Upload {
    private readonly name: string;
    private storage: any;

    constructor(name: string) {
        this.name = name;
        this.storage = firebase.storage().ref();
    }

    async upload():Promise<string> {

        const file = await fs.readFileSync(path.resolve(`./public/pdf/${this.name}.pdf`));

        const ref = this.storage.child(`tickets/${this.name}`);

        await ref.put(file).then((snapshot: any) => {
            console.log('Uploaded a blob or file!');
        });

        const storage = firebase.storage();

        return await storage.ref(`tickets/${this.name}`).getDownloadURL()
            .then((url): string => {
                return url;
            });
    }
}
