import { useDispatch, useSelector } from "react-redux";
import { selectCartList } from "../../redux/slices/cardSlice";
import { removeAllPizzasFromCart } from "../../redux/slices/cardSlice";
import CartItem from "../CartItem/CartItem.jsx";
import trash from "../../static/trash.svg"
import cart from "../../static/card.svg"
import CartEmpty from "./CardEmpty.jsx";
import { fetchPizzaList, setCurrentPage } from "../../redux/slices/pizzaSliceAsync.js"
import { Link } from "react-router-dom";

const Cart = () => {
    
    const dispatch = useDispatch()
    const cartPizzaList = useSelector(selectCartList)
    const totalCount = useSelector(state => state.cart.totalCount)
    const totalPrice = useSelector(state => state.cart.totalPrice)
    const pizza = cartPizzaList.map((pizza,i) => {
        return <CartItem {...pizza} key={pizza.sectionIdInCart}  sectionIdInCart={pizza.sectionIdInCart}  />
    })
    const removePizzas = () => {
        dispatch(removeAllPizzasFromCart())
        dispatch(fetchPizzaList())
    }
    if(!totalCount) {
        return <CartEmpty/>
    }
    return (
        <div className="container container--cart">
            <div className="cart__top">
                <h2 className="content__title">
                    <img src={cart} alt="" /> Корзина
                </h2>
                <div onClick={removePizzas} className="cart__clear">
                    <img src={trash} alt="trash" />
                    <span>Очистити кошик</span>
                </div>
            </div>
            <div className="content__items">
                {pizza}
            </div>
            <div className="cart__bottom">
                <div className="cart__bottom-details">
                    <span> Всього : <b>{totalCount} шт.</b> </span>
                    <span> Сума замовлення: <b>{totalPrice}$</b> </span>
                </div>
                <div className="cart__bottom-buttons">
                    <Link className="button button--outline button--add go-back-btn" to={'/pizzas'}>
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <span>Повернутись назад</span>
                    </Link>
                    <div className="button pay-btn">
                        <span>Сплатити зараз</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

