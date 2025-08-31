import { Box, Divider, Typography } from '@mui/material';

const Home = () => (
    <Box sx={{ height: 750, textAlign: 'center' }}>
        <Typography
            variant="h2"
            sx={{
                fontSize: '4.3em',
                textAlign: 'center',
                position: 'relative',
                top: 170,
                animationName: 'animate-title',
                animationDuration: '2s',
                '@keyframes animate-title': {
                    '0%': {
                        opacity: 0,
                        top: 70,
                    },
                    '100%': {
                        opacity: 1,
                        top: 170,
                    },
                },
            }}
        >
            Jane
            <br />
            Doe
        </Typography>
        <Divider
            sx={{
                maxWidth: 400,
                borderTop: '1px solid',
                borderTopColor: 'secondary.main',
                position: 'relative',
                top: 160,
                mx: 'auto',
                my: '1rem',
                animationName: 'animate-divider',
                animationDuration: '2s',
                '@keyframes animate-divider': {
                    '0%': {
                        opacity: 0,
                    },
                    '100%': {
                        opacity: 1,
                    },
                },
            }}
        />
        <Typography
            variant="h4"
            sx={{
                textAlign: 'center',
                position: 'relative',
                top: 150,
                fontWeight: 700,
                animationName: 'animate-subtitle',
                animationDuration: '2s',
                '@keyframes animate-subtitle': {
                    '0%': {
                        opacity: 0,
                        top: 250,
                    },
                    '100%': {
                        opacity: 1,
                        top: 150,
                    },
                },
            }}
        >
            Lorem ipsum dolor. <br />
            Lorem ipsum dolor sit amet, consectetur. <br />
            Lorem ipsum dolor sit amet, consectetur.
        </Typography>
    </Box>
);

export default Home;
