import { AppBar, Toolbar, IconButton, Typography, Button, Link as LinkUI } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';

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
    const history = useHistory();

    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
        window.location.reload();
    };

    return <AppBar position="static">
        <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
            <LinkUI to='/' color="inherit" component={Link}>Home</LinkUI>
        </Typography>
            {
                (localStorage.getItem('access_token') !== null) ? <Button color='inherit' onClick={handleLogout}>Sign out</Button> :
                <Button color="inherit" to='/login' component={Link}>Login</Button> }
            { (localStorage.getItem('access_token') === null) ? <Button color="inherit" to='/register' component={Link}>Register</Button> : '' }

        </Toolbar>
    </AppBar>
}

export default Header;
