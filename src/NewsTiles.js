import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import CardHeader from "@material-ui/core/CardHeader";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function NewsTiles(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <CameraIcon className={classes.icon}/>
                    <Typography variant="h6" color="inherit" noWrap>
                        Album layout
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Album layout
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Something short and leading about the collection below—its contents, the creator, etc.
                            Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                            entirely.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Main call to action
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Secondary action
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="lg">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {props.rss.length > 0 && props.rss.map((rssFeed, index, list) => (
                            rssFeed && rssFeed.item.length > 0 && rssFeed.item.map(function(card, index, list){
                                return (
                                    <Grid item key={index} xs={12} sm={6} md={4}>
                                        <Card className={classes.card}>
                                            <CardHeader
                                                // avatar={
                                                //     <Avatar aria-label="recipe" className={classes.avatar}>
                                                //         R
                                                //     </Avatar>
                                                // }
                                                // action={
                                                //     <IconButton aria-label="settings">
                                                //         <MoreVertIcon />
                                                //     </IconButton>
                                                // }
                                                title={this.title}
                                                subheader={card.pubDate}
                                            />
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={card["media:group"] && card["media:group"]["media:content"] && card["media:group"]["media:content"][1]["@url"]}
                                                title="Image title"
                                            />
                                            <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {card.title}
                                                </Typography>
                                                <Typography>
                                                    {card.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary" onClick={() => {
                                                    window.location = card.link
                                                }}>
                                                    View
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )
                            }, rssFeed)
                        ))
                        }
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}