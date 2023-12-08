'use client';
import React from 'react';
import { ConfigProvider } from 'antd';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#000',
          },
        }}
      >
        {children}
      </ConfigProvider>
    </div>
  );
}
