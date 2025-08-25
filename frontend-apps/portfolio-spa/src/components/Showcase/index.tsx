import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Paper, Stack, styled, Typography } from '@mui/material';
import FreeCodeCampIcon from './free-code-camp.svg?react';
import profilePic from './profile-pic.jpg';
import IconButtonLink from '../IconButtonLink';
import { dancingScript, whiteUnderlineSx } from '../../css/generic';
import calculatorImg from './thumbnails/calculator.png';
import localWeatherImg from './thumbnails/local-weather.png';
import pomodoroClockImg from './thumbnails/pomodoro-clock.png';
import ticTacToeImg from './thumbnails/tic-tac-toe.png';
import simonGameImg from './thumbnails/simon-game.png';
import fibonacciClockImg from './thumbnails/fibonacci-clock.png';
import fridgeAppImg from './thumbnails/fridge-app.png';
import gameOfLifeImg from './thumbnails/game-of-life.png';

interface ShowcaseItem {
    relativeUrl: string;
    img: string;
    title: string;
    newTab?: boolean;
}

const showcaseItems: ShowcaseItem[] = [
    {
        relativeUrl: '/portfolio/game-of-life',
        img: gameOfLifeImg,
        title: 'Game of Life',
    },
    {
        relativeUrl: '/portfolio/fridge-app',
        img: fridgeAppImg,
        title: 'Fridge App',
    },
    {
        relativeUrl: '/portfolio/fibonacci-clock',
        img: fibonacciClockImg,
        title: 'Fibonacci Clock',
    },
    {
        relativeUrl: '/portfolio/simon-game',
        img: simonGameImg,
        title: 'Simon Game',
    },
    {
        relativeUrl: '/portfolio/tic-tac-toe',
        img: ticTacToeImg,
        title: 'Tic Tac Toe',
    },
    {
        relativeUrl: '/portfolio/pomodoro-clock',
        img: pomodoroClockImg,
        title: 'Pomodoro Clock',
    },
    {
        relativeUrl: '/portfolio/calculator',
        img: calculatorImg,
        title: 'Calculator',
    },
    {
        relativeUrl: '/portfolio/local-weather',
        img: localWeatherImg,
        title: 'Local Weather',
    },
];

const Section = styled(Box)({
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
});

const textShadow: string = '2px 2px 2px #323232';

const NameTitle = ({ children }: { children: React.ReactNode }) => (
    <Typography
        variant="h1"
        color="secondary"
        sx={{ fontWeight: 400, fontSize: { xs: '10vw', sm: '8vw' }, textShadow }}
    >
        {children}
    </Typography>
);

