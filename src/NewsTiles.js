import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CardHeader from "@material-ui/core/CardHeader";
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import Alert from '@material-ui/lab/Alert';
import {paginate, getPageCount, getElementsPerPage} from './Paginate';
import Link from "@material-ui/core/Link";
import Grow from '@material-ui/core/Grow';


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
    loading: {
        marginTop: '50px'
    },
    margin: {
        marginTop: '100px',
        marginBottom: '100px'
    }
}));

function getImageUrl(card){
    let url = "";

    if(card["media:content"] && card["media:content"]["@url"]){
        url = card["media:content"]["@url"];
    } else if(card["media:group"] && card["media:group"]["media:content"] && card["media:group"]["media:content"][1]["@url"]){
        url = card["media:group"]["media:content"][1]["@url"];
    } else {
        if(card.rssImage && card.rssImage.url){
            url = card.rssImage.url;
        }
    }

    return url;
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                busyBodyFeeder.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Footer(){
    let classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
                Busy Body RSS Feeder
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Thanks for checking out the site
            </Typography>
            <Copyright />
        </footer>
    )
}

export default function NewsTiles(props) {
    const classes = useStyles();
    const pageCount = getPageCount(props.rss.length);
    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const pages = paginate(props.rss, getElementsPerPage(), page);

    return props.rss.length > 0 && !props.error ? (
        <div>
            <Container className={classes.cardGrid} maxWidth="lg">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {pages.map((card, index, list) => (
                        <Grow in={true}>
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
                                        title={card && card.rssTitle ? card.rssTitle : ""}
                                        subheader={card && card.pubDate ? card.pubDate : ""}
                                    />
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={getImageUrl(card)}
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
                        </Grow>
                    ))}
                </Grid>
                <Grid container justify="center">
                    <div className={classes.root} style={{marginBottom: "50px", marginTop: "150px"}}>
                        <Pagination count={pageCount} color="secondary" onChange={handleChange} />
                    </div>
                </Grid>
            </Container>
            <Footer />
        </div>
    ) : !props.error ? (
        <Grid container justify="center">
            <CircularProgress className={classes.loading}/>
        </Grid>
    ) : (
        <div>
            <Grid container justify="center">
                <Alert severity="error" className={classes.margin}>Unable to load rss feeds. Please try again later.</Alert>
            </Grid>
            <Footer />
        </div>
    );
}