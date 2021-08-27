import { Favorites } from './../models/Favorites';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { idText } from 'typescript';


@Injectable({
  providedIn: 'root'
})
export class FavoritesApiService {

  apiUri: string = "https://localhost:44343/api/studybuddy";
  favoriteList: Favorites[] = [];

  constructor(private http: HttpClient) {

    console.log(this.apiUri)
  }

  getFavoritesByUser (user: string) {
    return this.http.get<Favorites[]>(`${this.apiUri}/getuser/${user}`);
  }

  addToFavorites (user: string, id: number) {
    return this.http.post<Favorites>(`${this.apiUri}/addfavorite/${user}/${id}`, {"qId":id, "userName":user});
  }

  deleteFavorite (id: number, user: string) {
    return this.http.delete(`${this.apiUri}/deletequestion/${user}/${id}`);
  }

}
