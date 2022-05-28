import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import BaseWrapper from '../components/baseWrapper';
import { FormError } from '../components/formError';
import { sendPost, sendQuery } from '../mysql';
import { postUserObj } from './profile';

const postNewEnter = async (input) => {
  const { status, err, data } = await sendPost(
    'http://localhost:4000/insert/new',
    {
      ...input,
    }
  );
  if (status === 200 && data) return { pass: true, err: null, data };
  else return { pass: false, err, data: null };
};

const NewEnter = ({ userObj, jwt, setUserObj }) => {
  const [requestLoading, setRequestLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([
    { name: '식사', icon: 'fa-solid fa-utensils', id: 0 },
  ]);
  const navigate = useNavigate();
  useEffect(() => {
    const requestCategory = async () => {
      const categorys = await sendQuery(`http://localhost:4000/category`);
      setCategoryList(categorys.data);
    };
    requestCategory();
  }, [userObj]);
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      category: categoryList[0].name,
    },
  });

  const onSubmit = async (updated) => {
    if (!requestLoading) {
      setRequestLoading(true);
      let balance = userObj.balance;
      if (balance >= updated.price) {
        let categoryId = 0;
        for (let i = 0; i < categoryList.length; i++) {
          if (categoryList[i].name === updated.category) {
            categoryId = categoryList[i].id;
            break;
          }
        }
        const { pass, err, data } = await postNewEnter({
          store: updated.storeName ? updated.storeName : null,
          price: updated.price,
          categoryId,
          jwt,
        });
        if (pass && data) {
          balance -= updated.price;
          const results = await postUserObj({ balance, jwt });
          if (results.pass) setUserObj({ ...userObj, balance });
          alert('추가 완료!');
          navigate('/spend');
        } else console.error(err);
      } else {
        alert('잔액이 부족합니다');
      }
      setRequestLoading(false);
    }
  };
  return (
    <BaseWrapper userObj={userObj}>
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
              {...register('category', { required: 'category is required.' })}
              name="category"
              id="category"
              required
              defaultValue={categoryList[0].name}
            >
              {categoryList.map((category, index) => (
                <option key={index}>{category.name}</option>
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
