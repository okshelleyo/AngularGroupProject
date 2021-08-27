import { Component, OnInit } from '@angular/core';
import { Questions } from '../models/Questions';
import { QuestionApiService } from '../services/question-api.service';
import { FavoritesApiService } from '../services/favorites-api.service';
import { Favorites } from '../models/Favorites';
import { User } from '../models/User';


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
  userDefault: string = "user1"

  constructor(private questionService: QuestionApiService, private favoritesService: FavoritesApiService) { }

  ngOnInit() {
    this.getQuestionsList();
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

  onFavoritesAdd(qId:number, userName: string) {
    this.favoritesService.addToFavorites(userName, qId).subscribe(
      result => {
        this.favoritesList = result;
        let f: Favorites = { userName: userName, qId: qId };
        this.favoritesService.favoriteList.push(f);

      },
      error => console.log(error)
    );

  }

}
