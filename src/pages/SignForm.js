import { Link, useNavigate } from "react-router-dom";
import SignInInputs from "../Components/SignInInputs";
import SignUpInputs from "../Components/SignUpInputs";
import { useState, useEffect } from "react";

export default function SignForm({signin, setLoggedIn}) {

  const navigate = useNavigate();
  const [isFilled, setIsFilled] = useState(false);
  const [highlightError, setHighlightError] = useState(false);
  const [username, setUName] = useState("Google User");

  useEffect(() => {
    document.title = "readme - " + (signin ? "Sign In" : "Sign Up");
 }, [signin]);

  const handleClick = () => {
    if (isFilled) {
      localStorage.loggedIn = username;
      setLoggedIn(true);
      console.log("signed in as", localStorage.loggedIn)
      navigate("/home");
    }
    else {
      setHighlightError(true);
    }
  }

  return (
    <div className="sign" id="signin">
    <div id="signbox">
        <h2>{signin ? "Sign In" : "Sign Up"}
        <span> to </span>
        <span className="colorbgtext">readme</span>
      </h2>

        {signin && <SignInInputs setUName={setUName} highlightError={highlightError} setHighlightError={setHighlightError} setFilled={setIsFilled}/>}
        {!signin && <SignUpInputs setUName={setUName} highlightError={highlightError} setHighlightError={setHighlightError} setFilled={setIsFilled}/>}


        <div id="signbottom">
            <input name="remMe" id="remMe" type="checkbox"/>
            <label htmlFor="remMe">Remember Me</label>
            <input type="button" className={isFilled ? "" : "disabled"} onClick={handleClick} value={signin ? "Sign In" : "Sign Up"} />
        </div>

        <Link to={signin ? "/signup" : "/signin"}>{signin ? "New to the site? Sign-up" : "Already a user? Sign-in"}</Link>

    </div>
    </div>
    
  )
}
