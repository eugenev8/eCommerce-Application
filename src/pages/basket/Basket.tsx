import { useNavigate } from 'react-router-dom';

export default function BasketPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  return (
    <>
      <h1>Items</h1>
      <div>Item</div>
      <div>Quantity of item</div>
    </>
  );
}
