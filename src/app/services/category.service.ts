import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[] = [];

  private apiUrl: string = environment.apiUrl;

  private subjectSource = new Subject<Category[]>();

  subjectMessage = this.subjectSource.asObservable();
  
  constructor(private http: HttpClient) { }

  getCategories() {
    this.categories = [];
    this.http.get<Category[]>(this.apiUrl + 'categories.json').subscribe(
      (data) => {
        if(data) {
          Object.entries(data).forEach(([key, category]) => {
            category.id = key;
            this.categories.push(category);
          });
        }
        this.subjectSource.next(this.categories);
      }
    );
  }

  addCategory(category: Category) {
    this.http.post<Category>(this.apiUrl + 'categories.json', category).subscribe(
      (data) => {
        category.id = data.name;
        this.categories.push(category);
        this.subjectSource.next(this.categories);
      }
    );
  }

  removeCategory(category: Category) {
    this.http.delete(this.apiUrl + 'categories/' + category.id + '.json').subscribe(
      (data) => {
        this.categories = this.categories.filter(c => c.id !== category.id);
        this.subjectSource.next(this.categories);
      }
    );
  }
  

}
