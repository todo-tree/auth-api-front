import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getIdToken,
} from "firebase/auth";
import { provider, auth } from "./firebase";
import { useEffect, useState } from "react";
import development from "./config";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
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
      <button
        onClick={async () => {
          const { currentUser } = auth;
          if (currentUser) {
            const token = await getIdToken(currentUser, true);
            axios
              .post(development.api_url, { token: token })
              .then((res) => {
                if (res.data.ok) {
                  console.log("OK");
                } else {
                  console.log("NO");
                }
              })
              .catch((err) => {
                console.log("NO");
              });
          }
        }}
      >
        VRRIFY
      </button>
      <p>{user?.displayName}</p>
      <p>{user?.email}</p>
    </div>
  );
};

export default App;
