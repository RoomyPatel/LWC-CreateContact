import { LightningElement, api, track } from "lwc";

export default class GenericPaginator extends LightningElement {
  @track showPaginator = false;
  @track disablePrevious = false;
  @track disableNext = false;
  @track pageNumber = 1;
  @track totalPages;
  @track recordsPerPage;
  @api recordsperpagevalueselected = "10";
  @api showrecordperpage = false;
  @api calledfromauracmp = false;
  filteredFields = [];

  @api
  get alldata() {
    return this._alldata;
  }
  set alldata(value) {
    //this.pageNumber = 1;
    this._alldata = value;
    if (value && value.length > 0) {
      this.recordsPerPage = parseInt(this.recordsperpagevalueselected);
      this.showPaginator = true;
      this.totalPages = Math.ceil(value.length / this.recordsPerPage);
      this.checkIfPageAvailable();
      this.filterRecords();
    } else {
      this.showPaginator = false;
      this.filteredFields = value;
      this.sendFilteredRecords();
    }
  }

  get recordsPerPageOptions() {
    return [
      { label: "10", value: "10" },
      { label: "20", value: "20" },
      { label: "30", value: "30" }
    ];
  }

  renderedCallback() {
    if (this.template.querySelector(".dynamicallyAddLeftMargin")) {
      if (this.showrecordperpage) {
        this.template
          .querySelector(".dynamicallyAddLeftMargin")
          .classList.add("increaseLeftMargin");
      } else {
        this.template
          .querySelector(".dynamicallyAddLeftMargin")
          .classList.remove("increaseLeftMargin");
      }
    }
  }

  handleRppChange(event) {
    this.pageNumber = 1;
    this.recordsPerPage = parseInt(event.detail.value);
    this.recordsperpagevalueselected = this.recordsPerPage.toString();
    this.totalPages = Math.ceil(this.alldata.length / this.recordsPerPage);
    this.checkIfPageAvailable();
    this.filterRecords();
  }

  firstHandler() {
    this.pageNumber = 1;
    this.checkIfPageAvailable();
    this.filterRecords();
  }

  previousHandler() {
    this.pageNumber -= 1;
    this.checkIfPageAvailable();
    this.filterRecords();
  }

  nextHandler() {
    this.pageNumber += 1;
    this.checkIfPageAvailable();
    this.filterRecords();
  }

  lastHandler() {
    this.pageNumber = this.totalPages;
    this.checkIfPageAvailable();
    this.filterRecords();
  }

  filterRecords() {
    this.filteredFields = [];
    var firstRecord = (this.pageNumber - 1) * this.recordsPerPage;
    var lastRecord = firstRecord + this.recordsPerPage;
    var lastRecordIndex = this.alldata.length;
    if (lastRecord > lastRecordIndex) {
      lastRecord = lastRecordIndex;
    }

    for (var i = firstRecord; i < lastRecord; i++) {
      var object = this.alldata[i];
      this.filteredFields.push(object);
    }

    this.sendFilteredRecords();
  }

  sendFilteredRecords() {
    if (this.calledfromauracmp) {
      const filters = this.filteredFields;
      this.dispatchEvent(
        new CustomEvent("pagination", {
          detail: { filters }
        })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent("pagination", {
          detail: this.filteredFields
        })
      );
    }
  }

  checkIfPageAvailable() {
    if (this.pageNumber <= 1) {
      this.disablePrevious = true;
    } else {
      this.disablePrevious = false;
    }
    if (this.pageNumber >= this.totalPages) {
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }
  }
}