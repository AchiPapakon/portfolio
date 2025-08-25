import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useContext, useState } from 'react';
import type { RecipeInterface } from './types';
import EditPopup from './EditPopup';
import { RecipesContext } from './context';

interface RecipeProps {
    recipe: RecipeInterface;
}

const Recipe = ({ recipe }: RecipeProps) => {
    const [editingRecipeId, setEditingRecipeId] = useState<string>('');
    const { deleteRecipe } = useContext(RecipesContext);

    return (
        <Accordion key={recipe.title}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${recipe.title}-content`}
                id={`${recipe.title}-header`}
            >
                <Typography variant="h6">{recipe.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                Ingredients:
                <ul>
                    {recipe.ingredients.map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                    ))}
                </ul>
                <Grid container spacing={1}>
                    <Button variant="contained" color="success" onClick={() => setEditingRecipeId(recipe.id)}>
                        Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => deleteRecipe(recipe.id)}>
                        Delete
                    </Button>
                </Grid>
            </AccordionDetails>
            <EditPopup
                recipeId={editingRecipeId}
                open={Boolean(editingRecipeId)}
                onClose={() => setEditingRecipeId('')}
            />
        </Accordion>
    );
};

export default Recipe;
