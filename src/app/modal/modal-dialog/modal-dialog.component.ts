import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogConfig, MatDialogModule, MatDialogTitle} from "@angular/material/dialog";
import {AddEmployeeComponent} from "../../components/add-employee/add-employee.component";
import {EmployeeWithSkillID} from "../../model/EmployeeWithSkillID";
import {ToastService} from "../../service/toast.service";

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogTitle],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.css'
})
export class ModalDialogComponent {
  constructor() { }

}

//Beispiel für das öffnen des Dialoges, muss in den Komponenten überführt werden wo der Dialog geöffnet werden soll.
// export function openAddEmployeeDialog(dialog: MatDialog) {
//
//   const config = new MatDialogConfig();
//   let employee: EmployeeWithSkillID = new EmployeeWithSkillID()
//
//   config.disableClose = true;
//   config.autoFocus = true;
//   config.data = {
//     ...employee
//   };
//
//   const dialogRef = dialog.open(ModalDialogComponent, config);
//
//   return dialogRef.afterClosed();
// }
