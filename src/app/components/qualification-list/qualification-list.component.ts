import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {QualificationDto} from "../../model/qualificationDto";
import {QualificationService} from "../../service/qualification.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {AddQualificationComponent} from "../add-qualification/add-qualification.component";
import {ConfirmDialogComponent} from "../../modal/confirm-dialog/confirm-dialog.component";
import {ViewService} from "../../service/view.service";
import {View} from "../../model/view";
import {catchError, Observable, throwError} from "rxjs";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {DetailsService} from "../../service/details.service";
import {ToastService} from "../../service/toast.service";
import {QualificationTableFilterPipe} from "../../pipe/qualification-table-filter.pipe";

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterLink, NavigationBarComponent, MatFormField, MatInput, QualificationTableFilterPipe],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent {
  qualifications: Observable<QualificationDto[]>;
  private oldQualificationName: string='';
  idToEdit:number|undefined;
  tableFilter:string='';

  constructor(private qualificationService: QualificationService, public detailsService: DetailsService,
              private toastService: ToastService, private dialog: MatDialog,
              private router:Router, private viewService: ViewService
  ) {
    this.viewService.swapView(View.QUALIFICATION);
    this.qualifications=this.qualificationService.getAllQualifications();
  }
  startEditing(qualification:QualificationDto): void {
    this.idToEdit=qualification.id;
    this.oldQualificationName=qualification.skill
  }

  cancelEditing(qualification:QualificationDto): void {
    this.idToEdit=undefined;
    qualification.skill=this.oldQualificationName!;
    this.oldQualificationName='';
  }

  saveChanges(qualification: QualificationDto): void {
    this.qualificationService.updateQualification(qualification).subscribe(data=>{
      this.qualifications=this.qualificationService.getAllQualifications();
      this.idToEdit=undefined;
      this.oldQualificationName='';
    });
  }

  addQualificationDialogOpen() {
    const dialogConfig = new MatDialogConfig();
    let result: string = '';

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      result
    };

    const dialogRef = this.dialog.open(AddQualificationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      result => {
        const obj=JSON.parse(result);
        if(obj.method=='accept'){
          console.log("Dialog output:", obj.data)
          this.qualificationService.postQualification(obj.data).pipe(
            catchError(err => {
              this.toastService.showErrorToast("Speichern fehlgeschlagen")
              console.log(err);
              return throwError(() => err);
            })).subscribe(s => {
              this.toastService.showSuccessToast("Speichern abgeschlossen");
              this.qualifications=this.qualificationService.getAllQualifications();
            }
          );
        }
      }
    );
  }

  deleteQualification(qualification:QualificationDto){
    const dialogRef=this.dialog.open(ConfirmDialogComponent,{
      //width:'50dvw',
      //height:'50dvh',
      disableClose:true,
      autoFocus: true,
      data: {
        name:qualification.skill
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      const obj=JSON.parse(result);
      if(obj&&obj.method == 'confirm'){
        console.log('Deleting item')
        this.qualificationService.deleteQualification(qualification.id).subscribe( s=> {
          this.toastService.showSuccessToast("Löschen abgeschlossen");
          this.qualifications=this.qualificationService.getAllQualifications();
        }
        );
      }
    })
  }

  showEmployeesForQualification(qualification:QualificationDto){
    this.router.navigateByUrl(`qualification/${qualification.id}/employees`)
  }

  filterList(){
    console.log(this.tableFilter)
  }
}
