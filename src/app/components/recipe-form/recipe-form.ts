

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService, Recipe } from '@app/services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.css'
})
export class RecipeFormComponent implements OnInit {

  recipeForm!: FormGroup;
  isEditMode = false;
  recipeId: number | null = null;
  loading = true;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {

    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      category: ['Dinner', Validators.required],
      prepTime: [''],
      difficulty: ['Medium', Validators.required],
      instructions: ['', Validators.required],

      ingredients: this.fb.array([this.createIngredient()])
    });


    this.route.paramMap.subscribe(params => {
      const id = +(params.get('id') || 0);
      if (id) {
        this.isEditMode = true;
        this.recipeId = id;
        this.loadRecipe(id);
      } else {
        this.loading = false;
      }
    });
  }


  get ingredientsArray(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }


  createIngredient(ingredient?: any): FormGroup {
    return this.fb.group({

      id: [ingredient ? ingredient.id : 0],
      quantity: [ingredient ? ingredient.quantity : '', Validators.required],
      name: [ingredient ? ingredient.name : '', Validators.required]
    });
  }


  addIngredient(): void {
    this.ingredientsArray.push(this.createIngredient());
  }


  removeIngredient(index: number): void {
    this.ingredientsArray.removeAt(index);
    if (this.ingredientsArray.length === 0) {
      this.addIngredient();
    }
  }


  loadRecipe(id: number): void {
    this.recipeService.getRecipe(id).subscribe({
      next: (recipe: { [x: string]: any; ingredients?: any; }) => {

        while (this.ingredientsArray.length !== 0) {
          this.ingredientsArray.removeAt(0);
        }


        this.recipeForm.patchValue(recipe);


        recipe.ingredients.forEach((i: any) => {
          this.ingredientsArray.push(this.createIngredient(i));
        });
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading recipe:', err);
        this.loading = false;
        alert('Could not load recipe for editing.');
      }
    });
  }


  onSubmit(): void {
    if (this.recipeForm.invalid) {
      alert('Please fill out all required fields.');
      return;
    }

    const recipeData = this.recipeForm.value;

    if (this.isEditMode && this.recipeId) {

      this.recipeService.updateRecipe(this.recipeId, recipeData as Recipe).subscribe({
        next: () => {
          alert('Recipe updated successfully!');
          this.router.navigate(['/recipe', this.recipeId]);
        },
        error: (err: any) => alert('Update failed. Check API connection.')
      });
    } else {

      this.recipeService.createRecipe(recipeData as Recipe).subscribe({
        next: (newRecipe: { id: any; }) => {
          alert('Recipe created successfully!');
          this.router.navigate(['/recipe', newRecipe.id]);
        },
        error: (err: any) => alert('Creation failed. Check API connection.')
      });
    }
  }
}
