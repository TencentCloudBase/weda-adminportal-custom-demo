import './login.css'
import { useState } from 'react';
import { Auth } from "@cloudbase/weda-client";

export default function Login() {
  const [errorMessages, setErrorMessages] = useState({});

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const { username: usernameInput, password: passwordInput } = event.target
    
    const username = usernameInput.value
    const password = passwordInput.value

    if (!username) {
      setErrorMessages({
        name: 'username',
        message: 'Username is required'
      })
    }

    if (!password) {
      setErrorMessages({
        name: 'password',
        message: 'Password is required'
      })
    }

    if (username && password) {
      // 账号密码登录
      Auth.signIn(
        { username, password }
      ).then(() => {
        window.location.href = '/'
      }).catch(error => {
        console.log(error)
        setErrorMessages({
          name: 'login',
          message: '登录失败: errorcode' + error.error_code + ':'  +  error.error
        })
      })
    }
  };

  const renderForm = (
    <form className="form-example" onSubmit={handleSubmit}>
      <div className="form-example">
        <input placeholder="请输入用户名" name="username" required />
        {renderErrorMessage("username")}
      </div>
      <div className="form-example">
        <input
          type="password"
          placeholder="请输入密码"
          name="password"
          auto-complete="new-password"
          required
        />
        {renderErrorMessage("password")}
      </div>
      <div className="form-example">
        <input type="submit" value="登录" />
      </div>
    </form>
  );

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>登录页</h2>
      {renderErrorMessage("login")}
      {renderForm}
    </main>
  );
}