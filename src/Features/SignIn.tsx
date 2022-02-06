import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication } from "../Firebase/Firebase";

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re: any) => {
        console.log(re);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In</button>
    </div>
  );
}

export default SignIn;
