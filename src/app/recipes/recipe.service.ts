import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Nizam Shahi Chicken', 
    //         'This is an exotic indian shahi chicken recipe', 
    //     'https://images.immediate.co.uk/production/volatile/sites/2/2017/09/Chic-Curry-1.jpg?quality=45&resize=620,413',
    //     [
    //         new Ingredient('Chicken Meat', 1),
    //         new Ingredient('Curd', 2),
    //         new Ingredient('Coriander', 1)
    //     ]),
    //     new Recipe('Butter Chicken', 
    //     'Utterly Butterly Chicken, melts just like butter', 
    //     'https://images.immediate.co.uk/production/volatile/sites/2/2017/03/butter-chicken-curry.jpg?quality=45&crop=14px,2135px,3739px,2491px&resize=620,413',
    //     [
    //         new Ingredient('Chicken Meat', 2),
    //         new Ingredient('Cheese', 3),
    //         new Ingredient('Butter', 5),
    //         new Ingredient('Cream', 1)
    //     ])
    //     ];

    private recipes: Recipe[] = [];
    
    constructor(private slService: ShoppingListService){}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addIngredientToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}