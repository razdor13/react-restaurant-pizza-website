
import { addPizzaInCart } from "../../redux/slices/pizzaSliceAsync";
import { setPizzaSize, setPizzaType } from "../../redux/slices/pizzaSliceAsync";
import { useDispatch, useSelector } from "react-redux";
import "../PizzaItems/PizzaItems.scss"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

function PizzaItems({ id, title, price, imageUrl }) {
  const dispatch = useDispatch()
  const cartList = useSelector(state => state.pizzaList.cartList)
  const totalCount = useSelector(state => state.pizzaList.totalCount)
  const count = useSelector(state => state.pizzaList.settings[id].count)
  const sizes = useSelector(state => state.pizzaList.data.sizes)
  const types = useSelector(state => state.pizzaList.data.types)
  const sizePizzaState = useSelector(state => state.pizzaList.settings[id].size)
  const typePizzaState = useSelector(state => state.pizzaList.settings[id].type)
  const setActiveSize = (size) => {
    dispatch(setPizzaSize({ pizzaId: id, newSize: size }))
  }
  const setActiveType = (type) => {
    dispatch(setPizzaType({ pizzaId: id, newType: type }))
  }
  const addInCart = () => {
     dispatch(addPizzaInCart({ id, title, price, imageUrl, sizePizzaState, typePizzaState })); // Оновити count після додавання піци
  }
  
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <LazyLoadImage className="pizza-block__image" src={imageUrl} height={260} effect="blur" alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={typePizzaState === typeId ? 'active' : ''}>
                {typeId}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size) => (
              <li
                key={size}
                onClick={() => setActiveSize(size)}
                className={sizePizzaState === size ? 'active' : ''}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{price} $</div>
          <button onClick={addInCart} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Додати</span>
            {count === 0 ?null : <i>{count}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}



export default PizzaItems;