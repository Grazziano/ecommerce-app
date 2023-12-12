import React, { useState } from 'react';
import { Button } from 'antd';
import CategoryForm from './CategoryForm';

export default function CategoriesList() {
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  return (
    <div>
      <div className="flex justify-end">
        <Button type="primary" onClick={() => setShowCategoryForm(true)}>
          Add Category
        </Button>
      </div>

      {showCategoryForm && (
        <CategoryForm
          showCategoryForm={showCategoryForm}
          setShowCategoryForm={setShowCategoryForm}
          reloadData={() => {}}
        />
      )}
    </div>
  );
}
