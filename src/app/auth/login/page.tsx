'use client';
import React from 'react';
import { Form, Button } from 'antd';
import Link from 'next/link';
import { getAntdFieldRequiredRule } from '@/helpers/validations';

interface UserType {
  email: string;
  password: string;
}

export default function Login() {
  const onLogin = (values: UserType) => {
    console.log(values);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="h-full bg-primary hidden md:flex items-center justify-center">
        <h1 className="text-7xl font-bold text-red-500">Dev</h1>
        <h1 className="text-7xl font-bold text-gray-500">-</h1>
        <h1 className="text-7xl font-bold text-yellow-500">Shop</h1>
      </div>

      <div className="flex items-center justify-center h-full">
        <Form
          className="w-[400px] flex flex-col gap-5"
          layout="vertical"
          onFinish={onLogin}
        >
          <h1 className="text-2xl font-bold">Login</h1>

          <hr />

          <Form.Item
            name="email"
            label="Email"
            rules={getAntdFieldRequiredRule('Please enter your email address')}
          >
            <input type="email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={getAntdFieldRequiredRule('Please enter your password')}
          >
            <input type="password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>

          <Link href="/auth/register" className="text-primary">
            Dont have an account? Register
          </Link>
        </Form>
      </div>
    </div>
  );
}
