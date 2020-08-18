import React from "react";
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
        display: 'flex',
        flexGrow: 1,
        alignContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        textAlign: 'center'
    }
}));

function getImageUrl(card, feed){
    let url = "";

    if(card["media:content"] && card["media:content"]["@url"]){
        url = card["media:content"]["@url"];
    } else if(card["media:group"] && card["media:group"]["media:content"] && card["media:group"]["media:content"][1]["@url"]){
        url = card["media:group"]["media:content"][1]["@url"];
    } else {
        if(feed.image && feed.image.url){
            url = feed.image.url;
        }
    }

    return url;
}

export default function NewsTiles(props) {
    const classes = useStyles();

    return props.rss.length > 0 ? (
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
                                        image={getImageUrl(card, this)}
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
    ) : (
        <Grid container justify="center">
            <CircularProgress/>
        </Grid>
    );

}