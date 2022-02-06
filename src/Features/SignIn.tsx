import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { authentication } from "../Firebase/Firebase";

function SignIn() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [otp, setOtp] = useState(0);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re: any) => {
        // console.log(re);
        if (re) {
          navigate("/");
        }
        localStorage.setItem("firebase", JSON.stringify(re.user.displayName));
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const signInWithOTP = () => {
    // const provider = new RecaptchaVerifier("sign-in-button", {
    //   size: "invisible",
    //   callback: (response) => {
    //     // reCAPTCHA solved, allow signInWithPhoneNumber.
    //     onSignInSubmit();
    //   },
    // });
    // window.recaptchaVerifier = new RecaptchaVerifier(
    //   "sign-in-button",
    //   {
    //     size: "invisible",
    //     callback: (response) => {
    //       // reCAPTCHA solved, allow signInWithPhoneNumber.
    //       onSignInSubmit();
    //     },
    //   },
    //   auth
    // );
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Google Sign In</button>
      <div>
        <h2>Enter Mobile Number</h2>
        <input
          type="number"
          onChange={(e: any) => {
            setPhoneNumber(e.target.value);
          }}
        />
      </div>
      <div>
        <h2>Enter Otp</h2>
        <input
          type="number"
          onChange={(e: any) => {
            setOtp(e.target.value);
          }}
        />
      </div>
      <button onClick={signInWithOTP}>OTP Sign In</button>
    </div>
  );
}

export default SignIn;
