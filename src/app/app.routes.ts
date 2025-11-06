

import { Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail';
import { RecipeFormComponent } from './components/recipe-form/recipe-form';

export const routes: Routes = [

  { path: '', component: RecipeListComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'admin/add', component: RecipeFormComponent },
  { path: 'admin/edit/:id', component: RecipeFormComponent },

  { path: '**', redirectTo: '' }
];
