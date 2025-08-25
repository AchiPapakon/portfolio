export interface NewRecipeInterface {
    title: string;
    ingredients: string[];
}

export interface RecipeInterface extends NewRecipeInterface {
    id: string;
}
