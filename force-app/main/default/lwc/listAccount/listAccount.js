import { LightningElement , api , track} from 'lwc';
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
    @api renderedAccountData = [];
    isAccountData = false;
    @api accounts = [];
    @track searchKey;
    @api paginationRecord = [];

    connectedCallback() {
      
        getAccounts()
            .then(result => {
                this.accounts = result; 
                this.renderedAccountData = result;
                this.paginationRecord = result;
                this.isAccountData = true;
                console.log(this.accounts);
            })
        .catch(error => {
            this.error = error;
        });
    }

    paginationHandler(event) {
        this.renderedAccountData = event.detail;
        console.log(this.renderedAccountData);
    }

    searchKeyHandler(event) {
        this.searchKey = event.detail;
        console.log(this.searchKey);
        this.paginationRecord = event.detail;
    }
}