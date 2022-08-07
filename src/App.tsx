import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { provider, auth } from "./firebase";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else {
        console.log("Not login");
      }
    });
  }, []);

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential?.accessToken);
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sucsess logout!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <button onClick={handleLogin}>LOGIN</button>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
};

export default App;
