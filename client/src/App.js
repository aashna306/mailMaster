import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Edit from './pages/Edit/Edit.jsx';
import EmailOption from './pages/EmailOption/EmailOption.jsx';
import Profile from './pages/Profile/Profile.jsx';
import SignIn from './pages/SignIn/SignIn.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/edit" component={Edit} />
          <Route path="/email-option" component={EmailOption} />
          <Route path="/profile" component={Profile} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          
          {/* Optional: Route for 404 Not Found */}
          <Route render={() => <h2>404 Not Found</h2>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
