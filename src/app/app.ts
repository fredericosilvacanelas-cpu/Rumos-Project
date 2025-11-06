// src/app/app.ts (or app.component.ts)

// 1. Necessary imports must be at the very top
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router'; // ⬅️ THIS IS CRUCIAL
import { CommonModule } from '@angular/common'; // Often needed for standalone components

@Component({
  selector: 'app-root', // The tag used in the main index.html
  standalone: true, // Indicates it's a standalone component
  // Define the template and stylesheet
  templateUrl: './app.html',
  styleUrl: './app.css', // Or styleUrls: [...]

  // 2. The imports array must declare RouterLink and RouterOutlet
  imports: [
    CommonModule, // For Angular directives like *ngIf, *ngFor (good practice)
    RouterLink,
    RouterOutlet
  ],
})
export class AppComponent {
  title = 'RecipeAppFrontend';
  // You can add more properties or methods here later
}
