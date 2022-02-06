import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { authentication } from "../Firebase/Firebase";

function SignIn() {
  const navigate = useNavigate();

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
    // const auth = getAuth();
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
      <button onClick={signInWithOTP}>OTP Sign In</button>
    </div>
  );
}

export default SignIn;
