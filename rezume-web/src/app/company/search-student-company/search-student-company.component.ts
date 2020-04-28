// import { Component, OnInit } from '@angular/core';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { StudentService } from 'src/app/shared/student.service';
import { CvService } from 'src/app/shared/cv.service';
import { HashtagService } from 'src/app/shared/hashtag.service';

import {Hashtag} from 'src/app/shared/hashtag.model';

@Component({
  selector: 'app-search-student-company',
  templateUrl: './search-student-company.component.html',
  styleUrls: ['./search-student-company.component.css']
})

export class SearchStudentCompanyComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  competenceCtrl = new FormControl();
  filteredCompetences: Observable<string[]>;
  competences: string[] = ['HTML', 'PHP', 'CSS', 'Angular', 'VueJs', 'React'];

  allCompetences: string[];

  studentList;
  cvId;

  @ViewChild('competenceInput', {static: false}) competenceInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(private studentService: StudentService,
              private cvService: CvService,
              private hashtagService: HashtagService,
              private router: Router) {

    this.filteredCompetences = this.competenceCtrl.valueChanges.pipe(
      startWith(null),
      map((competence: string | null) => competence ? this._filter(competence) : this.allCompetences.slice()));

   }

  ngOnInit() {

    this.hashtagService.getAllHashtag().subscribe(
      res => {
        // this.allCompetences = res["hashtag"];
        console.table(res['hashtag']);
      },

      err => {
        console.log(err);
      }
    )

  }

  add(event: MatChipInputEvent): void {
    // Add competence only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our competence
      if ((value || '').trim()) {
        this.competences.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.competenceCtrl.setValue(null);
    }
  }

  remove(competence: string): void {
    const index = this.competences.indexOf(competence);

    if (index >= 0) {
      this.competences.splice(index, 1);
    }
    if (competence !== '') {
      this.allCompetences.push(competence);
      this.competenceCtrl.setValue(null);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.competences.push(event.option.viewValue);
    this.competenceInput.nativeElement.value = '';

    const index = this.allCompetences.indexOf(event.option.viewValue);
    if (index >= 0) {
      this.allCompetences.splice(index, 1);
    }

    this.competenceCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCompetences.filter(competence => competence.toLowerCase().indexOf(filterValue) === 0);
  }





  onSubmit() {
    const listJson = encodeURIComponent(JSON.stringify(this.competences));

    this.studentService.searchProfile(listJson).subscribe(
      res => {
        this.studentList = res['cv'];
        console.log(this.studentList);
      },

      err => {
        console.log('pas ok');
      }

    )
  }


  selectCvStudent(id) {

    this.cvService.getSelectedCvStudent(id).subscribe(
      res => {
        this.cvId = res["cv"];
        console.log(this.cvId);
        this.router.navigate(['/cvstudent/' + this.cvId._id]);
      },
      err => {
        console.log('Pas id');
      }
    )
  }
}
