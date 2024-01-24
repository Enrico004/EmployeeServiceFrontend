import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Qualification } from "../model/qualification";
import { QualificationService } from "../service/qualification.service";
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
  _filterText: string = '';
  private _editingIndex: number = -1;

  constructor(
    private qualificationService: QualificationService,
  ) { }
  get editingIndex(): number {
    return this._editingIndex;
  }

  set editingIndex(index: number) {
    this._editingIndex = index;
  }
  get qualifications(): Qualification[] {
    return this._qualifications;
  }

  ngOnInit(): void {
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
      // Wenn der Filtertext leer ist, lade die Qualifikationen erneut
      this.loadQualifications();
    } else {
      // Führe die Filterung auf der Client-Seite durch
      this._qualifications = this._qualifications.filter(q => {
        // Überprüfen, ob das Objekt und die Eigenschaft vorhanden sind
        return q && q.skill && q.skill.toLowerCase().includes(this.getFilterText().toLowerCase());
      });
    }
  }

  startEditing(index: number): void {
    this.editingIndex = index;
  }

  cancelEditing(): void {
    this.editingIndex = -1;
  }

  saveChanges(qualification: Qualification): void {
    // Implementieren Sie hier die Logik zum Speichern der Änderungen
    this.cancelEditing();
  }

}
