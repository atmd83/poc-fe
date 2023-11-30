"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { sign, verify } from "./login.utils";

const API_URL = "https://poc-api-w8pa.onrender.com/v1/user";

const Login = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const user = await axios.get(`${API_URL}/`, { withCredentials: true });
      setUser(user.data);
    } catch (error) {
      console.error("user is not logged in");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const signAndVerify = async () => {
    const [signature, message] = await sign(
      "Sign in with Ethereum to use the app."
    );

    if (await verify(message, signature)) {
      window.location.reload();
    }
  };

  if (user) {
    return <p>{(user as any).username || (user as any).address}</p>;
  } else {
    return <p onClick={signAndVerify}>Connect with Metamask</p>;
  }
};

export default Login;
