import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In</button>
    </div>
  );
}

export default SignIn;
