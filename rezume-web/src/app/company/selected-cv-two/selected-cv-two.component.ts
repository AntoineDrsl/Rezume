import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CvService } from 'src/app/shared/cv.service';
import {Location} from '@angular/common';
import { CompanyService } from 'src/app/shared/company.service';
import { StudentService } from 'src/app/shared/student.service';
import { saveAs } from "file-saver"
import * as moment from "moment";

@Component({
  selector: 'app-selected-cv-two',
  templateUrl: './selected-cv-two.component.html',
  styleUrls: ['./selected-cv-two.component.css']
})
export class SelectedCvTwoComponent implements OnInit {

  cvDetails;

  idUser;

  companyDetails;

  buttonAdd: boolean = true;

  constructor(private route: ActivatedRoute,
              private cvService: CvService,
              private _location: Location,
              private companyService: CompanyService,
              private studentService: StudentService,
              private router: Router
              ) { }

  ngOnInit() {

    if (!(this.studentService.getStudentPayload().statut === 'company')) {
      this.router.navigate(['/student']);
    }

    const id = this.route.snapshot.paramMap.get('id');

    this.cvService.getSelectedCV(id).subscribe(
      res => {
        this.cvDetails = res["cv"];
        this.idUser = this.cvDetails[0].student[0]._id;

        for(var i = 0; i < this.cvDetails[0].degrees.length; i++) {
          this.cvDetails[0].degrees[i].date = moment(this.cvDetails[0].degrees[i].date).format("YYYY")
        }
        for(var i = 0; i < this.cvDetails[0].experiences.length; i++) {
          this.cvDetails[0].experiences[i].start = moment(this.cvDetails[0].experiences[i].start).format("YYYY")
          this.cvDetails[0].experiences[i].end = moment(this.cvDetails[0].experiences[i].end).format("YYYY")
        }
        console.log(this.cvDetails)

      },
      err => {
        console.log('Impossible de recup cv details');
      }
    );

    this.checkIfFavorite();
  }

  backToPage() {
    this._location.back();
  }

  buildDownloadPdf() {
    const filename = this.cvDetails[0].student[0].firstName + '_' + this.cvDetails[0].student[0].lastName + '.pdf'
    this.cvService.buildCvPdf(this.cvDetails).subscribe(
      res => {
        console.log(res)
      }
    )
    // .subscribe(
    //   data => {
    //     saveAs(data, filename);
    //   },
    //   err => {
    //     alert("Problem while downloading the file.");
    //     console.error(err);
    //   }
    // )
  }

  checkIfFavorite() {

    this.companyService.getCompanyProfile().subscribe(
      res => {
        this.companyDetails = res['company'];
        // On check si l'utilisateur possède deja ce cv en favori
        if (this.companyDetails[0].favorites.length > 0) {

          this.companyDetails[0].favorites.forEach(element => {
            if (element === this.idUser) {
              console.log('je passe par la')
              this.buttonAdd = false;
            }
          });
        }

      }
    );

  }



  addToFavorites() {
    this.companyService.addFavorite(this.cvDetails[0].student[0]._id).subscribe(
      res => {
        this.buttonAdd = false;
      }
    );
  }

  removeFromFavorites() {
    this.companyService.removeFavorite(this.cvDetails[0].student[0]._id).subscribe(
      res => {
        this.buttonAdd = true;
      }
    );
  }
}
