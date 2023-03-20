import { useState } from "react";
import AuthContext from "./AuthContext";

// 랜덤으로 오늘의 추천기능(개별코드 이용 1 ~ 150)
export default function AuthProvider(props) {
  const [user, setUser] = useState(null);

  function login(username) {
    setUser(username);
    localStorage.setItem('user', username);
  }

  function logout() {
    setUser("");
  }

  const value = {user, login, logout};

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}
