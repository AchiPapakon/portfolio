import { useState } from 'react';
import { IconButton, ListItem, TextField } from '@mui/material';
import { Check as CheckIcon, Circle as CircleIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

interface IngredientProps {
    ingredient: string;
    save: (newIngredient: string) => void;
    isNew?: boolean;
    setIsEditingIngredient?: (isEditing: boolean) => void;
}

const Ingredient = ({ ingredient: ingredientProp, setIsEditingIngredient, save, isNew = false }: IngredientProps) => {
    const [isEditing, setIsEditing] = useState(isNew);
    const [ingredient, setIngredient] = useState(ingredientProp);

    const handleEditIngredient = () => {
        setIsEditing(true);

        if (setIsEditingIngredient) {
            setIsEditingIngredient(true);
        }
    };

    const handleSaveIngredient = () => {
        if (ingredient.trim().length > 0 && ingredient.trim().length <= 35) {
            save(ingredient);
        }
        setIsEditing(false);

        if (setIsEditingIngredient) {
            setIsEditingIngredient(false);
        }
    };

    const handleDeleteIngredient = () => {
        save('');
    };

    const handleChangeIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIngredient(e.target.value);
    };

    return (
        <ListItem
            disableGutters
            secondaryAction={
                <>
                    {isEditing && (
                        <IconButton color="error">
                            <DeleteIcon onClick={handleDeleteIngredient} />
                        </IconButton>
                    )}
                    {isEditing ? (
                        <IconButton
                            onClick={handleSaveIngredient}
                            disabled={!(ingredient.trim().length > 0 && ingredient.trim().length <= 35)}
                            color="success"
                        >
                            <CheckIcon />
                        </IconButton>
                    ) : (
                        <IconButton onClick={handleEditIngredient}>
                            <EditIcon />
                        </IconButton>
                    )}
                </>
            }
            sx={{ gap: 1 }}
        >
            <CircleIcon sx={{ width: 8, height: 8 }} />
            {isEditing ? (
                <TextField
                    variant="standard"
                    value={ingredient}
                    onChange={handleChangeIngredient}
                    error={!ingredient.trim()}
                    slotProps={{
                        htmlInput: {
                            maxLength: 35,
                        },
                    }}
                    sx={{ width: 'calc(100% - 55px)' }}
                />
            ) : (
                ingredient
            )}
        </ListItem>
    );
};

export default Ingredient;
