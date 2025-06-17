import { CircularProgress } from '@mui/material';
import { translate } from '../../helpers/translation';
import EmptyContainer from '../styled/EmptyContainer';

const Results = ({
    fetching = false,
    hasSelectedStation = false,
    hasStationDetails = false,
}: {
    fetching: boolean;
    hasSelectedStation: boolean;
    hasStationDetails: boolean;
}) => {
    if (fetching) {
        return (
            <EmptyContainer>
                <CircularProgress />
            </EmptyContainer>
        );
    }

    if (!fetching && !hasSelectedStation) {
        return <EmptyContainer>{translate('noStationSelected')}</EmptyContainer>;
    }

    if (!fetching && !hasStationDetails) {
        return <EmptyContainer>{translate('noDepartures')}</EmptyContainer>;
    }

    return null;
};

export default Results;