const Showcase = () => (
    <>
        <Section
            id="home"
            sx={{
                backgroundImage: 'url(/background/acropolis.jpg)',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <Box sx={{ textAlign: 'center' }}>
                <NameTitle>Achilleas</NameTitle>
                <NameTitle>Papakonstantinou</NameTitle>
                <Typography
                    variant="h3"
                    color="secondary"
                    fontFamily={dancingScript}
                    sx={{ fontSize: { xs: '8vw', sm: '4.5vw' }, textShadow }}
                >
                    My personal portfolio page.
                </Typography>
                <Box component="hr" sx={{ borderColor: 'secondary.main', textShadow }} />
            </Box>
        </Section>
        <Section
            id="about"
            sx={{
                backgroundImage: 'url(/background/nice.jpg)',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    maxWidth: '1200px',
                    mt: { xs: '100px', sm: '100px', md: 'initial' },
                    gridTemplateColumns: { xs: '350px', sm: '350px', md: '350px 1fr' },
                    gap: { xs: '50px', sm: '50px', md: '200px' },
                }}
            >
                <Box sx={{ display: 'grid', gap: 2, order: { xs: 1, sm: 1, md: 0 } }}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h2" textAlign="center" fontFamily="Dancing Script, cursive">
                            About me
                        </Typography>
                    </Paper>
                    <Paper sx={{ p: 3 }}>
                        <Typography>
                            I am a Fullstack Developer since 2017 and I&apos;m currently based in Nice, France.
                        </Typography>
                        <Typography>I have built this website using:</Typography>
                        <Typography>Frontend:</Typography>
                        <ul>
                            <Typography component="li">React</Typography>
                            <Typography component="li">Material UI (MUI)</Typography>
                            <Typography component="li">TypeScript</Typography>
                            <Typography component="li">Vite</Typography>
                        </ul>
                        <Typography>Backend:</Typography>
                        <ul>
                            <Typography component="li">NestJS</Typography>
                            <Typography component="li">Vite</Typography>
                            <Typography component="li">MySQL</Typography>
                            <Typography component="li">Nginx</Typography>
                            <Typography component="li">Ubuntu</Typography>
                        </ul>
                    </Paper>
                </Box>
                <Box
                    component="img"
                    src={profilePic}
                    sx={{ borderRadius: '50%', marginLeft: 'auto', marginRight: 'auto' }}
                />
            </Box>
        </Section>
        <Section
            id="portfolio"
            sx={{
                backgroundImage: 'url(/background/library.jpg)',
                justifyContent: 'center',
                minHeight: '100vh',
                py: 10,
            }}
        >
            <Stack spacing={1} sx={{ width: '1000px' }}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h2" component="div" textAlign="center" fontFamily="Dancing Script, cursive">
                        <Box>My web development portfolio</Box>
                        <Box>(NestJS/React)</Box>
                    </Typography>
                </Paper>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 1,
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        justifyItems: 'center',
                    }}
                >
                    {showcaseItems.map(({ relativeUrl, img, title }) => (
                        <Box
                            key={title}
                            component="a"
                            href={relativeUrl}
                            sx={{
                                width: '300px',
                                height: '385px',
                                p: 0.5,
                                backgroundColor: 'black',
                                border: '1px solid white',
                                borderRadius: '4px',
                                textAlign: 'center',
                                ...whiteUnderlineSx,
                            }}
                        >
                            <Stack justifyContent="space-between" height="100%">
                                <Box
                                    component="img"
                                    src={img}
                                    sx={{
                                        height: 'calc(100% - 24px)',
                                        width: '100%',
                                        objectFit: 'contain',
                                    }}
                                />
                                <Typography color="secondary">{title}</Typography>
                            </Stack>
                        </Box>
                    ))}
                </Box>
            </Stack>
        </Section>
        <Section id="contact" sx={{ backgroundImage: 'url(/background/contact.jpg)', minHeight: '410px' }}>
            <Box sx={{ marginLeft: '10%', display: 'grid', gap: 1 }}>
                <Typography variant="h2" color="secondary" fontFamily="Dancing Script, cursive">
                    Contact me
                </Typography>
                <IconButtonLink
                    href="https://www.linkedin.com/in/achilleas-papakonstantinou-aa6447113/"
                    sx={{ color: '#007bb5', backgroundColor: 'secondary.main' }}
                >
                    <LinkedInIcon style={{ width: 45, height: 45 }} />
                </IconButtonLink>
                <Typography color="secondary">Papakonstantinou.Achilleas (at) gmail.com</Typography>
                <Box component="hr" width="100%" />
                <Typography color="secondary">Bonus Portfolio:</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButtonLink
                        href="https://github.com/AchiPapakon?tab=repositories&type=source"
                        sx={{ color: '#24292e', backgroundColor: 'secondary.main' }}
                    >
                        <GitHubIcon style={{ width: 30, height: 30 }} />
                    </IconButtonLink>
                    <IconButtonLink
                        href="https://www.freecodecamp.org/achipapakon"
                        sx={{ backgroundColor: 'secondary.main' }}
                    >
                        <FreeCodeCampIcon fill="#006400" width="42" height="42" />
                    </IconButtonLink>
                </Box>
            </Box>
        </Section>
    </>
);

export default Showcase;
