import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Main from './Pages/Main';
import RealtimeChart from './Pages/RealtimeChart';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          {/* <Route path="/" exact component={Dashboard} /> */}
          <Route path="/" exact component={RealtimeChart} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
