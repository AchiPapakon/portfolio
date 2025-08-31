import { Box, Grid, styled, Typography } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const SocialText = styled(Typography)({
    fontSize: '19px',
});

const ContactItem = styled(Grid)({
    position: 'relative',
    animationName: 'contact-item',
    animationFillMode: 'forwards',
    transitionTimingFunction: 'linear',
    animationDuration: '1s',
    animationDelay: '0.5s',
    opacity: 0,
    '@keyframes contact-item': {
        '0%': {
            top: 500,
        },
        '50%': {
            top: 0,
            bottom: 10,
        },
        '75%': {
            top: 10,
        },
        '100%': {
            top: 0,
            opacity: 1,
        },
    },
});

const bigIcon = {
    width: 50,
    height: 50,
};

const Contact = () => (
    <Box
        sx={{
            mx: { xs: 0, sm: '7%' },
        }}
    >
        <Box sx={{ textAlign: 'center', mt: '100px' }}>
            <Typography
                variant="h2"
                sx={{
                    fontSize: 55,
                    animationName: 'title',
                    animationDuration: '2s',
                    '@keyframes title': {
                        '0%': {
                            fontSize: 55,
                        },
                        '50%': {
                            fontSize: 58,
                        },
                        '100%': {
                            fontSize: 55,
                        },
                    },
                }}
            >
                Lorem ipsum dolor sit
            </Typography>
            <Box
                sx={{
                    animationName: 'fade-in',
                    animationDuration: '3s',
                    transitionTimingFunction: 'ease-in',
                    '@keyframes fade-in': {
                        '0%': {
                            opacity: 0,
                        },
                        '25%': {
                            opacity: 0,
                        },
                        '100%': {
                            opacity: 1,
                        },
                    },
                }}
            >
                <ArrowRightIcon sx={bigIcon} />
                <Typography fontSize={24}>
                    Lorem ipsum dolor sit amet
                    <br />
                    Lorem ipsum dolor sit amet, consectetur.
                </Typography>
            </Box>
        </Box>
        <Grid container spacing={2} sx={{ textAlign: 'center', fontSize: '19px', mt: '120px', mb: 3 }}>
            <ContactItem size={{ xs: 12, sm: 3 }}>
                <FacebookIcon sx={bigIcon} />
                <InstagramIcon sx={bigIcon} />
            </ContactItem>
            <ContactItem size={{ xs: 12, sm: 3 }} sx={{ animationDelay: '0.7s' }}>
                <BusinessIcon sx={bigIcon} />
                <SocialText>
                    Address 1<br />
                    Address 2
                </SocialText>
            </ContactItem>
            <ContactItem size={{ xs: 12, sm: 3 }} sx={{ animationDelay: '0.9s' }}>
                <EmailIcon sx={bigIcon} />
                <SocialText sx={{ wordWrap: 'break-word' }}>dummydummy@dummy.com</SocialText>
            </ContactItem>
            <ContactItem size={{ xs: 12, sm: 3 }} sx={{ animationDelay: '1.1s' }}>
                <PhoneIcon sx={bigIcon} />
                <SocialText>(+99) 999 999999</SocialText>
            </ContactItem>
        </Grid>
    </Box>
);

export default Contact;
