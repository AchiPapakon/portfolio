import { Typography } from '@mui/material';
import ShowcaseContainer from '../ShowcaseContainer';

const Error404 = () => {
    return (
        <ShowcaseContainer sx={{ mt: 1 }}>
            <Typography variant="h4">Error 404</Typography>
            <Typography variant="h5">Oops, wrong page.</Typography>
        </ShowcaseContainer>
    );
};

export default Error404;
