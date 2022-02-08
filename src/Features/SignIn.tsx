declare const window: any;
import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  FacebookAuthProvider,
  TwitterAuthProvider,
  getAuth,
  signInWithPhoneNumber,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { authentication } from "../Firebase/Firebase";

function SignIn() {
  const navigate = useNavigate();
  const countryCode = "+91";
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [otp, setOtp] = useState("");
  const [check, setCheck] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re: any) => {
        // console.log(re);
        if (re) {
          navigate("/");
        }
        document.cookie = "name=harsh";
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  const signInWithOTP = (e: any) => {
    if (phoneNumber.length >= 12) {
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((confirmationResult: any) => {
          // confirmationResult
          window.confirmationResult = confirmationResult;
          setCheck(false);
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          //
          appVerifier.clear();
          console.log(error);
        });
    }
  };

  const verifyOTP = (e: any) => {
    let otp = e.target.value;
    setOtp(otp);
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result: any) => {
          // User signed in successfully.
          const user = result.user;
          console.log(user);
          if (user) {
            navigate("/");
          }
          document.cookie = "name=harsh";

          // ...
        })
        .catch((error: any) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    }
  };

  const _handleResetCaptcha = () => {
    setCheck(true);
    window.recaptchaVerifier.destroyed = true;
    console.log("_fb: ", window.recaptchaVerifier);
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
      },
      authentication
    );
    //generateRecaptcha();
  };

  const signUpWithEmailPassword = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setEmail("");
        setPassword("");
        // ..
      });
  };

  const signInWithEmailPassword = () => {
    signInWithEmailAndPassword(authentication, signInEmail, signInPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          navigate("/");
        }
        document.cookie = "name=harsh";
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const signinanonymously = () => {
    signInAnonymously(authentication)
      .then((user: any) => {
        if (user) {
          navigate("/");
        }
        document.cookie = "name=harsh";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const provider = new TwitterAuthProvider();

  const signInWithtwitter = () => {
    signInWithPopup(authentication, provider)
      .then((result) => {
        const credential: any =
          TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;
        const user = result.user;
        console.log(token, secret, user);
        if (user) {
          navigate("/");
        }
        document.cookie = "name=harsh";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = TwitterAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <div>
      <h2>Sign In with Google</h2>
      <button onClick={signInWithGoogle}>Google Sign In</button>
      <hr />

      <div>
        <h2>Sign In with Twitter</h2>
        <button onClick={signInWithtwitter}>Twitter</button>
      </div>

      <hr />
      <div>
        <h2>Sign In with Phone Number</h2>
        <p>Enter Mobile Number</p>
        {check ? (
          <input
            type="text"
            value={phoneNumber}
            onChange={(e: any) => {
              setPhoneNumber(e.target.value);
            }}
          />
        ) : (
          <input
            type="text"
            disabled
            value={phoneNumber}
            onChange={(e: any) => {
              setPhoneNumber(e.target.value);
            }}
          />
        )}
        <button onClick={_handleResetCaptcha}>Edit</button>
      </div>
      <div>
        <p>Enter Otp</p>
        <input type="text" value={otp} onChange={verifyOTP} />
        <div id="sign-in-button"></div>
      </div>
      {check ? (
        <button onClick={signInWithOTP}>OTP Sign In</button>
      ) : (
        <button onClick={signInWithOTP} disabled>
          OTP Sign In
        </button>
      )}
      <div>
        <hr />
        <div>
          <h2>Sign Up with Email</h2>
          <p>Enter Email</p>
          <input
            type="email"
            value={email}
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
          <p>Enter Password</p>
          <input
            type="password"
            value={password}
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button onClick={signUpWithEmailPassword}>Sign Up</button>
      </div>
      <div>
        <div>
          <h2>Sign In with Email</h2>
          <p>Enter Email</p>
          <input
            type="email"
            value={signInEmail}
            onChange={(e: any) => {
              setSignInEmail(e.target.value);
            }}
          />
          <p>Enter Password</p>
          <input
            type="password"
            value={signInPassword}
            onChange={(e: any) => {
              setSignInPassword(e.target.value);
            }}
          />
        </div>
        <button onClick={signInWithEmailPassword}>Sign In</button>
      </div>
      <hr />
      <div>
        <h2>Sign In Anonymously</h2>
        <button onClick={signinanonymously}>Sign In Anonymously</button>
      </div>
    </div>
  );
}

export default SignIn;
