export const dancingScript = 'Dancing Script, cursive';

export const whiteUnderlineSx = {
    color: 'secondary.main',
    textDecoration: 'none',
    '&:hover': {
        color: 'secondary.main',
    },
    '&:after': {
        display: 'block',
        content: '""',
        borderBottom: 'solid 1px #fff',
        transform: 'scaleX(0)',
        transition: 'transform 250ms ease-in-out',
    },
    '&:hover:after': {
        transform: 'scaleX(1)',
    },
};
