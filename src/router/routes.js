import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

  import HomePage from '../components/Homepage';
  import Header from '../components/Header';
  import Restaurant from '../components/Restaurant';

  function Main(){
    return(
      <Router>
          <Header/>
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
             <Route path="/restaurants/" element={<Restaurant/>} />
          </Routes>
        
      </Router>
    )
}

export default Main;