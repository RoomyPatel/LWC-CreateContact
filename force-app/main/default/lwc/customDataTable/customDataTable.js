import { LightningElement, api } from 'lwc';
const recordsPerPage = [3,4,5,6];

export default class CustomDataTable extends LightningElement {
    @api allData;
    @api columns;
    @api arr;
    @api sortedColumn;
    @api sortedDirection;
    @api arrUp;
    @api arrDown;
    @api pageLength = 3;
    @api page = -2;
    @api searchKey;
    @api pageSizeOptions = recordsPerPage;

    
    @api
    nextPage(){
        
        let results = [];
        let totalRecord = this.getSource();
            if (this.page < (Math.floor(totalRecord.length / this.pageLength))) {
                this.page = this.page + 1;
                for (let i = 0; i < this.pageLength; i++) {
                    if ((i + (this.page * this.pageLength)) < totalRecord.length) {
                        results.push(totalRecord[i + (this.page * this.pageLength)]);
                    }
                }
                this.setValue(results);
                
            }
    }   

    @api
    get getdata() {
        return this.allData;
    }

    set getdata(value) {
        console.log(value);
        this.allData = JSON.parse(JSON.stringify(value));
        this.nextPage();
    }

    
    
    setValue(val) {
        let finalOutput = [];
        val.forEach(element => {
            let temp = [];
            for (const key in element) {
                let singleObject = {
                    "key": key,
                    "value": element[key],
                };
                temp.push(singleObject);
            }
            finalOutput.push(temp);
            console.log(temp);
        });
        console.log({finalOutput});
        this.arr = finalOutput;
    }

    sortRecs(event) {
        this.arrUp = false;
        this.arrDown = false;
        let colName = event ? event.target.name : undefined;
        console.log('Column Name is ' + colName);

        if (this.sortedColumn === colName) {
            this.sortedDirection = (this.sortedDirection === 'asc' ? 'desc' : 'asc');
        }
        else {
            this.sortedDirection = 'asc';
        }
        let isReverse = this.sortedDirection === 'asc' ? 1 : -1;

        if (colName) {
            this.sortedColumn = colName;
        }
        else {
            colName = this.sortedColumn;
        }

        if (this.sortedDirection === 'asc') {
            this.arrUp = true;
            this.arrDown = false;
        }
        else {
            this.arrDown = true;
            this.arrUp = false;
        }

       
        let searchArr = this.getSource();
        searchArr = JSON.parse(JSON.stringify(searchArr)).sort((a, b) => {
            console.log({ a });
            console.log({ b });
            a = a[colName] ? a[colName].toLowerCase() : 'z';
            b = b[colName] ? b[colName].toLowerCase() : 'z';
            console.log({ a });
            console.log({ b });
            let rev = a > b ? 1 * isReverse : -1 * isReverse;
            console.log({ rev });
            return a > b ? 1 * isReverse : -1 * isReverse;
        });
        console.log({ searchArr });
        this.setValue(searchArr); 
    }

   

    handleKeyChange( event ) {  
          
        this.searchKey = event.target.value.toLowerCase(); 
        this.setValue(this.getSource());
        this.page = -1;
        this.nextPage();
        console.log( 'Search Key is ' + this.searchKey );
 
    }  


    get disablePrevious(){ 
        return this.page < 1;
    }
    get disableNext() { 
        let totalRecord = this.getSource();
        return this.page >= (Math.floor(totalRecord.length / this.pageLength));
    }

    prevPage() {
        let results = [];
        let totalRecord = this.getSource();
            if (this.page >= 1) {
                this.page = this.page - 1;
                for (let i = 0; i < this.pageLength; i++) {
                    if ((i + (this.page * this.pageLength)) < totalRecord.length) {
                        results.push(totalRecord[i + (this.page * this.pageLength)]);
                    }
                }
                this.setValue(results);
        }
    }

    handleRecordsPerPage(event){
        this.pageLength = event.target.value;
        this.page = -1;
        this.nextPage();
    }

    getSource() {
        if (this.searchKey) {
            return this.getSearchData(this.allData);
        }
        return this.allData;
    }

    getSearchData(data) {
        let recs = [];
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