import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cart";
import { toggleLike } from "../../store/produce";

function ProduceDetails({ produce }) {
  const cart = useSelector(state => state.cart);
  const cartItem = Object.values(cart).find(item => item.id === produce.id);
  const dispatch = useDispatch();

  return (
    <li className="produce-details">
      <span>{produce.name}</span>
      <span>
        <button
          className={"like-button" + (produce.liked ? " selected" : "")}
          onClick={() => dispatch(toggleLike(produce.id))}
        >
          <i className={"fas fa-heart"} />
        </button>
        <button
          className={"plus-button" + (cartItem ? " selected" : "")}
          onClick={() => dispatch(addToCart(produce.id, cartItem ? cartItem.count + 1 : 1))}
        >
          <i className="fas fa-plus" />
        </button>
      </span>
    </li>
  );
}

export default ProduceDetails;
