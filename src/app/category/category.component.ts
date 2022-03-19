import { Component, OnInit } from '@angular/core';
import { Category } from '../services/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.subjectMessage.subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    );
    this.categoryService.getCategories();
  }

  addCategory(category: string) {
    if(category) {
      this.categoryService.addCategory({
        name: category,
        createdAt: new Date()
      });
    }
  }

  removeCategory(category: Category) {
    this.categoryService.removeCategory(category);
  }

}
