'use client';
import React, { useState } from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import CategoriesList from './components/CategoriesList';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductsList from './components/ProductsList';
import UserOrdersList from './components/UserOrdersList';
import AdminOrdersList from './components/AdminOrdersList';
import PersonalInfo from './components/PersonalInfo';
import UsersList from './components/UsersList';

export default function Profile() {
  const { currentUser } = useSelector((state: any) => state.user);
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '1';
  const [selectedTab, setSelectedTab] = useState(id);

  return (
    <div>
      {currentUser.isAdmin && (
        <Tabs
          defaultActiveKey="1"
          onChange={(key) => {
            router.push(`/profile?id=${key}`);
            setSelectedTab(key);
          }}
          activeKey={selectedTab}
        >
          <Tabs.TabPane tab="Products" key="1">
            <ProductsList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Categories" key="2">
            <CategoriesList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Orders" key="3">
            <AdminOrdersList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Users" key="4">
            <UsersList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Personal Information" key="5">
            <PersonalInfo />
          </Tabs.TabPane>
        </Tabs>
      )}

      {!currentUser.isAdmin && (
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Orders" key="1">
            <UserOrdersList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Personal Information" key="2">
            <PersonalInfo />
          </Tabs.TabPane>
        </Tabs>
      )}
    </div>
  );
}
