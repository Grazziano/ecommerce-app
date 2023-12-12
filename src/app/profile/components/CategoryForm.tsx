import React, { useState } from 'react';
import { Form, Modal, message } from 'antd';
import { getAntdFieldRequiredRule } from '@/helpers/validations';
import axios from 'axios';

interface CategoryFormProps {
  showCategoryForm: boolean;
  setShowCategoryForm: (show: boolean) => void;
  reloadData: () => void;
}

export default function CategoryForm({
  showCategoryForm,
  setShowCategoryForm,
  reloadData,
}: CategoryFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await axios.post('/api/categories', values);
      message.success('Category added successfully');
      setShowCategoryForm(false);
      reloadData();
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showCategoryForm}
      onCancel={() => setShowCategoryForm(false)}
      centered
      title={<h1 className="text-2xl font-bold text-gray-800">Add Category</h1>}
      closable={false}
      okText="Save"
      onOk={() => form.submit()}
      okButtonProps={{ loading }}
    >
      <hr />
      <Form
        layout="vertical"
        className="flex flex-col gap-5 mt-5"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Category Name"
          name="name"
          rules={getAntdFieldRequiredRule('Category name is required')}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item label="Category Description" name="description">
          <textarea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
