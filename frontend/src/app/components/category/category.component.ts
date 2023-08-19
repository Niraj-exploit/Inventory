import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/Category.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  addedCategory: any = {};
  constructor(private categoryService: CategoryService,private authService:AuthService) {}

  ngOnInit() {
    this.categoryList();
    
  }

  categoryList(): void {
    this.categoryService.categroyList().subscribe(
     
      (res: any) => {
        if (res.success) {  
          this.categories = res.categories; 
        } else {
          console.log('API returned status false or data not found.');
        }
      },
      (error: any) => {
        console.error('Error fetching stock:', error);
      }
    );
  }
 
  newCategory(): void {
    this.categoryService.categroyCreate(this.addedCategory).subscribe(
      (res: any) => {
        if (res.success) { 
          alert("New Category added Successfully");
           this.categoryList();
        } else {
          console.log('Cannot Create Category');
        }
      },
      (error: any) => {
        console.error(error);
      } 
    );
  }

  reloadWebsite(): void {  
    window.location.reload();
  }
  roll(){
    return this.authService.getRoll();
   }
}
