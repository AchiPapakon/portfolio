import { useMemo, useState } from 'react';
import { RecipesContext, type RecipesContextInterface } from './context';
import type { NewRecipeInterface, RecipeInterface } from './types';

interface RecipesProviderProps {
    children: React.ReactNode;
}

const initialRecipes: RecipeInterface[] = [
    {
        id: '1',
        title: 'Spaghetti Carbonara',
        ingredients: ['spaghetti', 'eggs', 'parmesan cheese', 'guanciale', 'black pepper'],
    },
    {
        id: '2',
        title: 'Caprese Salad',
        ingredients: ['mozzarella', 'tomatoes', 'basil', 'olive oil', 'balsamic vinegar'],
    },
    {
        id: '3',
        title: 'Tiramisu',
        ingredients: ['ladyfingers', 'coffee', 'mascarpone cheese', 'cocoa powder', 'sugar'],
    },
];

const RecipesProvider = ({ children }: RecipesProviderProps) => {
    const storedRecipes = localStorage.getItem('recipes');

    const [recipes, setRecipes] = useState<RecipeInterface[]>(
        storedRecipes ? JSON.parse(storedRecipes) : initialRecipes
    );

    const value = useMemo<RecipesContextInterface>(
        () => ({
            recipes,
            addRecipe: (newRecipe: NewRecipeInterface): string => {
                const id = Date.now().toString();
                setRecipes((prevRecipes) => {
                    const updatedRecipes = [...prevRecipes, { ...newRecipe, id }];
                    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
                    return updatedRecipes;
                });
                return id;
            },
            updateRecipe: (id: string, updatedRecipe: RecipeInterface) => {
                setRecipes((prevRecipes) => {
                    const newRecipes = prevRecipes.map((recipe) => (recipe.id === id ? updatedRecipe : recipe));

                    localStorage.setItem('recipes', JSON.stringify(newRecipes));
                    return newRecipes;
                });
            },
            deleteRecipe: (id: string) => {
                setRecipes((prevRecipes) => {
                    const newRecipes = prevRecipes.filter((recipe) => recipe.id !== id);

                    localStorage.setItem('recipes', JSON.stringify(newRecipes));
                    return newRecipes;
                });
            },
            resetRecipes: () => {
                setRecipes(initialRecipes);
                localStorage.setItem('recipes', JSON.stringify(initialRecipes));
            },
        }),
        [recipes]
    );

    return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>;
};

export default RecipesProvider;
