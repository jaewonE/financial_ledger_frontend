import React from 'react';
import { useForm } from 'react-hook-form';
import { TopBar } from '../components/topBar';
import { FormError } from '../components/formError';
import { Link } from 'react-router-dom';

const requestLogin = async (data) => {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove({ pass: true, errorMessage: null, token: 'jwt_token' });
    }, 1000);
  });
};

const SignUp = ({ setLoginStatus }) => {
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
      alert(`반갑습니다 ${data.name}님!`);
    } else {
      alert(errorMessage);
    }
  };
  return (
    <div className="w-screen h-screen">
      <TopBar showProfile={false} />
      <div
        style={{ height: 'calc(100% - 56px)', backgroundColor: '#EFEFEF' }}
        className="w-screen flex-center"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ backgroundColor: '#FDFDFD' }}
          className="w-full max-w-sm h-[26rem] flex flex-col justify-start items-center shadow-lg shadow-gray-600"
        >
          <div className="bg-gradient-to-r from-yellow-500 via-purple-500 to-green-600 h-2 w-full"></div>
          <div className=" text-4xl font-extralight mt-5 mb-3">
            Create Account
          </div>
          <input
            required
            className="auth-input my-2"
            {...register('name', { required: 'Name is required' })}
            name="name"
            type="text"
            placeholder="Name"
          />
          {errors.name?.message && (
            <FormError errorMessage={errors.name?.message} />
          )}
          <input
            required
            className="auth-input my-2"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
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
            className="auth-input my-2"
            {...register('password', {
              required: 'Password is required',
              minLength: 4,
            })}
            name="password"
            type="password"
            placeholder="Password"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === 'minLength' && (
            <FormError errorMessage="Password must be more than 4 chars" />
          )}
          <button
            className={`w-2/3 h-11 bg-red-500 text-white text-xl rounded-md mt-2 " ${
              isValid ? '' : 'bg-gray-400 pointer-events-none'
            }`}
          >
            회원가입
          </button>
          <div className=" text-xs mt-3">
            이미 계정을 가지고 계신가요?{' '}
            <Link to="/login" className=" underline text-blue-400">
              여기서 로그인하세요!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
