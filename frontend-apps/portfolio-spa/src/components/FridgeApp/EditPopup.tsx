import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    List,
    TextField,
    Typography,
} from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import Ingredient from './Ingredient';
import { RecipesContext } from './context';

interface EditPopupProps {
    recipeId?: string;
    open: boolean;
    onClose: () => void;
}

const EditPopup = ({ recipeId, open, onClose }: EditPopupProps) => {
    const { recipes, addRecipe, updateRecipe } = useContext(RecipesContext);
    const [isAddingIngredient, setIsAddingIngredient] = useState(false);
    const [isEditingIngredient, setIsEditingIngredient] = useState(false);
    const [usedRecipeId, setUsedRecipeId] = useState<string | undefined>(recipeId);
    const [title, setTitle] = useState<string>('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const originalTitle = useRef<string>('');

    const recipe = recipes.find((r) => r.id === usedRecipeId) || null;

    useEffect(() => {
        setUsedRecipeId(recipeId);
    }, [recipeId]);

    useEffect(() => {
        if (recipe) {
            setTitle(recipe.title);
            setIngredients(recipe.ingredients);

            originalTitle.current = recipe.title;
        }
    }, [recipe]);

    const handleSaveIngredient = (index: number) => (newIngredient: string) => {
        let updatedIngredients;
        if (newIngredient) {
            // Update it
            updatedIngredients = [...ingredients];
            updatedIngredients[index === -1 ? updatedIngredients.length : index] = newIngredient;
        } else {
            // Remove it
            updatedIngredients = ingredients.filter((_, i) => i !== index);
        }

        setIngredients(updatedIngredients);
        setIsAddingIngredient(false);
    };

    const handleAddIngredient = () => {
        setIsAddingIngredient(true);
    };

    const handleSave = () => {
        if (!usedRecipeId) {
            addRecipe({ title, ingredients });
        } else if (recipe) {
            updateRecipe(usedRecipeId, { ...recipe, title, ingredients });
        }
        onClose();
    };

    const handleExit = () => {
        setIsAddingIngredient(false);
        setIsEditingIngredient(false);
        setUsedRecipeId(undefined);
        setTitle('');
        setIngredients([]);
    };

    const isSaveDisabled =
        !title || ingredients.length === 0 || !ingredients.every(Boolean) || isEditingIngredient || isAddingIngredient;

    return (
        <Dialog open={open} onClose={onClose} onTransitionExited={handleExit} maxWidth="xs" fullWidth>
            <DialogTitle>{originalTitle.current ? `Edit: ${originalTitle.current}` : 'Add Recipe'}</DialogTitle>
            <DialogContent>
                <Grid container sx={{ pt: 1, gap: 2 }}>
                    <TextField fullWidth label="Recipe Name" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Box sx={{ width: '100%' }}>
                        <Typography>Ingredients:</Typography>
                        <List sx={{ width: '100%' }}>
                            {ingredients.map((ingredient, index) => (
                                <Ingredient
                                    key={ingredient}
                                    ingredient={ingredient}
                                    save={handleSaveIngredient(index)}
                                    setIsEditingIngredient={setIsEditingIngredient}
                                />
                            ))}
                            {isAddingIngredient && <Ingredient ingredient="" save={handleSaveIngredient(-1)} isNew />}
                        </List>
                        <Button variant="contained" color="success" onClick={handleAddIngredient}>
                            Add Ingredient
                        </Button>
                    </Box>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="error" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="contained" color="success" onClick={handleSave} disabled={isSaveDisabled}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditPopup;
