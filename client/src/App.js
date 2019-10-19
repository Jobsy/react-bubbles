import React, { useState } from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import BubblePage from "./components/BubblePage";
import { withAuthCkeck } from "./components/withAuthCkeck";

export function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
         <Route
          exact
          path="/bubblePage"
          render={props => withAuthCkeck(BubblePage, props)}
        />
      </div>
    </Router>
  );
}

// export default App;
export default withRouter(App);

