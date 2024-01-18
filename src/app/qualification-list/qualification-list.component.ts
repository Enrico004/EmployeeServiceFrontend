import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Qualification } from "../model/qualification";
import { QualificationService } from "../service/qualification.service";
import { TokenService } from "../service/token.service";
import { error } from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterLink],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent implements OnInit {
  private _qualifications: Qualification[] = [];

  constructor(
    private qualificationService: QualificationService,
    private tokenService: TokenService
  ) { }

  get qualifications(): Qualification[] {
    return this._qualifications;
  }


  ngOnInit(): void {
    this.tokenService.getObservableToken().subscribe(
      () => {
        this.loadQualifications();
      },
      error => {
        console.error('Fehler beim Laden des Tokens:', error);
      }
    );
  }

  loadQualifications() {
    this.qualificationService.getAllQualifications(this.tokenService.getToken()).subscribe(
      (data: Qualification[]) => {
        this._qualifications = data;
      },
      error => {
        console.error('Fehler beim Laden der Qualifikationen:', error);
      }
    );
  }
}
