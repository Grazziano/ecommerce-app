import { Button } from 'antd';

export default function Home() {
  return (
    <div>
      <h1>Homepage</h1>

      <div className="flex gap-4">
        <Button type="primary">Primary Btn</Button>
        <Button type="default">Default Btn</Button>
      </div>
    </div>
  );
}
