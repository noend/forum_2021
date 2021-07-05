import { AppBar, Toolbar, IconButton, Typography, Button, Link as LinkUI } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Header = (props) => {
    const classes = useStyles();

    return <AppBar position="static">
        <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
            <LinkUI to='/' color="inherit" component={Link}>Home</LinkUI>
        </Typography>
        <Button color="inherit" to='/login' component={Link}>Login</Button> /
        <Button color="inherit" to='/register' component={Link}>Register</Button>
        </Toolbar>
    </AppBar>
}

export default Header;
