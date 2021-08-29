import { Component, OnInit } from '@angular/core';
import { Questions } from '../models/Questions';
import { QuestionApiService } from '../services/question-api.service';
import { FavoritesApiService } from '../services/favorites-api.service';
import { Favorites } from '../models/Favorites';
import { User } from '../models/User';
import { NgForm } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questionList: Questions[] = [];
  favoritesList: Favorites = { qId: 0, userName: '' };

  // showAnswer = false;
  selectedQ: Questions = { qId: 0, question: '', answer: '' };
  userDefault: string = "userDefault";
  private updateSubscription: Subscription;

  constructor(private questionService: QuestionApiService, private favoritesService: FavoritesApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getQuestionsList();
    this.questionService.newDataAdded.subscribe(
      (st: string) => {
        this.getQuestionsList();
      }
    );
    //this.updateSubscription = interval(5000).subscribe(
    //  (val) => {
    //    this.getQuestionsList();
    //  },
    //  )
  }


  getQuestionsList(){
    this.questionService.getAllQuestions().subscribe(
      result => {
        this.questionList = result;
        console.log(this.questionList);
        console.log(this.questionList[3].answer)
      },
      error => console.log(error)
    ); }

    //on select - shows answer
    onSelect(question: Questions) : void {
      this.selectedQ = question;
    }

  //onFavoritesAdd(qId:number) {
  //  this.favoritesService.addToFavorites(qId).subscribe(
  //    result => {
  //      this.favoritesList = result;
  //      let f: Favorites = { userName: userDefault, qId: qId };
  //      this.favoritesService.favoriteList.push(f);

  //    },
  //    error => console.log(error)
  //  );

  //}

    onFavoritesAdd(qid:number) {
    this.favoritesService.addToFavorites(qid).subscribe(
      result => {
        //this.favoritesList = result;
        //let f: Favorites = {
        //  userName: this.userDefault, qId: qId
        //};
        //this.favoritesService.favoriteList.push(f);
        console.log(this.favoritesList);

      },
      error => console.log(error)
    );

  }

  deleteQuestion(qid: number) {
    this.questionService.deleteQuestion(qid).subscribe(
      result => {
        console.log(qid);
        this.getQuestionsList();
      },
      error => console.log(error)
    );
  }

}
