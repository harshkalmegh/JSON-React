declare const window: any;
import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  FacebookAuthProvider,
  TwitterAuthProvider,
  getAuth,
  signInWithPhoneNumber,
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
  // const [recaptcha, setRecaptcha] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const verifier = new firebase.auth.RecaptchaVerifier(element.current, {
  //     size: "invisible",
  //   });
  //   if (!recaptcha) {
  //     verifier.verify().then(() => setRecaptcha(verifier));
  //   }
  //   return () => {
  //     verifier.clear();
  //   };
  // });

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
          //   if (typeof appVerifier != "undefined") {
          // appVerifier.reset();
          appVerifier.clear();
          //   }
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
          localStorage.setItem("firebase", JSON.stringify(user));

          // ...
        })
        .catch((error: any) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    }
  };

  //   const signInWithtwitter = () => {
  //     const provider = new TwitterAuthProvider();
  //     const auth = getAuth();
  //     signInWithPopup(auth, provider)
  //       .then((result) => {
  //         const credential: any =
  //           TwitterAuthProvider.credentialFromResult(result);
  //         console.log(result, credential);
  //       })
  //       .catch((error) => {
  //         const credential = TwitterAuthProvider.credentialFromError(error);
  //         console.log(credential, error);
  //       });
  //   };

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

  return (
    <div>
      <button onClick={signInWithGoogle}>Google Sign In</button>
      {/* <button onClick={signInWithtwitter}>Twitter</button> */}
      <div>
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
        <div>
          <p>Enter Email</p>
          <input
            type="text"
            value={email}
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
          <p>Enter Password</p>
          <input
            type="text"
            value={email}
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button>Submit</button>
      </div>
    </div>
  );
}

export default SignIn;
