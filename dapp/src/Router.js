import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link  
} from "react-router-dom";
import Home from './App'
import Token from './Perso_token'
import {Button} from 'react-bootstrap'
import Compteur from './Counter_user'
import Creation from './Creation'
import Importer from './Importation'


export default function Test() {
  return (
    <Router>
      <div>
        <nav>
          <ul style={{ listStyleType : "none"}}>            
            <li style={{display: "inline"}}>
                <Link to="/"><Button > Home  </Button></Link>
            </li>
            <li style={{display: "inline", marginLeft:"2em"}}>
                <Link to="/token"><Button>Informations about a specific Token</Button></Link>
            </li>
            <li style={{display: "inline", marginLeft:"2em"}}>
                <Link to="/count"><Button>Tokens per User</Button></Link>
            </li>
            <li style={{display: "inline", marginLeft:"2em"}}>
                <Link to="/creation"><Button>Create a new Token</Button></Link>
            </li>
            <li style={{display: "inline", marginLeft:"2em"}}>
                <Link to="/importer"><Button>Import token of other groups</Button></Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/token">
            <Token />
          </Route>
          <Route exact path="/count">
            <Compteur />
          </Route>
          <Route exact path="/creation">
            <Creation />
          </Route>
          <Route exact path="/importer">
            <Importer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}