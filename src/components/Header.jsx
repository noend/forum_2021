import {AppBar, Button, IconButton, Link as LinkUI, Menu, MenuItem, Toolbar, Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles';
import {Link, useHistory} from 'react-router-dom';
import {useState} from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";


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
    name: {
        flexGrow: 1,
    },
}));

const Header = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const user = props.user;

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
        window.location.reload();
    };

    return <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                {/*{(user !== null ) ? user.firstName + ' ' + user.lastName : ''}*/}
                <Typography variant="inherit" className={classes.title}>
                    <LinkUI to='/' color="inherit" component={Link}>Forum MSE 2020</LinkUI>
                </Typography>
                {user !== null && (
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>{user.firstName + ' ' + user.lastName}</MenuItem>
                            <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                        </Menu>
                    </div>
                )}
                {
                    (user !== null) ? (
                            ''
                        ) :
                        <Button color="inherit" to='/login' component={Link}>Login</Button>
                }
                {
                    (user === null) ?
                        <Button color="inherit" to='/register' component={Link}>Register</Button> : ''
                }

            </Toolbar>
        </AppBar>
    </div>
}

export default Header;
