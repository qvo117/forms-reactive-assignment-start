import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  projectStatuses = ["Stable", "Critical", "Finished"];

  ngOnInit(): void {
    this.myForm = new FormGroup({
      projectName: new FormControl(
        null,
        Validators.required,
        this.forbiddenProjectName
      ),
      mail: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl("Critical"),
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
  }

  // forbiddenProjectName(control: FormControl): { [s: string]: boolean } {
  //   if (control.value === "Test") {
  //     return { projectNameIsForbidden: true };
  //   }
  //   return null;
  // }

  forbiddenProjectName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "Test") {
          resolve({ projectNameIsForbidden: true });
        }
        resolve(null);
      }, 1500);
    });
    return promise;
  }
}
