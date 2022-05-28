import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import BaseWrapper from '../components/baseWrapper';
import { FormError } from '../components/formError';
import { sendPost } from '../mysql';

export const postUserObj = async (input) => {
  const { status, err, data } = await sendPost(
    'http://localhost:4000/profile/update',
    {
      ...input,
    }
  );
  if (status === 200 && data) return { pass: true, err: null, data };
  else return { pass: false, err, data: null };
};

const Profile = ({ userObj, jwt, setUserObj, setLoginStatus }) => {
  const [requestLoading, setRequestLoading] = useState(false);
  const [changePassword, toggleChangePassword] = useState(false);
  const navigate = useNavigate();
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: userObj?.email ? userObj.email : undefined,
      age: userObj?.age ? userObj.age : undefined,
      password: undefined,
      name: userObj?.name ? userObj.name : undefined,
      balance: userObj?.balance ? userObj.balance : undefined,
      budget: userObj?.budget ? userObj.budget : undefined,
    },
  });
  const onSubmit = async (updated) => {
    if (!requestLoading) {
      setRequestLoading(true);
      if (!updated.name || updated.name === userObj?.name) delete updated.name;
      if (!updated.email || updated.email === userObj?.email)
        delete updated.email;
      if (!updated.password) delete updated.password;
      if (!updated.age || updated.age === userObj?.age) delete updated.age;
      else updated.age = Number(updated.age);
      if (!updated.balance || updated.balance === userObj?.balance)
        delete updated.balance;
      else updated.balance = Number(updated.balance);
      if (!updated.budget || updated.budget === userObj?.budget)
        delete updated.budget;
      else updated.budget = Number(updated.budget);
      if (Object.keys(updated).length) {
        const { pass, err, data } = await postUserObj({ ...updated, jwt });
        if (pass && data) {
          setUserObj({ ...userObj, ...updated });
          alert('수정 완료!');
        } else console.error(err);
      }
    }
    setRequestLoading(false);
  };
  const logOut = () => {
    window.localStorage.removeItem('x-jwt');
    setLoginStatus(null);
    alert('다음에 또 봐요!');
    navigate('/login');
  };
  return (
    <BaseWrapper userObj={userObj}>
      <div className="w-full h-full flex justify-center items-center pt-14">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ backgroundColor: '#FBFBFB' }}
          className=" w-full max-w-sm h-[35rem] flex flex-col justify-start items-center shadow-lg shadow-gray-600"
        >
          <div className="bg-gradient-to-r from-purple-500 via-green-600 to-yellow-500 h-2 w-full"></div>
          <div className=" text-4xl font-extralight mt-4 mb-2">
            Edit Profile
          </div>
          <div className="flex justify-center items-center w-full my-2">
            <div className=" text-center w-20">
              <span>로그 아웃</span>
            </div>
            <input
              onClick={logOut}
              className="auth-input bg-orange-400 hover:bg-red-500 text-white font-base font-semibold border-none"
              type="button"
              value="로그아웃"
            />
          </div>
          <div className="flex justify-center items-center w-full  my-2">
            <div className=" text-center w-20">
              <label htmlFor="name">성함</label>
            </div>
            <input
              required
              className="auth-input"
              {...register('name', { required: 'Name is required' })}
              name="name"
              id="name"
              type="text"
              placeholder="이름을 입력해주세요"
            />
          </div>
          {errors.name?.message && (
            <FormError errorMessage={errors.name?.message} />
          )}
          <div className="flex justify-center items-center w-full  my-2">
            <div className=" text-center w-20">
              <label htmlFor="email">이메일</label>
            </div>
            <input
              required
              className="auth-input"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              })}
              name="email"
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요"
            />
          </div>
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <div className="flex justify-center items-center w-full  my-2">
            <div className=" text-center w-20">
              <label htmlFor="password">비밀번호</label>
            </div>
            {changePassword ? (
              <input
                required
                className="auth-input"
                {...register('password', {
                  required: 'Password is required',
                  minLength: 4,
                })}
                name="password"
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
              />
            ) : (
              <button
                className="auth-input bg-green-100 text-black hover:bg-red-500 hover:bg-opacity-50 hover:text-white transition-colors text-xs sm:text-base"
                onClick={() => toggleChangePassword(true)}
              >
                클릭해서 비밀번호를 변경하세요
              </button>
            )}
          </div>
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === 'minLength' && (
            <FormError errorMessage="Password must be more than 4 chars" />
          )}
          <div className="flex justify-center items-center w-full  my-2">
            <div className=" text-center w-20">
              <label htmlFor="age">나이</label>
            </div>
            <input
              className="auth-input"
              {...register('age')}
              name="age"
              id="age"
              type="number"
              placeholder="나이를 입력해주세요"
            />
          </div>
          <div className="flex justify-center items-center w-full my-2">
            <div className=" text-center w-20">
              <label htmlFor="balance">잔액</label>
            </div>
            <input
              className="auth-input"
              {...register('balance', {
                required: 'balance is required',
              })}
              name="balance"
              id="balance"
              type="number"
              min={0}
              placeholder="잔액을 입력해주세요"
            />
          </div>
          {errors.balance?.message && (
            <FormError errorMessage={errors.balance?.message} />
          )}
          <div className="flex justify-center items-center w-full my-2">
            <div className=" text-center w-20">
              <label htmlFor="budget">예산</label>
            </div>
            <input
              className="auth-input"
              {...register('budget')}
              name="budget"
              id="budget"
              type="number"
              placeholder="예산을 입력해주세요"
            />
          </div>
          {Object.keys(errors).length < 2 && (
            <button
              type="submit"
              className={`w-2/3 ${
                Object.keys(errors).length === 1
                  ? 'h-8 relative bottom-1'
                  : 'h-11'
              } bg-red-500 text-white text-xl rounded-md mt-4 ${
                !isValid && 'bg-gray-400'
              } ${(!isValid || requestLoading) && 'pointer-events-none'}`}
            >
              {requestLoading ? 'requestLoading' : 'Update'}
            </button>
          )}
        </form>
      </div>
    </BaseWrapper>
  );
};

export default Profile;
