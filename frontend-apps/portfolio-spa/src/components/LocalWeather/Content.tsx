import { CircularProgress, Typography } from '@mui/material';

interface Props {
    children: React.ReactNode;
    error: string;
    isFetching: boolean;
}

const Content = ({ children, error, isFetching }: Props) => {
    if (isFetching) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography>{error}</Typography>;
    }

    return children;
};

export default Content;
