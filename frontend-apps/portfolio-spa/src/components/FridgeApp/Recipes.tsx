import { useContext } from 'react';
import { Stack, Typography } from '@mui/material';
import { RecipesContext } from './context';
import Recipe from './Recipe';

const Recipes = () => {
    const { recipes } = useContext(RecipesContext);

    return (
        <Stack spacing={2}>
            {recipes.map((recipe) => (
                <Recipe recipe={recipe} key={recipe.id} />
            ))}
            {recipes.length === 0 && <Typography>No recipes yet.</Typography>}
        </Stack>
    );
};

export default Recipes;
