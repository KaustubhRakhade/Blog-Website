import { useEffect, useRef } from "react"

export default function SignInInputs({setFilled, highlightError, setHighlightError, setUName}) {

  const uname = useRef();
  const password = useRef();

  const validate = () => {
    if (uname.current.value === "") {
      return [false, uname.current];
    }

    if (password.current.value === "") {
      return [false, password.current];
    }

    return [true, null];
  }

  useEffect(() => {
    if (highlightError) {
      const elem = validate()[1]
      elem.classList.add("error");
      setTimeout(() => {
        setHighlightError(false);
        elem.classList.remove("error");
      }, 1500);
    }
  }, [highlightError, setHighlightError])

  const checkFilled = () => {
    setHighlightError(false);
    setFilled(validate()[0])
    setUName(uname.current.value);
  }

  return (
    <>
      <input onChange={checkFilled} ref={uname} type="text" placeholder="Username or Email"/>
        <input onChange={checkFilled} ref={password} type="password" placeholder="Password" />
    </>
  )
}
