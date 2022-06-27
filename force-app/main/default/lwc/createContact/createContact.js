import { LightningElement , wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { publish, MessageContext } from 'lightning/messageService';
import contactMC from '@salesforce/messageChannel/contactMessageChannel__c'

export default class CreateContact extends LightningElement {
    @wire(MessageContext)
    messageContext;

    strFirstName;
    strLastName;
    strPhone;
    strEmail;

    handleFirstNameChange(event){
        this.strFirstName = event.target.value;
    }
    handleLastNameChange(event){
        this.strLastName = event.target.value;
    }
    handlePhoneChange(event){
        this.strPhone = event.target.value;
    }
    handleEmailChange(event) {
        this.strEmail = event.target.value;
    }
 
    createContact() {
        var fields = {'FirstName' : this.strFirstName, 'LastName' : this.strLastName, 'Phone' : this.strPhone , 'Email' : this.strEmail};
        var objRecordInput = {'apiName' : 'Contact', fields};
        
        createRecord(objRecordInput).then(response => {
            alert('Contact created with Id: ' + response.id);
            this.handleFields();
            publish(this.messageContext, contactMC, response);
        })
            .catch(error => {
            const event = new ShowToastEvent({
                title: 'Error',
                message: error.body.message,
                variant: 'error'
            });
           this.dispatchEvent(event);
        });   
    }
    handleFields() {
        this.template.querySelectorAll('lightning-input').forEach(element => {
            element.value = null;
        });
    }

}