import { Box, styled, Typography } from '@mui/material';

const Title = styled(Typography)({
    fontWeight: 700,
    textAlign: 'center',
});

const Paragraph = styled(Typography)({
    textAlign: 'justify',
    fontSize: '17px',
    fontWeight: 700,
    lineHeight: '30.6px',
    backgroundColor: 'rgba(235,235,235,0.4)',
    marginBottom: '16px',
});

const Info = () => (
    <Box sx={{ pt: '40px' }}>
        <Box
            sx={{
                ml: { xs: '15px', sm: '10%' },
                mr: { xs: '15px', sm: '40%' },
                position: 'relative',
                animationFillMode: 'forwards',
                transitionTimingFunction: 'linear',
                animationDuration: '2s',
                opacity: 0,
                animationName: 'left-block',
                '@keyframes left-block': {
                    '0%': {
                        left: '150px',
                    },
                    '100%': {
                        left: 0,
                        opacity: 1,
                    },
                },
            }}
        >
            <Title variant="h4">Lorem ipsum</Title>
            <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus ligula id risus consectetur, id
                facilisis metus congue. Phasellus faucibus imperdiet turpis vitae pellentesque. Donec consectetur sit
                amet mi quis tempus. Nulla facilisis est in lacus vulputate finibus id eget urna. Donec aliquam id magna
                eget lacinia. Fusce cursus viverra ipsum vitae rhoncus. Sed viverra lacus in justo ultricies, vel
                pharetra augue porta. Praesent massa risus, eleifend dictum porttitor non, interdum in est. Mauris
                tempor hendrerit rutrum. Etiam eget dui tellus. Curabitur in elit nec odio volutpat interdum. Nulla
                facilisi. Integer gravida auctor risus commodo ultrices. Etiam elementum massa nisl, non scelerisque ex
                hendrerit a. Curabitur quis mi id nibh dignissim convallis sed nec tortor. Ut imperdiet.
            </Paragraph>
        </Box>
        <Box
            sx={{
                ml: { xs: '15px', sm: '40%' },
                mr: { xs: '15px', sm: '10%' },
                position: 'relative',
                animationFillMode: 'forwards',
                transitionTimingFunction: 'linear',
                animationDuration: '2s',
                opacity: 0,
                animationName: 'right-block',
                '@keyframes right-block': {
                    '0%': {
                        right: '150px',
                    },
                    '100%': {
                        right: 0,
                        opacity: 1,
                    },
                },
            }}
        >
            <Title variant="h4">Lorem ipsum</Title>
            <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultrices nec neque ac rutrum.
                Pellentesque ut porttitor nulla. Sed aliquet neque sed ipsum facilisis commodo. Donec nec varius massa.
                Vivamus non turpis ut arcu vehicula maximus at ut nisi. Vestibulum quis condimentum nisi, vitae euismod
                nisi. Vestibulum quis elit laoreet, tristique arcu id, tempor lectus. Cras pharetra tristique laoreet.
                Ut vehicula ut tellus sollicitudin egestas. Praesent lobortis velit sit amet luctus vulputate. In
                efficitur, neque sed facilisis ornare, metus leo sollicitudin mauris, nec imperdiet nibh sem gravida
                orci. Etiam libero diam, mollis eu est in, suscipit viverra neque. Mauris porttitor, augue vitae pretium
                pulvinar, est diam laoreet massa.
            </Paragraph>
        </Box>
    </Box>
);

export default Info;
