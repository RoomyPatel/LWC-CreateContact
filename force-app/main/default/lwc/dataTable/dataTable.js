import { LightningElement, api } from 'lwc';

export default class DataTable extends LightningElement {

    @api allData;
    @api columns;

    // connectedCallback() {
    //     console.log("connectedCallBack Fired");
    //     console.log(this.columns);
    // }
    
    @api
    get getdata() {
        return this.allData;
    }

    set getdata(value) {
        this.allData = JSON.parse(JSON.stringify(value));
    }
}