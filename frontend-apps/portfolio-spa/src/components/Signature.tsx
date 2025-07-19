import { Box, Toolbar, Typography } from '@mui/material';

const Signature = () => (
    <Toolbar sx={{ justifyContent: 'center', gap: 0.5, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 'inherit' }}>
            <Typography>Coded by</Typography>
            <Typography
                component="a"
                fontWeight={700}
                href="https://www.achipapakon.com"
                target="_blank"
                rel="noopener"
                sx={{
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
                }}
            >
                Achilleas Papakonstantinou
            </Typography>
        </Box>
        <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>|</Typography>
        <Typography>Copyright © 2016-{new Date().getFullYear()}</Typography>
    </Toolbar>
);

export default Signature;
