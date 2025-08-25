import { createContext } from 'react';
import type { NewRecipeInterface, RecipeInterface } from './types';

export interface RecipesContextInterface {
    recipes: RecipeInterface[];
    addRecipe: (newRecipe: NewRecipeInterface) => string;
    updateRecipe: (id: string, updatedRecipe: RecipeInterface) => void;
    deleteRecipe: (id: string) => void;
    resetRecipes: () => void;
}

export const RecipesContext = createContext<RecipesContextInterface>({
    recipes: [],
    addRecipe: () => '',
    updateRecipe: () => {},
    deleteRecipe: () => {},
    resetRecipes: () => {},
});
