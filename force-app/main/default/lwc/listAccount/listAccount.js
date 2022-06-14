import { LightningElement, wire } from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_NUMBER from '@salesforce/schema/Account.AccountNumber';
import PHONE from '@salesforce/schema/Account.Phone';
import getAccounts from '@salesforce/apex/contactController.getAccounts';

const COLUMNS = [
    { label: 'Account Name', fieldName: ACCOUNT_NAME.fieldApiName, type: 'text' },
    { label: 'Account Number', fieldName: ACCOUNT_NUMBER.fieldApiName},
    { label: 'Phone', fieldName: PHONE.fieldApiName , type: 'phone' },
]


export default class ListAccount extends LightningElement {

    columns = COLUMNS;
    @wire(getAccounts) 
    accounts;

    connectedCallback() {
      
        getAccounts()
            .then(result => {
            this.accounts = result; 
            console.log(this.accounts);
            })
        .catch(error => {
            this.error = error;
        });
    }
}