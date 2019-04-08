import Typography from '@material-ui/core/Typography';
import {MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import React, {Component} from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import './App.css';
import {theme} from './theme';
import {Container as CerebralContainer} from '@cerebral/react';
import appController from './controller';
import Overview from './components/overview';

const controller = appController();

function PageNotFound() {
  return (
    <Typography variant="h1">
      Page not found. Please start to search from {<Link to="/">main</Link>}
    </Typography>
  );
}

const Root = (props) => {
  return (
    <>
      <Typography variant="h4">
        This is the root component
      </Typography>
      <Typography variant="body1">
        Please feel free to update this code with anything you need to accomplish the test task
      </Typography>
      <Typography variant="body1">
        Login <a href={'https://devsqvr.ru/auth'} target={'_blank'}>here</a>
        &nbsp;to start to use SQVR GraphQL server in your local development;
      </Typography>
      <Typography variant="body1">
        Use <a href="https://devsqvr.ru/api/graphql/v1" target="_blank">this GraphiQL page </a>
        &nbsp;to view info about schema and make a test-queries
      </Typography>
      <Typography variant="body1">
        Go to <Link to="/overview">overview page</Link>
        &nbsp;to view test task solution
      </Typography>
    </>
  );
};

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <CerebralContainer app={controller}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Root}/>
              <Route exact path="/overview" component={Overview}/>
              <Route component={PageNotFound}/>
            </Switch>
          </BrowserRouter>
        </CerebralContainer>
      </MuiThemeProvider>
    );
  }
}

export default App;
