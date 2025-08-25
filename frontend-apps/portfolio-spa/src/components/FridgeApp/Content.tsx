import { Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { dancingScript } from '../../css/generic';
import Recipes from './Recipes';
import { RecipesContext } from './context';
import EditPopup from './EditPopup';

const Content = () => {
    const { resetRecipes } = useContext(RecipesContext);
    const [isAddingRecipe, setIsAddingRecipe] = useState(false);

    return (
        <Stack spacing={1} sx={{ mt: 1, alignItems: 'center', width: 'min(100%, 550px)' }}>
            <Typography textAlign="center" variant="h2" color="secondary" fontFamily={dancingScript}>
                Fridge App
            </Typography>
            <Typography textAlign="center" variant="h5" color="secondary">
                Recipes are saved even if the page is refreshed
            </Typography>
            <Paper sx={{ p: 2, width: 550 }}>
                <Recipes />
            </Paper>
            <Grid container justifyContent="space-between" sx={{ width: 550 }}>
                <Button variant="contained" color="success" onClick={() => setIsAddingRecipe(true)}>
                    Add Recipe
                </Button>
                <Button variant="contained" color="primary" onClick={resetRecipes}>
                    Reset Recipes
                </Button>
            </Grid>
            <EditPopup open={isAddingRecipe} onClose={() => setIsAddingRecipe(false)} />
        </Stack>
    );
};

export default Content;
