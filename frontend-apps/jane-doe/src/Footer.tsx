import { Box, Grid, styled, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const SocialTableCell = styled(TableCell)({
    borderBottom: 'none',
    padding: '5px 10px 5px 5px',
    fontSize: 16,
    fontWeight: 700,
});

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#a56f3ba1' }}>
            <Box sx={{ mx: 'auto', px: { xs: 0, sm: '7%' } }}>
                <Grid container>
                    <Grid size={{ xs: 12, sm: 4 }} pt="45px" pb="10px">
                        <Typography component="div" sx={{ fontWeight: 700, textAlign: 'center' }}>
                            <AccessTimeIcon sx={{ fontSize: '3em' }} />
                            <Typography variant="h5" fontWeight={700} fontSize="28px">
                                Timetable
                            </Typography>
                            <p>
                                Monday - Friday
                                <br />
                                9:00 - 19:00
                                <br />
                                Saturday
                                <br />
                                9:00 - 14:00
                            </p>
                        </Typography>
                    </Grid>
                    <Grid
                        size={{ xs: 12, sm: 4 }}
                        sx={{
                            px: { xs: '15px', sm: 0 },
                            py: { xs: 0, sm: '15px' },
                            my: 'auto',
                        }}
                    >
                        <Box
                            component="iframe"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d913.6677041699213!2d22.400273637765334!3d39.622709684588166!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135888991d42f6d7%3A0x67ce43d500a3e748!2sMunicipal+Gallery!5e0!3m2!1sen!2sgr!4v1524212071176"
                            width="100%"
                            sx={{ border: 0, aspectRatio: '4/3' }}
                            allowFullScreen
                            loading="lazy"
                            title="map location"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }} sx={{ p: '45px 15px 10px' }}>
                        <Table
                            sx={{
                                width: 'min-content',
                                mx: 'auto',
                            }}
                        >
                            <TableBody
                                sx={{
                                    '>tr': {
                                        borderBottom: '1px solid',
                                        borderBottomColor: 'secondary.main',
                                    },
                                    '>tr:last-child': {
                                        borderBottom: 'none',
                                    },
                                }}
                            >
                                <TableRow>
                                    <SocialTableCell>
                                        <FacebookIcon fontSize="large" />
                                    </SocialTableCell>
                                    <SocialTableCell>facebook</SocialTableCell>
                                </TableRow>
                                <TableRow>
                                    <SocialTableCell>
                                        <InstagramIcon fontSize="large" />
                                    </SocialTableCell>
                                    <SocialTableCell>Instagram</SocialTableCell>
                                </TableRow>
                                <TableRow>
                                    <SocialTableCell>
                                        <YouTubeIcon fontSize="large" />
                                    </SocialTableCell>
                                    <SocialTableCell>YouTube</SocialTableCell>
                                </TableRow>
                                <TableRow>
                                    <SocialTableCell>
                                        <PhoneIcon fontSize="large" />
                                    </SocialTableCell>
                                    <SocialTableCell>1231325464</SocialTableCell>
                                </TableRow>
                                <TableRow>
                                    <SocialTableCell>
                                        <EmailIcon fontSize="large" />
                                    </SocialTableCell>
                                    <SocialTableCell>dummy@dummy.com</SocialTableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Footer;
