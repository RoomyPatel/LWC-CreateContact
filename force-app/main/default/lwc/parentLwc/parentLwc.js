import { LightningElement } from 'lwc';

export default class ParentLwc extends LightningElement {
    countValue = 0;

    handleDecrement() {
        this.countValue--;
    }

    handleIncrement() {
        this.countValue++;
    }

    handleMultiply(event) {
        const multiplyingNumber = event.detail;
        this.countValue *= multiplyingNumber;
    }
}