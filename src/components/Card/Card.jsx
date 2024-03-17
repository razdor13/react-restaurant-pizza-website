import React from 'react';
import cart from '../../static/empty-cart.png'
import { Link } from 'react-router-dom';


const CartEmpty = () => {
  return (
    <div className='content'>
      <div class="cart cart--empty">
        <h2>
          Корзина пустая <icon>😕</icon>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={cart} alt="Empty cart" />
        <div to="/" class="button button--black">
          <span>Вернуться назад</span>
        </div>
      </div>
    </div>
  );
};

export default CartEmpty;