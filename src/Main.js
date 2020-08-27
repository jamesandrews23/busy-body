import NewsTiles from './NewsTiles';
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import RssFeedIcon from '@material-ui/icons/RssFeed';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import SortBySelect from './SortBySelect';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import axios from "axios";
import convertXmlToJson from "./Parser";
import {getProxy} from "./FeedFeeder";
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Alert from '@material-ui/lab/Alert';

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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    add: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(3)
    },
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));



export default function Main(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("An error has occurred. Please try again later");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e) => {
        setOpen(false);
    };

    const subscribe = () => {
        let url = document.getElementById('name').value;
        if(url){
            const instance = axios.create();
            instance.defaults.timeout = 10000;
            // Add a request interceptor
            instance.interceptors.request.use(function (config) {
                setLoading(true);
                return config;
            }, function (error) {
                // Do something with request error
                setLoading(false);
                setOpen(false);
                return Promise.reject(error);
            });

            // Add a response interceptor
            instance.interceptors.response.use(function (response) {
                setLoading(false);
                setOpen(false);
                return response;
            }, function (error) {
                // Any status codes that falls outside the range of 2xx cause this function to trigger
                // Do something with response error
                setLoading(false);
                setOpen(false);
                return Promise.reject(error);
            });

            instance.get(getProxy() + encodeURI(url))
                .then(response => {
                    if(response.data){
                        try {
                            let convertedFeed = convertXmlToJson(response.data);
                            if(convertedFeed && convertedFeed["channel"]){
                                props.addFeed(convertedFeed["channel"]);
                            } else {
                                setError(true);
                                setErrorMsg("Failed to load RSS Feed: " + url);
                            }
                        } catch(error){
                            setError(true);
                            setErrorMsg("Failed to load RSS Feed: " + url);
                        }
                    }
                })
                .catch(error => {
                    setError(true);
                    setErrorMsg("Failed to load RSS Feed: " + url);
                });
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="sticky">
                <Toolbar>
                    <RssFeedIcon/>
                    <Typography variant="h6" color="inherit" noWrap>
                        RSS
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={props.search}
                        />
                    </div>
                    <SortBySelect titles={props.titles} sort={props.sort} />
                </Toolbar>
            </AppBar>

            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Daily Feeds
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Are you a busy body when it comes to news? Take a gander at all these articles from various RSS feeds.
                            You can search for feeds in the search bar or sort by your favorite feeds.
                        </Typography>
                    </Container>
                </div>
                {error && errorMsg && <Alert severity="error" onClose={() => setError(false)}>{errorMsg}</Alert>}
                <Tooltip title="Add RSS Feed">
                    <Fab color="secondary" aria-label="add" className={classes.add} onClick={handleClickOpen}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
                <NewsTiles rss={props.rss} error={props.error} />
            </main>
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to an RSS feed please enter the URL here.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="RSS Feed"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <div className={classes.wrapper}>
                            <Button onClick={subscribe} color="primary" disabled={loading}>
                                Subscribe
                            </Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        </React.Fragment>
    );
}