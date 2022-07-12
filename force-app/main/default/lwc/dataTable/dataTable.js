import { LightningElement, api } from 'lwc';

export default class DataTable extends LightningElement {

    // table headers
    @api headers;

    // become true if number of table record lenth is zero
    norecord = false;

    // store key paire value
    @api formateData;
    @api sortedColumn;
    @api sortedDirection;
    @api arr;
    @api arrUp = false;
    @api arrDown = false;
    
    @api
    get  body(){
       return this.formateData;
    }

    set body(obj){
        this.formateData = obj;
        this.dynemicRenderData(obj);
    }


    /*
        converting table record   into key value paire object
     */
    dynemicRenderData(body){
        let tdata = JSON.parse(JSON.stringify(body));
        let currentPageData = [];
        tdata.forEach(element => {
            let rowArray = []
            
            for (const key in element) {
                if (element.hasOwnProperty.call(element, key)) {
                    let singleValue = {};
                    const ele = element[key];
                    singleValue.key = ele;
                    rowArray.push(singleValue);
                }
            }
            currentPageData.push(rowArray);
        });
        this.arr = currentPageData;
        return currentPageData;
    }


    sort(event) {
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

       
        let sortArr = this.formateData;
        sortArr = JSON.parse(JSON.stringify(sortArr)).sort((a, b) => {
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
        console.log( sortArr );
        this.dynemicRenderData(sortArr);

    }

}