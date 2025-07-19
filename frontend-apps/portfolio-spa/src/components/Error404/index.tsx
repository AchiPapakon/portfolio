import { Box, Typography } from '@mui/material';

const Error404 = () => {
    return (
        <Box sx={{ display: 'grid', flex: 1, justifyItems: 'center', mt: 1 }}>
            <Box>
                <Typography variant="h4">Error 404</Typography>
                <Typography variant="h5">Oops, wrong page.</Typography>
            </Box>
        </Box>
    );
};

export default Error404;
