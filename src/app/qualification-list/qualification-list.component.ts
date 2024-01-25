import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Qualification } from "../model/qualification";
import { QualificationService } from "../service/qualification.service";
import { error } from "@angular/compiler-cli/src/transformers/util";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterLink, NavigationBarComponent],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent implements OnInit {
  private _qualifications: Qualification[] = [];
  private _filterText: string = '';
  private _editingIndex: number = -1;
  private _skillOld: string | undefined = '';

  constructor(
    private qualificationService: QualificationService,
    private updateQualification: QualificationService,
  ) { }

  get editingIndex(): number {
    return this._editingIndex;
  }

  set editingIndex(index: number) {
    this._editingIndex = index;

    if (this._editingIndex !== -1) {
      this._skillOld = this._qualifications[this._editingIndex]?.skill;
    }
  }

  get qualifications(): Qualification[] {
    return this._qualifications;
  }

  ngOnInit(): void {
    this.loadQualifications();
  }

  loadQualifications() {
    this.qualificationService.getAllQualifications().subscribe(
      (data: Qualification[]) => {
        this._qualifications = data;
      },
      error => {
        console.error('Fehler beim Laden der Qualifikationen:', error);
      }
    );
  }

  getFilterText(): string {
    return this._filterText;
  }

  setFilterText(value: string): void {
    this._filterText = value;
  }

  applyFilter() {
    if (this.getFilterText() === '') {
      this.loadQualifications();
    } else {
      this._qualifications = this._qualifications.filter(q => {
        return q && q.skill && q.skill.toLowerCase().includes(this.getFilterText().toLowerCase());
      });
    }
  }

  startEditing(index: number): void {
    this.editingIndex = index;
  }

  cancelEditing(): void {
    if (this._editingIndex !== -1) {
      this._qualifications[this._editingIndex].skill = this._skillOld;
    }
    this.editingIndex = -1;
  }

  saveChanges(qualification: Qualification): void {
    if (this._editingIndex !== -1 && qualification.id !== undefined) {
      const updatedSkill = qualification.skill ?? ''; // Verwenden Sie den nullish coalescing-Operator hier

      this.updateQualification.updateQualification(qualification.id, updatedSkill).subscribe(
        updatedQualification => {
          // Aktualisieren Sie die Qualification-Liste mit dem aktualisierten Qualification-Objekt
          this._qualifications[this._editingIndex] = updatedQualification;
          this.editingIndex = -1;
        },
        error => {
          console.error('Fehler beim Aktualisieren der Qualifikation:', error);
        }
      );
    }
  }

}
