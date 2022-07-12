import { LightningElement , api } from 'lwc';

export default class SearchRecord extends LightningElement {
    @api searchKey;
    @api searchData;

    handleKeyChange( event ) {   
        this.searchKey = event.target.value.toLowerCase(); 
        let filteredSearchData = this.getSearchData(this.searchKey);
        console.log('Search Key is ' + this.searchKey);
        
        const selectedEvent = new CustomEvent("searchkeychange", {
            detail: filteredSearchData,
        });
        
        this.dispatchEvent(selectedEvent);
    }
    
    
    @api
    get getdata() {
        return this.searchData;
    }

    set getdata(value) {
        this.searchData = JSON.parse(JSON.stringify(value));
        console.log(this.searchData);
    }


    getSearchData(search) {
        let recs = [];
        let data = this.searchData;
        for ( let rec of data) {

            console.log( 'Rec is ' + JSON.stringify( rec ) );
            let valuesArray = Object.values( rec );
            console.log( 'valuesArray is ' + valuesArray );
 
            for ( let val of valuesArray ) {         
                if ( val ) {
                    if ( val.toLowerCase().includes( this.searchKey ) ) {
                        recs.push( rec );
                        break;
                        
                    }
                }
            }        
        }

        console.log('Recs are ' + JSON.stringify(recs));
        return recs;
    }
}