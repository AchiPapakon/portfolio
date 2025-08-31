const hoverEffect = {
    '&::before, &::after': {
        display: 'inline-block',
        opacity: 0,
        transition: 'transform 0.3s, opacity 0.2s',
    },
    '&::before': {
        marginRight: '10px',
        content: '"["',
        transform: 'translateX(20px)',
    },
    '&::after': {
        marginLeft: '10px',
        content: '"]"',
        transform: 'translateX(-20px)',
    },
    '&:hover::before, &:hover::after, &:focus::before, &:focus::after': {
        opacity: 1,
        transform: 'translateX(0px)',
    },
};

export default hoverEffect;
