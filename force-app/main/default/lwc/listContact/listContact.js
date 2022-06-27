import { LightningElement, wire , api } from 'lwc';
import getContacts from '@salesforce/apex/contactController.getContacts';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import contactMC from '@salesforce/messageChannel/contactMessageChannel__c';
import FirstName from '@salesforce/schema/Contact.FirstName';


const COLUMNS = [
    { label: 'Id' , fieldName: 'Id'},
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Phone', fieldName: 'Phone' , type: 'phone' },
    { label: 'Email', fieldName: 'Email' , type: 'email'}
]; 


export default class ListContact extends LightningElement {
    subscription = null;
    
    
    
    @wire(MessageContext)
    messageContext;
    columns = COLUMNS;
   
    
    @api contactData = [];

    
    connectedCallback() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                contactMC,
                () => {
                    this.fetchRecord();
                    
                }
            );
        }
        this.fetchRecord();
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    fetchRecord() {
        getContacts()
            .then(result => { 
                // this.contactData = result.filter(arr => arr.FirstName == 'Roomy'); 
                this.contactData = result;
                console.log(this.contactData);
            })
        .catch(error => {
            this.error = error;
        });
    }
}