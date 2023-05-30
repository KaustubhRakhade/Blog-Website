import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import SignForm from './pages/SignForm';
import NotFound from './pages/NotFound';
import { useState } from 'react';

function App() {

  const [loggedIn, setLoggedIn] = useState(localStorage.loggedIn != null);
  
  return (
    <Router>
      <div className="App">
        <Routes>

          {loggedIn &&
          <>
            <Route exact path="/home" element={ <Home/> }/>
            <Route exact path="/" element={ <Navigate to="/home" /> }/>
          </>}

          {!loggedIn &&
          <>
            <Route exact path="/home" element={ <Navigate to="/signin" /> }/>
            <Route exact path="/" element={ <Navigate to="/signin" /> }/>
          </>}

          <Route exact path="/signin" element={ <SignForm setLoggedIn={setLoggedIn} signin={true}/> }/>
          <Route exact path="/signup" element={ <SignForm setLoggedIn={setLoggedIn} signin={false}/> }/>

          <Route exact path="/not-found" element={ <NotFound/> }/>
          <Route exact path="*" element={ <Navigate to="/not-found" /> }/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
