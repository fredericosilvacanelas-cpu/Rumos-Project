

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


import { RecipeService, Recipe } from '@app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css'
})
export class RecipeListComponent implements OnInit {


  recipes: Recipe[] = [];
  loading = true;
  error: any;


  constructor(private recipeService: RecipeService) { }


  ngOnInit(): void {
    this.fetchRecipes();
  }


  fetchRecipes(): void {
    this.loading = true;

    this.recipeService.getRecipes().subscribe({
      next: (data: Recipe[])=> {

        this.recipes = data;
        this.loading = false;
      },
      error: (err: any) => {

        console.error('Error fetching recipes:', err);
        this.error = 'Could not load recipes. Please ensure the C# API is running.';
        this.loading = false;
      }
    });
  }
}
