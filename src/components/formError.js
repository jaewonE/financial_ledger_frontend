import React from 'react';

export const FormError = ({ errorMessage }) => {
  const enterMessage = (errorMessage) => {
    if (errorMessage === 'Name is required') return '이름을 입력해주세요';
    else if (errorMessage === 'Email is required')
      return '이메일을 입력해주세요';
    else if (errorMessage === 'Please enter a valid email')
      return '이메일 형식을 입력해주세요';
    else if (errorMessage === 'Password is required')
      return '비밀번호를 입력해주세요';
    else if (errorMessage === 'Password must be more than 4 chars')
      return '비밀번호는 최소 4글자 이상입니다';
    else if (errorMessage === 'balance is required')
      return '0원 이상의 잔액을 입력해주세요';
    return errorMessage;
  };
  return (
    <span className="text-red-600 font-bold text-md">
      {enterMessage(errorMessage)}
    </span>
  );
};
