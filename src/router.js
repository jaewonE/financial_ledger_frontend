import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashBoard from './pages/dashBoard';
import NotFound from './pages/notFound';
import Spend from './pages/spend';
import Category from './pages/category';
import TimeReport from './pages/timeReport';
import Test from './pages/test';
import NewEnter from './pages/newEnter';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Profile from './pages/profile';
import { useEffect, useState } from 'react';
import { sendQuery } from './mysql';

const MainRouter = () => {
  const [isLogin, setLoginStatus] = useState(
    window.localStorage.getItem('x-jwt')
      ? window.localStorage.getItem('x-jwt')
      : null
  );
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    const requestUser = async (jwt) => {
      const { status, err, data } = await sendQuery(
        `http://localhost:4000/auth/user/${jwt}`
      );
      if (status === 200 && data && data.length > 0) {
        setUserObj(data[0]);
      } else {
        console.error(err);
        alert('Error: Can not get user');
      }
    };

    if (isLogin && !userObj) {
      requestUser(isLogin);
    }
  }, [isLogin, userObj]);
  return (
    <div className=" w-screen h-screen m-0 p-0">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {isLogin && userObj ? (
          <Routes>
            <Route
              path="/"
              element={<DashBoard userObj={userObj} jwt={isLogin} />}
            ></Route>
            <Route
              path="/dashBoard"
              element={<DashBoard userObj={userObj} jwt={isLogin} />}
            ></Route>
            <Route
              path="/spend"
              element={<Spend userObj={userObj} jwt={isLogin} />}
            ></Route>
            <Route
              path="/category"
              element={<Category userObj={userObj} jwt={isLogin} />}
            ></Route>
            <Route
              path="/report/monthly"
              element={<TimeReport userObj={userObj} jwt={isLogin} />}
            ></Route>
            <Route
              path="/new"
              element={
                <NewEnter
                  userObj={userObj}
                  jwt={isLogin}
                  setUserObj={setUserObj}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  userObj={userObj}
                  jwt={isLogin}
                  setUserObj={setUserObj}
                  setLoginStatus={setLoginStatus}
                />
              }
            ></Route>
            <Route
              path="/login"
              element={<Navigate replace to="/"></Navigate>}
            ></Route>
            <Route
              path="/signup"
              element={<Navigate replace to="/"></Navigate>}
            ></Route>
            <Route
              path="/test"
              element={<Test userObj={userObj} jwt={isLogin} />}
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  setLoginStatus={setLoginStatus}
                  setUserObj={setUserObj}
                />
              }
            ></Route>
            <Route
              path="/signup"
              element={
                <SignUp
                  setLoginStatus={setLoginStatus}
                  setUserObj={setUserObj}
                />
              }
            ></Route>
            <Route
              path="*"
              element={
                <Login
                  setLoginStatus={setLoginStatus}
                  setUserObj={setUserObj}
                />
              }
            ></Route>
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default MainRouter;
