import { useDispatch, useSelector } from 'react-redux';
import { populateProduce } from './store/produce';
import { useState, useEffect } from 'react';
import Cart from './components/Cart';
import ProduceList from './components/ProduceList';
import { selectCartItems } from './store/cart';

function App() {
  const cartItems = useSelector(selectCartItems);
  const [sidebarStatus, setSidebarStatus] = useState(cartItems.length > 0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(populateProduce());
  }, [dispatch]);

  useEffect(() => {
    if (sidebarStatus && !cartItems.length) {
      setSidebarStatus(false);
    } else if (!sidebarStatus && cartItems.length) {
      setSidebarStatus(true);
    }
  }, [cartItems]);

  return (
    <>
      <nav>
        <h1>Grocery Store</h1>
        <button className="checkout-button" onClick={() => setSidebarStatus(true)}>
          <i className="fas fa-shopping-bag" />
          Checkout
        </button>
      </nav>
      <main style={sidebarStatus ? { marginRight: '300px' } : {}} >
        <ProduceList />
      </main>
      <div
        className="sidebar"
        style={sidebarStatus ? { transform: 'translateX(-100%)' } : {}}
      >
        <div className="sidebar-header">
          <button className="arrow-button" onClick={() => { setSidebarStatus(false) }}>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
        <Cart />
      </div>
    </>
  );
}

export default App;
