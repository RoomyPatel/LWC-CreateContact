import { LightningElement , track } from 'lwc';

const options = [
    { label: 'Sarah', value: 'Sarah' },
    { label: 'James', value: 'James' },
    { label: 'Robert', value: 'Robert' },
    { label: 'Jennifer', value: 'Jennifer' },
    { label: 'Jessica', value: 'Jessica' },
];

export default class PicklistValue extends LightningElement {

    @track selectedValue;
    @track options = options;
     
    handleSelectOptionList(event){
        console.log(event.detail);
        this.selectedValue = event.detail;
        console.log(this.selectedValue);
    }
}