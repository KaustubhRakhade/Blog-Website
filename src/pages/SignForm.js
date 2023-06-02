import { Link, useNavigate } from "react-router-dom";
import SignInInputs from "../Components/SignInInputs";
import SignUpInputs from "../Components/SignUpInputs";
import { useState, useEffect, useRef } from "react";
import FadingAlert from "../Components/FadingAlert";

export default function SignForm({signin, setLoggedIn}) {

  const navigate = useNavigate();
  const signpage = useRef();
  const [isFilled, setIsFilled] = useState(false);
  const [highlightError, setHighlightError] = useState(false);
  const [username, setUName] = useState("Google User");
  const [showAlert, setshowAlert] = useState(false);

  useEffect(() => {
    document.title = "readme - " + (signin ? "Sign In" : "Sign Up");
    setIsFilled(false);
    setHighlightError(false);
 }, [signin]);

  const handleClick = () => {
    if (isFilled) {
      localStorage.loggedIn = username;
      setLoggedIn(true);
      console.log("signed in as", localStorage.loggedIn)
      signpage.current.style.pointerEvents = "none"
      setshowAlert(true);
      setTimeout(() => {
        navigate("/home");
      }, 4000);
    }
    else {
      setHighlightError(true);
    }
  }

  return (
    <div ref={signpage} className="sign" id="signin">
    <div id="signbox">
        <h2>{signin ? "Sign In" : "Sign Up"}
        <span> to </span>
        <span className="colorbgtext">readme</span>
      </h2>

        {signin && <SignInInputs setUName={setUName} highlightError={highlightError} setHighlightError={setHighlightError} setFilled={setIsFilled}/>}
        {!signin && <SignUpInputs setUName={setUName} highlightError={highlightError} setHighlightError={setHighlightError} setFilled={setIsFilled}/>}


        <div id="signbottom">
            <input name="remMe" id="remMe" type="checkbox"/>
            <span id="checkmark" className="material-symbols-outlined">check</span>
            <label htmlFor="remMe">Remember Me</label>
            <input type="button" className={isFilled ? "" : "disabled"} onClick={handleClick} value={signin ? "Sign In" : "Sign Up"} />
        </div>

        <Link to={signin ? "/signup" : "/signin"}>{signin ? "New to the site? Sign-up" : "Already a user? Sign-in"}</Link>

    </div>
    {showAlert && <FadingAlert icon="bolt" text={signin ? "Signed In successfully!" : "Signed Up successfully!"}/>}

    </div>
    
  )
}
