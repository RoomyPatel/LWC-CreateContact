import { LightningElement , api} from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_NUMBER from '@salesforce/schema/Account.AccountNumber';
import PHONE from '@salesforce/schema/Account.Phone';
import getAccounts from '@salesforce/apex/contactController.getAccounts';
import ID from '@salesforce/schema/Account.Id';

const COLUMNS = [
    { label: 'Id', fieldName: ID.fieldApiName},
    { label: 'Account Name', fieldName: ACCOUNT_NAME.fieldApiName, type: 'text' },
    { label: 'Account Number', fieldName: ACCOUNT_NUMBER.fieldApiName},
    { label: 'Phone', fieldName: PHONE.fieldApiName, type: 'phone' }, 
]


export default class ListAccount extends LightningElement {
   
    columns = COLUMNS;

    @api accounts = [];

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