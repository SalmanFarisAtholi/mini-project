import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import axios from "../../axios/axios";
import swal from "sweetalert";
import { AppContext } from "../../context/AppContext";

function SignupComponent() {
  const [login, setLogin] = useState("sign-in");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");
  const { relogin, setRelogin, loginStatus, setLoginStatus } =
    useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (relogin) {
      swal("Registered success!", "Login now", "success");
    }
    if (password !== cpassword) {
      setError("Password Not match");
    } else if (password === "" || cpassword === "") {
      setError("Password required");
    } else {
      setError("matched");
    }
  }, [cpassword, relogin]);

  useEffect(() => {
    axios
      .get("/isUserAuth", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        if (!response.data.auth) {
          setLoginStatus(false);
        } else {
          setLoginStatus(true);
        }
      });
  }, [loginStatus]);

  const handlesignup = (e) => {
    e.preventDefault();
    if (
      password === "" ||
      cpassword === "" ||
      email === "" ||
      username === ""
    ) {
      setError("All fields are required");
    } else if (password !== cpassword) {
      setError("confirm password notmatch");
      swal("sorry!", "Confirm password not match!", "error");
    } else {
      axios
        .post("/signup", {
          username: username,
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.status === "success") {
            setRelogin(true);
            navigate("/");
          } else {
            swal("OOPS", response.data.message, "error");
          }
        })
        .catch((err) => {
          alert("network error: " + err.message);
        });
    }
  };

  const handlelogin = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      swal("sorry", "All fields are required!", "error");
    } else {
      axios
        .post("/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          if (!response.data.auth) {
            setLoginStatus(false);
            swal("sorry", response.data.message, "error");
          } else {
            setLoginStatus(true);
            localStorage.setItem("token", response.data.token);
            swal("success", response.data.message, "success");
            setLoginStatus(true);
          }
        });
    }
  };

  return (
    <div id="container sign-in" className={`container ${login}`}>
      <div className="row">
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <div className="form sign-up">
              <form onSubmit={handlesignup}>
                <div className="input-group">
                  <i className="bx bxs-user"></i>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div className="input-group">
                  <i className="bx bx-mail-send"></i>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email"
                  />
                </div>
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    type="password"
                    onChange={(e) => {
                      setCpassword(e.target.value);
                    }}
                    value={cpassword}
                    placeholder="Confirm password"
                  />
                </div>
                {/* <span style={{color:'red',fontsize:'0.3px'}}>{error}</span> */}
                <button>Sign up</button>
              </form>
              <p>
                <span>Already have an account?</span>
                <b
                  onClick={() => {
                    setLogin("sign-in");
                  }}
                  className="pointer"
                >
                  Sign in here
                </b>
              </p>
            </div>
          </div>
        </div>

        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <div className="form sign-in">
              <form onSubmit={handlelogin}>
                <div className="input-group">
                  <i className="bx bxs-user"></i>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                  />
                </div>

                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <button>Sign in</button>
              </form>

              <p>{/* <b>Forgot password?</b> */}</p>
              <p>
                <span>Don't have an account?</span>
                <b
                  onClick={() => {
                    setLogin("sign-up");
                  }}
                  className="pointer"
                >
                  Sign up here
                </b>
              </p>
            </div>
          </div>

          <div className="form-wrapper"></div>
        </div>
      </div>

      <div className="row content-row">
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome User!</h2>
          </div>
          <div className="img sign-in"></div>
        </div>

        <div className="col align-items-center flex-col">
          <div className="img sign-up"></div>
          <div className="text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupComponent;
