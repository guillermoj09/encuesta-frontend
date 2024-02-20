import { AuthProvider } from './context/authContext';
import routes from './Router/routes';
import AppRoute from './Router/AppRoute';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Navigation from './Components/Navigation';


function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Navigation></Navigation>
        <Switch>
          {
            routes.map(route => <AppRoute 
              component={route.component}
              path={route.path}
              routeType={route.routeType}
              key={route.path}
              exact
            ></AppRoute>)
          }
        </Switch>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
