

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService, Recipe } from '@app/services/recipe.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css'
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe | undefined;
  loading = true;
  error: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = +(params.get('id') || 0);

      if (id > 0) {
        this.fetchRecipe(id);
      } else {
        this.error = 'Invalid recipe ID.';
        this.loading = false;
      }
    });
  }

  fetchRecipe(id: number): void {
    this.loading = true;
    this.recipeService.getRecipe(id).subscribe({
      next: (data: Recipe) => {
        this.recipe = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching recipe detail:', err);
        this.error = 'Recipe not found or API error.';
        this.loading = false;
      }
    });
  }
}
