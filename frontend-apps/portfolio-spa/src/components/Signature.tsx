import { Box, Toolbar, Typography } from '@mui/material';
import { whiteUnderlineSx } from '../css/generic';

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
                sx={whiteUnderlineSx}
            >
                Achilleas Papakonstantinou
            </Typography>
        </Box>
        <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>|</Typography>
        <Typography>Copyright © 2016-{new Date().getFullYear()}</Typography>
    </Toolbar>
);

export default Signature;
