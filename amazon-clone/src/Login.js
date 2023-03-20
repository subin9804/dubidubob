import React, { useState } from "react";
import './Login.css';
import {Link, useNavigate} from "react-router-dom";
import {auth} from './firebase';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signIn = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then(auth => {
                navigate("/")
            })
            .catch(error => alert(error.message()))

    }

    const register = e => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            if(auth) {
                navigate("/")
            }
        })
        .catch(error => alert(error.message()))
    }


    return (
        <div className="login">
            <Link to="/">
                <img className="login_logo" src="img/pngegg.png" alt="" />
            </Link>

            <div className="login_container">
                <h1>로그인</h1>
                <form>
                    <h5>이메일</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>비밀번호</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

                    <button className="login_signInButton" onClick={signIn}>로그인하기</button>

                </form>
                
                <input type="checkbox" />
                이용약관에 동의하십니까? <br/>
                
                <button className="login_registerButton" onClick={register}>회원가입</button>
            </div>
        </div>
    );
}

export default Login;