import { Button, styled } from '@mui/material';
import hoverEffect from './hoverEffect';

const HoverButton = styled(Button)(({ theme }) => ({
    color: theme.palette.secondary.main,
    ...hoverEffect,
}));

export default HoverButton;
