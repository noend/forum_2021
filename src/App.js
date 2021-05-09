import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import {AllTopics, Header, Home, Login, Topic, CreateTopic} from './components';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/topics' exact component={AllTopics} />
          <Route path='/topic/:topicId' component={Topic} />
          <Route path='/login' component={Login} />
          <Route path='/addtopic' component={CreateTopic} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
