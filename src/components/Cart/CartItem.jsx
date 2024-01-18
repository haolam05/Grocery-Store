import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/cart';

function CartItem({ item }) {
  const [count, setCount] = useState(item.count);
  const dispatch = useDispatch();

  useEffect(() => {
    setCount(item.count);
  }, [item.count]);

  function removeProduceFromCart(e) {
    e.preventDefault();
    dispatch(removeFromCart(item.id));
  }

  function handleIncrement(e) {
    e.preventDefault();
    dispatch(addToCart(item.id, item.count + 1));
  }

  function hanldeDecrement(e) {
    e.preventDefault();
    if (item.count - 1 < 1) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(addToCart(item.id, item.count - 1));
    }
  }

  function hanldeInputChange(e) {
    e.preventDefault();
    const count = +e.target.value;
    if (count < 1) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(addToCart(item.id, count));
    }
  }

  return (
    <li className="cart-item">
      <div className="cart-item-header">{item.name}</div>
      <div className="cart-item-menu">
        <input
          type="number"
          value={count}
          onChange={hanldeInputChange}
        />
        <button
          className="cart-item-button"
          onClick={handleIncrement}
        >
          +
        </button>
        <button
          className="cart-item-button"
          onClick={hanldeDecrement}
        >
          -
        </button>
        <button
          className="cart-item-button"
          onClick={removeProduceFromCart}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default CartItem;
