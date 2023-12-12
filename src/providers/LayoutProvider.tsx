'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { Popover, message } from 'antd';
import Loader from '@/components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrentUser } from '@/redux/userSlice';

interface LayoutProviderProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProviderProps) {
  const { currentUser } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const isPrivatePage =
    pathname !== '/auth/login' && pathname !== '/auth/register';
  const router = useRouter();
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      const response = await axios.get('/api/auth/currentuser');
      dispatch(SetCurrentUser(response.data.data));
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (isPrivatePage) {
      getCurrentUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPrivatePage, pathname]);

  const onLogout = async () => {
    try {
      setLoading(true);
      await axios.get('/api/auth/logout');
      message.success('Logout successful');
      dispatch(SetCurrentUser(null));
      router.push('/auth/login');
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div className="flex flex-col gap-3 p-2">
      <div
        className="flex gap-2 items-center cursor-pointer text-md"
        onClick={() => router.push('/profile')}
      >
        <i className="ri-shield-user-line"></i>
        <span>Profile</span>
      </div>

      <div
        className="flex gap-2 items-center cursor-pointer text-md"
        onClick={() => onLogout()}
      >
        <i className="ri-logout-box-r-line"></i>
        <span>Logout</span>
      </div>
    </div>
  );

  return (
    <div>
      {loading && <Loader />}

      {isPrivatePage && currentUser && (
        <>
          <div className="bg-primary py-2 px-5 flex justify-between items-center">
            <div
              className="flex gap-2 cursor-pointer"
              onClick={() => router.push('/')}
            >
              <h1 className="text-xl font-bold text-red-500">Dev</h1>
              <h1 className="text-xl font-bold text-yellow-500">Shop</h1>
            </div>

            <div className="flex gap-5 items-center">
              <i className="ri-shopping-cart-line text-white text-2xl"></i>

              <Popover content={content} trigger="click">
                <div className="flex h-8 w-8 bg-white p-2 rounded-full items-center justify-center cursor-pointer">
                  <span>{currentUser.name[0]}</span>
                </div>
              </Popover>
            </div>
          </div>
          <div className="p-5">{children}</div>
        </>
      )}

      {!isPrivatePage && children}
    </div>
  );
}
