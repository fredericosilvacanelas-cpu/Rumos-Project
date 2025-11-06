

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_BASE_URL = 'http://localhost:5142/api/recipes';

export interface Recipe {
  id: number;
  name: string;
  category: string;
  prepTime: string;
  difficulty: string;
  instructions: string;
  ingredients: { id: number, name: string, quantity: string }[];
}





@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(API_BASE_URL);
  }


  getRecipe(id: number): Observable<Recipe> {

    return this.http.get<Recipe>(API_BASE_URL + '/' + id);
  }

  createRecipe(recipeData: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(API_BASE_URL, recipeData);
  }


  updateRecipe(id: number, recipeData: Recipe): Observable<void> {

    return this.http.put<void>(API_BASE_URL + '/' + id, recipeData);
  }
}
