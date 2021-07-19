import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';

import {AllTopics, CreateTopic, Header, Home, Login, Register, Topic} from './components';
import {useState} from "react";
import UserService from "./services/user";
import { ThemeProvider } from '@material-ui/styles';
import {createMuiTheme} from "@material-ui/core";
import {blue, indigo} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: blue[900]
        },
        primary: {
            main: indigo[700]
        }
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '"Lato"',
            'sans-serif'
        ].join(',')
    }
});


function App() {
    const [user, setUser] = useState(null);
    const [userIsLogged, setUserIsLogged] = useState(0);

    let loggedUser = UserService.getUser();

    if (loggedUser && !userIsLogged) {
        setUser(loggedUser);
        setUserIsLogged(1)
    }

    const setUserInState = (name) => {
        setUser(name);
    };

    return (
        <BrowserRouter>
            <div className='App'>
                <ThemeProvider theme={theme}>
                    <Header user={user} log={setUserInState}/>
                    {user !== null ? (
                        <Switch>
                            {/*<Route path='/' exact component={Home}/>*/}
                            <Route path='/register' exact component={Register}/>
                            <Route
                                path='/'
                                exact
                                render={(props) => <Home {...props} user={setUserInState}/>}
                            />
                            {/*<Route path='/users' exact component={AllUsers} />*/}
                            <Route path='/topics' exact component={AllTopics}/>
                            <Route path='/topic/:topicId' exact component={Topic}/>
                            <Route path='/login' component={Login}/>
                            <Route path='/addtopic' component={CreateTopic}/>
                        </Switch>
                    ) : (
                        <Switch>
                            <Route
                                path='/'
                                exact
                                render={(props) => <Home {...props} user={setUserInState}/>}
                            />
                            {/*<Route path='/' exact component={Home}/>*/}
                            <Redirect from="/topics" to="/login"/>
                            <Redirect from="/topic/:topicId" to="/login"/>
                            <Redirect from="/addtopic" to="/login"/>
                            <Route path='/login' component={Login}/>
                            <Route path='/register' exact component={Register}/>


                        </Switch>
                    )}
                </ThemeProvider>
            </div>
        </BrowserRouter>

    );

}

export default App;
