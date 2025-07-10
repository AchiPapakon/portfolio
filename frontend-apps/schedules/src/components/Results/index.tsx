import { CircularProgress } from '@mui/material';
import { translate } from '../../helpers/translation';
import EmptyContainer from '../styled/EmptyContainer';
import { useSelector } from '../../redux/hooks';
import { nearbyStationErrorSelector } from '../../redux/stations/selectors';

const Results = ({
    fetching = false,
    hasSelectedStation = false,
    hasStationDetails = false,
}: {
    fetching: boolean;
    hasSelectedStation: boolean;
    hasStationDetails: boolean;
}) => {
    const nearbyStationError = useSelector(nearbyStationErrorSelector);

    if (fetching) {
        return (
            <EmptyContainer>
                <CircularProgress />
            </EmptyContainer>
        );
    }

    if (nearbyStationError) {
        return <EmptyContainer>{translate('nearbyStationError')}</EmptyContainer>;
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
