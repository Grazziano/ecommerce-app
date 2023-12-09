'use client';
import React from 'react';
import { Form, Button } from 'antd';
import Link from 'next/link';

interface UserType {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const onRegister = (values: UserType) => {
    console.log(values);
  };

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="h-full bg-primary flex items-center justify-center">
        <h1 className="text-7xl font-bold text-red-500">Dev</h1>
        <h1 className="text-7xl font-bold text-gray-500">-</h1>
        <h1 className="text-7xl font-bold text-yellow-500">Shop</h1>
      </div>

      <div className="flex items-center justify-center h-full">
        <Form
          className="w-[500px] flex flex-col gap-5"
          layout="vertical"
          onFinish={onRegister}
        >
          <h1 className="text-2xl font-bold">Register</h1>

          <hr />

          <Form.Item name="name" label="Name">
            <input type="text" />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <input type="email" />
          </Form.Item>

          <Form.Item name="password" label="Password">
            <input type="password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Register
          </Button>

          <Link href="/auth/login" className="text-primary">
            Already have an account? login
          </Link>
        </Form>
      </div>
    </div>
  );
}
