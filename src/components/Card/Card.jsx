import { useDispatch, useSelector, UseSelector } from "react-redux";
import { selectCartList } from "../../redux/slices/cardSlice";
import CartItem from "./cartItem.jsx";
import trash from "../../static/trash.svg"
import cart from "../../static/card.svg"


const Cart = () => {
    const dispatch = useDispatch()
    const cartPizzaList = useSelector(selectCartList)
    console.log(cartPizzaList)

    const pizza = cartPizzaList.map((pizza,i) => {
        console.log(pizza)
        return <CartItem {...pizza} key={i}   />
    })

    return (
        <div className="container container--cart">
            <div className="cart__top">
                <h2 className="content__title">
                    <img src={cart} alt="" /> Корзина
                </h2>
                <div className="cart__clear">
                    <img src={trash} alt="trash" />
                    <span>Очистити кошик</span>
                </div>
            </div>
            <div className="content__items">
                {pizza}
            </div>
            <div className="cart__bottom">
                <div className="cart__bottom-details">
                    <span> Всього : <b>1 шт.</b> </span>
                    <span> Сума замовлення: <b>1231$</b> </span>
                </div>
                <div className="cart__bottom-buttons">
                    <a className="button button--outline button--add go-back-btn" href="/">
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <span>Повернутись назад</span>
                    </a>
                    <div className="button pay-btn">
                        <span>Сплатити зараз</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

