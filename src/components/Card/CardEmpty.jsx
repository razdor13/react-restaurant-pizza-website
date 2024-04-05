import React from 'react';
import cart from '../../static/empty-cart.png'
import { Link } from 'react-router-dom';


const CartEmpty = () => {
  return (
    <div className='content'>
      <div className="cart cart--empty">
        <h2>
          Кошик порожній 😕
        </h2>
        <p>
          Ймовірно, ви ще не замовляли піцу.
          <br />
          Для того, щоб замовити піцу, перейдіть в меню 
        </p>
        <img src={cart} alt="Порожній кошик" />
        <Link to="/pizzas" className="button button--black">
          <span>Хочу їсти !</span>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty; 