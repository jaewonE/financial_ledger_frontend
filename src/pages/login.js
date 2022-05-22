import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormError } from '../components/formError';
import { TopBar } from '../components/topBar';

const requestLogin = async (data) => {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove({ pass: true, errorMessage: null, token: 'jwt_token' });
    }, 1000);
  });
};

const Login = ({ setLoginStatus }) => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm({
    mode: 'onChange',
  });
  const onSubmit = async (data) => {
    console.log(data);
    const { pass, errorMessage, token } = await requestLogin(data);
    if (pass) {
      window.localStorage.removeItem('x-jwt');
      window.localStorage.setItem('x-jwt', token);
      setLoginStatus(true);
    } else {
      alert(errorMessage);
    }
  };
  return (
    <div className="w-screen h-screen">
      <TopBar showProfile={false} />
      <div
        style={{ backgroundColor: '#EFEFEF' }}
        className="w-screen h-screen flex-center"
      >
        <form
          style={{ backgroundColor: '#FDFDFD' }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-full max-w-sm h-96 flex flex-col justify-start items-center shadow-lg shadow-gray-600"
        >
          <div className="bg-gradient-to-r from-green-600 via-purple-500 to-yellow-500 h-2 w-full"></div>
          <div className=" text-4xl font-extralight mt-8 mb-5">Login</div>
          <input
            required
            className="auth-input my-2"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: '이메일 형식을 입력해주세요',
              },
            })}
            name="email"
            type="email"
            placeholder="Email"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            required
            className="auth-input my-3"
            {...register('password', {
              required: 'Password is required',
            })}
            name="password"
            type="password"
            placeholder="Password"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          <button
            className={`w-2/3 h-11 bg-red-500 text-white text-xl rounded-md mt-3 " ${
              isValid ? '' : 'bg-gray-400 pointer-events-none'
            }`}
          >
            로그인
          </button>
          <div className=" text-xs mt-7">
            계정이 없나요?{' '}
            <Link to="/signup" className=" underline text-blue-400">
              지금 생성하세요!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
