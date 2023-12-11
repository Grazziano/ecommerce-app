'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { Popover, message } from 'antd';

interface LayoutProviderProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProviderProps) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const pathname = usePathname();
  const isPrivatePage =
    pathname !== '/auth/login' && pathname !== '/auth/register';
  const router = useRouter();

  const getCurrentUser = async () => {
    try {
      const response = await axios.get('/api/auth/currentuser');
      setCurrentUser(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const onLogout = async () => {};

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
      {isPrivatePage && currentUser && (
        <>
          <div className="bg-primary py-2 px-5 flex justify-between items-center">
            <div className="flex gap-2">
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
