import { Component, OnInit } from "@angular/core";
import { CommonService } from "app/service/common.service";
import { Constant } from "assets/data/constant";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { ExportToCsv } from "export-to-csv";

@Component({
  selector: "app-emp-dashboard",
  templateUrl: "./emp-dashboard.component.html",
  styleUrls: ["./emp-dashboard.component.scss"]
})
export class EmpDashboardComponent implements OnInit {
  empListArray: any;
  originalEmpArray: any;
  options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: true,
    title: "My Awesome CSV",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
  constructor(
    public common: CommonService,
    public spinner: NgxSpinnerService,
    public router: Router
  ) {}

  ngOnInit() {
    this.spinner.show();

    const URL = Constant.getEmpDetails;
    this.common.getData(URL).subscribe((resp: any) => {
      console.log(resp);
      this.empListArray = resp.response;
      this.originalEmpArray = resp.response;

      this.spinner.hide();
    });
  }

  fillFeddback() {
    this.router.navigate(["/cellnet/feedback-form"]);
  }

  exportToCSV() {
    if (this.empListArray) {
      const csvExporter = new ExportToCsv(this.options);

      csvExporter.generateCsv(this.empListArray);
    } else {
      this.common.showSnackbar({ status: "No Record Found!" });
    }
  }
}
