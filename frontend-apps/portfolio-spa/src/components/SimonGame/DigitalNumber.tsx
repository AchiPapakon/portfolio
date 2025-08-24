import { Box, type SxProps } from '@mui/material';
import type { DigitalNumberProps } from './types';

const LED_COLOR = '#bada55';

interface SectionProps {
    sx: SxProps;
}

interface ContainerProps {
    children?: React.ReactNode;
}

const Section = ({ sx = {} }: SectionProps) => (
    <Box
        sx={{
            position: 'absolute',
            border: '5.1px solid transparent',
            ...sx,
        }}
    />
);

const Container = ({ children }: ContainerProps) => (
    <div>
        <Box
            sx={{
                position: 'absolute',
                width: '30px',
                height: '60px',
                background: '#444',
                borderRadius: '3px',
            }}
        >
            {children}
        </Box>
    </div>
);

const Top = () => (
    <Section
        sx={{
            top: '1.2px',
            left: '1.8px',
            width: '26.4px',
            height: 0,
            borderTopColor: LED_COLOR,
        }}
    />
);

const TopRight = () => (
    <Section
        sx={{
            top: '1.8px',
            right: '1.2px',
            width: 0,
            height: '27px',
            borderBottomWidth: '3px',
            borderRightColor: '#bada55',
        }}
    />
);

const TopLeft = () => (
    <Section
        sx={{
            top: '1.8px',
            left: '1.2px',
            width: 0,
            height: '27px',
            borderBottomWidth: '3px',
            borderLeftColor: '#bada55',
        }}
    />
);

const Middle = () => (
    <Box
        sx={{
            ':before': {
                boxSizing: 'border-box',
                content: '""',
                display: 'block',
                position: 'absolute',
                top: '24px',
                left: '1.2px',
                width: '27.6px',
                border: '3px solid transparent',
                borderLeftWidth: '5.1px',
                borderRightWidth: '5.1px',
                borderBottomColor: '#bada55',
            },
            ':after': {
                boxSizing: 'border-box',
                content: '""',
                display: 'block',
                position: 'absolute',
                top: '30px',
                left: '1.2px',
                width: '27.6px',
                border: '3px solid transparent',
                borderLeftWidth: '5.1px',
                borderRightWidth: '5.1px',
                borderTopColor: '#bada55',
            },
        }}
    />
);

const BottomRight = () => (
    <Section
        sx={{
            bottom: '1.8px',
            right: '1.2px',
            width: 0,
            height: '27px',
            borderTopWidth: '3px',
            borderRightColor: '#bada55',
        }}
    />
);

const BottomLeft = () => (
    <Section
        sx={{
            bottom: '1.8px',
            left: '1.2px',
            width: 0,
            height: '27px',
            borderTopWidth: '3px',
            borderLeftColor: '#bada55',
        }}
    />
);

const Bottom = () => (
    <Section
        sx={{
            bottom: '1.2px',
            left: '1.8px',
            width: '26.4px',
            height: 0,
            borderBottomColor: '#bada55',
        }}
    />
);

const DigitalNumber = ({ number = 0 }: DigitalNumberProps) => {
    switch (number) {
        case 0:
            return (
                <Container>
                    <TopLeft />
                    <Top />
                    <TopRight />
                    <BottomLeft />
                    <BottomRight />
                    <Bottom />
                </Container>
            );
        case 1:
            return (
                <Container>
                    <TopRight />
                    <BottomRight />
                </Container>
            );
        case 2:
            return (
                <Container>
                    <Top />
                    <TopRight />
                    <Middle />
                    <BottomLeft />
                    <Bottom />
                </Container>
            );
        case 3:
            return (
                <Container>
                    <Top />
                    <TopRight />
                    <Middle />
                    <BottomRight />
                    <Bottom />
                </Container>
            );
        case 4:
            return (
                <Container>
                    <TopLeft />
                    <TopRight />
                    <Middle />
                    <BottomRight />
                </Container>
            );
        case 5:
            return (
                <Container>
                    <TopLeft />
                    <Top />
                    <Middle />
                    <BottomRight />
                    <Bottom />
                </Container>
            );
        case 6:
            return (
                <Container>
                    <TopLeft />
                    <Top />
                    <Middle />
                    <BottomLeft />
                    <BottomRight />
                    <Bottom />
                </Container>
            );
        case 7:
            return (
                <Container>
                    <Top />
                    <TopRight />
                    <BottomRight />
                </Container>
            );
        case 8:
            return (
                <Container>
                    <TopLeft />
                    <Top />
                    <TopRight />
                    <Middle />
                    <BottomLeft />
                    <BottomRight />
                    <Bottom />
                </Container>
            );
        case 9:
            return (
                <Container>
                    <TopLeft />
                    <Top />
                    <TopRight />
                    <Middle />
                    <BottomRight />
                    <Bottom />
                </Container>
            );

        default:
            break;
    }

    return <Container />;
};

export default DigitalNumber;
