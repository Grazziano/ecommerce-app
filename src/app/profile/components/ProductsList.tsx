import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

export default function ProductsList() {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => router.push('/profile/add_product')}
        >
          Add Product
        </Button>
      </div>
    </div>
  );
}
