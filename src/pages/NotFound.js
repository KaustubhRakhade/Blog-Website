import { useEffect } from 'react'
import { Link } from "react-router-dom"

export default function NotFound() {

  useEffect(() => {
    document.title = "readme - Not Found"
 }, []);

  return (
    <div id="not-found">
        <h1>{"＞﹏＜"}</h1>
        <span className="colorbgtext">readme</span>
        <span><b>404</b> - Page Not Found</span>
        <div id="not-found-links">
            { localStorage.loggedIn != null &&
              <Link to="/home">Home</Link> }
            <Link to="/signin">Sign In</Link>
        </div>
    </div>
  )
}
