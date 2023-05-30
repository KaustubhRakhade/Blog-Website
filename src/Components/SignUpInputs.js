import { useEffect, useRef } from "react"

export default function SignInInputs({setFilled, highlightError, setHighlightError, setUName}) {

  const uname = useRef();
  const email = useRef();
  const number = useRef();
  const password = useRef();
  const confpass = useRef();

  const validate = () => {
    if (uname.current.value === "") {
      return [false, uname.current];
    }

    if (email.current.value === "") {
      return [false, email.current];
    }

    if (number.current.value === "") {
      return [false, number.current];
    }

    if (password.current.value === "") {
      return [false, password.current];
    }

    if (confpass.current.value === "") {
      return [false, confpass.current];
    }

    if (confpass.current.value !== password.current.value) {
      return [false, confpass.current];
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
    setFilled(validate()[0]);
    setUName(uname.current.value);
  }

  return (
    <>
      <input onChange={checkFilled} ref={uname} type="text" placeholder="Username"/>
      <input onChange={checkFilled} ref={email} type="email" placeholder="Email"/>
      <input onChange={checkFilled} ref={number} type="number" placeholder="Phone Number"/>

      <input onChange={checkFilled} ref={password} type="password" placeholder="Password" />
      <input onChange={checkFilled} ref={confpass} type="password" placeholder="Confirm Password" />

    </>
  )
}
