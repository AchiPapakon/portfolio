export const whiteUnderlineSx = ({
    color = 'secondary.main',
    underlineColor = '#fff',
}: {
    color?: string;
    underlineColor?: string;
} = {}) => ({
    color,
    textDecoration: 'none',
    '&:hover': {
        color,
    },
    '&:after': {
        display: 'block',
        content: '""',
        borderBottom: `solid 1px ${underlineColor}`,
        transform: 'scaleX(0)',
        transition: 'transform 250ms ease-in-out',
    },
    '&:hover:after': {
        transform: 'scaleX(1)',
    },
});
