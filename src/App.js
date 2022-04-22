import { useEffect, useState,  } from 'react';
import { Link, Outlet } from "react-router-dom";
import history from './history'
import './App.css'
import { initMicroApps } from './utils/micro-app';
import { PortalContext } from "./context";
import { App, Auth } from "@cloudbase/weda-client";

// 初始化微搭企业工作台
App.init({
  // 企业工作台
  type: 'portal',
  // 是否访问正式环境数据
  isProd: false,
  // 微搭环境id
  envId: process.env.REACT_APP_ENV_ID,
  // 向子应用注入主应用的登录方法，当子应用登录失效时可以调用该方法重新登录
  login: () => history.push("/login"),
});


// 主应用需要监听 pushState 路由变更，通知给子应用
// https://github.com/umijs/qiankun/issues/1199
window.addEventListener('pushState', () => {
  dispatchEvent(new Event('hashchange'))
})

export default function DemoApp() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [appInfo, setAppInfo] = useState(null);

  useEffect(() => {
    // 监听登录状态
    Auth.onLoginStateChanged(async ({ appInfo, userInfo}) => {
      if (userInfo) {
        // 此时用户已经登录
        setUser(userInfo);
        setIsLogin(true);
        setAppInfo(appInfo);
        initMicroApps(appInfo);
        console.log(appInfo)
      } else {
        // 没有登录
        setUser(null);
        setIsLogin(false);
        setAppInfo(null);
      }
    });
  }, []);
  
  const renderLogin = <Link to="/login">登录</Link>

  const logoutHandler = () => {
    Auth.signOut().then(() => {
      window.location = '/'
    })
  };

  const renderUserInfo = (
    <div>
      {"当前登录用户:" + user?.username}{" "}
      <button onClick={logoutHandler}>登出</button>{" "}
    </div>
  );
  
  return (
    <PortalContext.Provider
      value={{
        user,
        appInfo,
      }}
    >
      <div className="App">
        <h1>企业工作台自定义 Demo</h1>
        <div>{isLogin ? renderUserInfo : renderLogin}</div>
        {appInfo?.length > 0 && (
          <>
            <h2>应用列表</h2>
            <ul>
              {appInfo?.map((item, i) => (
                <li key={item.id}>
                  <Link key={item.appId} to={`/app/${item.id}`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
        <Outlet />
      </div>
    </PortalContext.Provider>
  );
}