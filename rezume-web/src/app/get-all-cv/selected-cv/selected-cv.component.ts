import { Component, OnInit } from '@angular/core';

import { CvService } from '../../shared/cv.service';
import { CompanyService } from '../../shared/company.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selected-cv',
  templateUrl: './selected-cv.component.html',
  styleUrls: ['./selected-cv.component.css']
})
export class SelectedCvComponent implements OnInit {

  cvDetails;
  companyDetails;

  buttonAdd: boolean;
  showMessageError: boolean;

  constructor(private route: ActivatedRoute,
    private cvService: CvService, private companyService: CompanyService, private router: Router) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');


    this.cvService.getSelectedCV(id).subscribe(
      res => {
        this.cvDetails = res["cv"];
        // console.log(this.cvDetails);
      },
      err => {
        setTimeout(() => {this.router.navigate(['/studentprofile']); this.showMessageError = true}, 1);
      }
    );

    this.checkIfFavorite();
  }

  checkIfFavorite() {
    const id = this.route.snapshot.paramMap.get('id');

    this.companyService.getCompanyProfile().subscribe(
      res =>{
        this.companyDetails = res["company"];
        // on check si l'utilisateur possède déja ce cv en favori
        if(this.companyDetails.favorites.length > 0) {
          this.companyDetails.favorites.forEach(element => {
            if(element === id){
              this.buttonAdd = false;
            }
            else{
              this.buttonAdd = true;
            }
          });
        }
        else{
          this.buttonAdd = true;
        }

      },
      err => {
        console.log('User not found');
      }
    );
  }

  addFavorite() {
    const id = this.route.snapshot.paramMap.get('id');

    this.companyService.addFavorite(id).subscribe(
      res => {
        // console.log('Success');
        this.buttonAdd = false;
      },
      err => {
        // console.log('Err');
      }
    );
  }

  removeFavorite() {
    const id = this.route.snapshot.paramMap.get('id');

    this.companyService.removeFavorite(id).subscribe(
      res => {
        this.buttonAdd = true;
      },
      err => {
      }
    );
  }

}
