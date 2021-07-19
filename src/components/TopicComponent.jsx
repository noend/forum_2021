import React, {useEffect, useState} from 'react';
import useFetchData from './useFetchData';
import {
    Accordion, AccordionDetails, AccordionSummary,
    Breadcrumbs,
    Card,
    CircularProgress,
    CssBaseline, IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText, TextField
} from '@material-ui/core';
import { spacing } from '@material-ui/system';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {Add, Create, PlusOne, Send} from "@material-ui/icons";
import CreateIcon from "@material-ui/icons/Create";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import UserService from "../services/user";
import API from "../services/api";

const useStyles = makeStyles((theme) => ({
    spacing: 8,
    root: {
        marginTop: "10%",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    buttonReply: {
        marginLeft: "auto"
    },
    title: {
        display: "flex",
        position:"inherit",
        marginTop: "10%",
        marginBottom: "5%",

    },
    titleText: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    list: {

    },
    margin: {
        margin: theme.spacing(1),
        width: "100%"
    },
    details: {
        alignItems: 'center',
    },
    form: {
        display: "flex",
        width: "100%",
    }
}));


const Topic = (props) => {
    const classes = useStyles();

    const topicId = + props.match.params.topicId;
    const {loading, data: topic, error} = useFetchData(`/topics/${topicId}/`)

    const [replies, setReplies] = useState([]);
    const [text, setText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            text: text,
            topicId: props.match.params.topicId
        }
        console.log(123, payload)
        API.post('/reply/createReply', payload)
            .then((response) => {
                // history.push('/topic/' + `${props.match.params.topicId}`);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {

        let url = '/reply/topicId/' + props.match.params.topicId + '/';
        // console.log(123, url)
        API.get(url)
            .then(responce => {
                // console.log(123, responce.data)
                setReplies(responce.data);
            })
            .catch(error => {
                // setErrors(error);
                // console.log(123, error);
            })
    }, []);


    if(error) {
        return <>{error}</>
    }
    if (loading) {
        return <CircularProgress/>;
    } else {
         return(
            <React.Fragment>
                <CssBaseline />

                <Container component="main" maxWidth="md" m={2}>
                    <Breadcrumbs aria-label="breadcrumb" style={{ paddingTop: 10}}>
                        <Link color="inherit" to="/">
                            Home
                        </Link>
                        <Link color="inherit" to="/topics">
                            Topics
                        </Link>
                        <Typography color="textPrimary"> { topic.title } </Typography>
                    </Breadcrumbs>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h3" component="h2">
                                    { topic.title }
                                </Typography>
                                <Typography variant="caption" color="textSecondary" type="datetime-local" component="p">
                                    Posted by: { topic.user.firstName }  { topic.user.lastName }
                                </Typography>
                                <Typography variant="caption" color="textSecondary" type="datetime-local" component="p">
                                    Created at: {new Date(topic.createdAt).toUTCString()}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Grid item md>
                        <div className={classes.title}>
                            <Typography variant="h5" className={classes.titleText}>
                                Topic Replies
                            </Typography>
                        </div>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<Add color="primary" />}
                                aria-controls="panel1c-content"
                                id="panel1c-header"
                            >
                                <Typography variant="h6">
                                    Add Reply
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.details}>
                                <form noValidate onSubmit={handleSubmit} className={classes.form}>
                                    <TextField
                                        className={classes.margin}
                                        label="Reply"
                                        variant="outlined"
                                        id="mui-theme-provider-outlined-input"
                                        value={text}
                                        onChange={event => setText(event.target.value)}
                                    />
                                    <Button edge="end" aria-label="Send" type="submit">
                                        <Send />
                                    </Button>
                                </form>
                            </AccordionDetails>
                        </Accordion>
                        <div className={classes.list}>
                            <List dense={replies}>
                                {replies.map((reply) => (
                                    <ListItem>
                                        <ListItemText
                                            primary={reply.text}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="Edit">
                                                <CreateIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Grid>
                </Container>
            </React.Fragment>);
    }
};

export default Topic;
