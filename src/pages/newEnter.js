import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import BaseWrapper from '../components/baseWrapper';
import { FormError } from '../components/formError';

const requestProfile = (data) => {
  console.log('request');
  console.log(data);
};

const categorySample = [
  'category1',
  'category2',
  'category3',
  'category4',
  'category5',
];

const NewEnter = () => {
  const [requestLoading, setRequestLoading] = useState(false);
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      category: categorySample[0],
    },
  });
  //가계, 가격, 카테고리
  const onSubmit = (updated) => {
    if (!requestLoading) {
      console.log(updated);
      requestProfile(updated);
    }
  };
  return (
    <BaseWrapper>
      <div className="w-full h-full flex justify-center items-center pt-14">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ backgroundColor: '#FBFBFB' }}
          className=" w-full max-w-sm h-96 flex flex-col justify-start items-center shadow-lg shadow-gray-600"
        >
          <div className="bg-gradient-to-r from-purple-500 via-green-600 to-yellow-500 h-2 w-full"></div>
          <div className=" text-4xl font-extralight mt-8 mb-4">가계부 추가</div>
          <div className="flex justify-center items-center w-full my-3">
            <div className=" text-center w-20">
              <label htmlFor="storeName">가계</label>
            </div>
            <input
              className="auth-input"
              {...register('storeName')}
              name="storeName"
              id="storeName"
              type="text"
              placeholder="가계를 입력해주세요"
            />
          </div>
          <div className="flex justify-center items-center w-full my-3">
            <div className=" text-center w-20">
              <label htmlFor="email">금액</label>
            </div>
            <input
              required
              className="auth-input"
              {...register('price', {
                required: 'price is required',
              })}
              name="price"
              id="price"
              type="number"
              placeholder="가격을 입력해주세요"
            />
          </div>
          {errors.price?.message && (
            <FormError errorMessage={errors.price?.message} />
          )}
          <div className="flex justify-center items-center w-full my-3">
            <div className=" text-center w-20">
              <label htmlFor="balance">분류</label>
            </div>
            <select
              className="auth-input h-8"
              {...register('role', { required: 'role is required.' })}
              name="role"
              id="role"
              required
              defaultValue={categorySample[0]}
            >
              {categorySample.map((role, index) => (
                <option key={index}>{role}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className={`w-2/3 ${
              Object.keys(errors).length === 1
                ? 'h-8 relative bottom-1'
                : 'h-11'
            } bg-red-500 text-white text-xl rounded-md mt-4 ml-2 ${
              !isValid && 'bg-gray-400'
            } ${(!isValid || requestLoading) && 'pointer-events-none'}`}
          >
            {requestLoading ? 'requestLoading' : 'Update'}
          </button>
        </form>
      </div>
    </BaseWrapper>
  );
};

export default NewEnter;
