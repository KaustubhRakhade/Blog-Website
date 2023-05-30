import logo from '../cgs_logo.png';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ children }) {

  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("loggedIn");
    navigate("/signin");
  }
  return (
    <div id="navbar">
        <div id="logobox">
            <img src={logo} alt="CGS" id="logo" />
            <h1>readme</h1>
        </div>

        {children}
        
        <div id="profileBanner">
            <div id="profile">
                <span id="profileImage">{(localStorage.loggedIn || "Google User")[0]}</span>
                <span id="profileData">Signed in as<br /> <i>{localStorage.loggedIn || "Google User"}</i></span>
            </div>
            <input id="signoutBTN-mob" className="material-symbols-outlined" type="button" value="logout" onClick={signOut}/>
            <input id="signoutBTN-pc" type="button" value="Sign out" onClick={signOut}/>
        </div>
    </div>
  )
}
