'use client';
import React, { useState } from 'react';
import { Form, Button, message } from 'antd';
import Link from 'next/link';
import { getAntdFieldRequiredRule } from '@/helpers/validations';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface UserType {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onRegister = async (values: UserType) => {
    try {
      setLoading(true);
      await axios.post('/api/auth/register', values);
      message.success('Registered successfully, please login to continue');
      router.push('/auth/login');
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
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
          onFinish={onRegister}
        >
          <h1 className="text-2xl font-bold">Register</h1>

          <hr />

          <Form.Item
            name="name"
            label="Name"
            rules={getAntdFieldRequiredRule('Please input your name!')}
          >
            <input type="text" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={getAntdFieldRequiredRule('Please input your email!')}
          >
            <input type="email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={getAntdFieldRequiredRule('Please input your password!')}
          >
            <input type="password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            Register
          </Button>

          <Link href="/auth/login" className="text-primary">
            Already have an account? Login
          </Link>
        </Form>
      </div>
    </div>
  );
}
