import { FavoritesApiService } from './../services/favorites-api.service';
import { Favorites } from './../models/Favorites';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Questions } from '../models/Questions';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit {

  favoriteList: Favorites[] = [];
  user: string = '';
  selectedQ: Questions = { qId: 0, question: '', answer: '' };

  constructor(private favoriteService: FavoritesApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    let user: string = routeParams.get("userDefault");
    this.getAllFavorites();
  }

  //getAllFavoritesByUser(user: string) {
  //  this.favoriteService.getFavoritesByUser(user).subscribe(
  //    result=> {
  //      this.favoriteList = result;
  //      console.log(this.favoriteList)
  //    },
  //    error => console.log(error)
  //  )
  //}

  getAllFavorites() {
    this.favoriteService.getAllFavorites().subscribe(
      result => {
        this.favoriteList = result;
        console.log(this.favoriteList)
      },
      error => console.log(error)
    );
  }
  

  //onSubmit(form: NgForm) {
  //  this.user = form.form.value;
  //  console.log(this.user);
  //  this.getAllFavoritesByUser(this.user);
  //}

  //on select - shows answer
  onSelect(question: Questions): void {
    this.selectedQ = question;
  }

  deleteFavorite(qid: number):void {
    this.favoriteService.deleteFavorite(qid, "user1").subscribe(
      result => {
        this.getAllFavorites();
        console.log(qid);
      },
      error => console.log(error)
    );
  }

}
