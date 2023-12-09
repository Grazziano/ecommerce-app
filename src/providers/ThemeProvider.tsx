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
            colorPrimary: '#1C1C1C',
          },
        }}
      >
        {children}
      </ConfigProvider>
    </div>
  );
}
