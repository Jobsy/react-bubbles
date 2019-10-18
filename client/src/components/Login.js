import React, {useRef} from "react";
import axios from "axios";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const userNameRef = useRef();
  const passwordRef = useRef();

  const submit = () => {
    console.log("...:", {

      username: userNameRef.current.value,
      password: passwordRef.current.value,

    })
    axios.post("http://localhost:5000/api/login", {

      username: userNameRef.current.value,
      password: passwordRef.current.value,
    })
      .then(res => {
        // debugger
        localStorage.setItem("token", res.data.payload)
        props.history.push("/bubblePage");
      });
  };
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <br />
      <p>Build a login page here</p>
      <br />

      <div>
                Username <input ref={userNameRef} type="
                text" />
                <br />

                Password  <input ref={passwordRef} type="
                text" />
                <br />
            </div>

            <div>
                <button onClick={submit}>Login</button>
            </div>
    </div>
  );
};

export default Login;

