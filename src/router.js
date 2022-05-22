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

const requestUser = async (email, jwt) => {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove({ pass: true, errorMessage: null, token: 'jwt_token' });
    }, 1000);
  });
};

const MainRouter = () => {
  const [isLogin, setLoginStatus] = useState(
    window.localStorage.getItem('x-jwt') ? true : false
  );
  return (
    <div className=" w-screen h-screen m-0 p-0">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {isLogin ? (
          <Routes>
            <Route path="/" element={<DashBoard />}></Route>
            <Route path="/dashBoard" element={<DashBoard />}></Route>
            <Route path="/spend" element={<Spend />}></Route>
            <Route path="/category" element={<Category />}></Route>
            <Route path="/report/monthly" element={<TimeReport />}></Route>
            <Route path="/new" element={<NewEnter />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route
              path="/login"
              element={<Navigate replace to="/"></Navigate>}
            ></Route>
            <Route
              path="/signup"
              element={<Navigate replace to="/"></Navigate>}
            ></Route>
            <Route path="/test" element={<Test />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<Login setLoginStatus={setLoginStatus} />}
            ></Route>
            <Route
              path="/signup"
              element={<SignUp setLoginStatus={setLoginStatus} />}
            ></Route>
            <Route
              path="*"
              element={<Login setLoginStatus={setLoginStatus} />}
            ></Route>
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default MainRouter;
