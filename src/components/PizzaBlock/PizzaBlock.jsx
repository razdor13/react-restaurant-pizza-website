
import "../PizzaBlock/PizzaBlock.scss"
import pizzas from'../../static/pizza.json'
import PizzaItems from "../PizzaItems/PizzaItems.jsx"
import Categories from "../Categories/Categories.jsx"
import Sort from "../Sort/Sort.jsx"
const PizzaBlock = () => {
    
     
    
    return (
        <div className='content'>
                <div className="container">
                    <div className='content__top'>
                        <Categories/>
                        <Sort/>
                    </div>
                    <div className='content__title'>Все пиццы</div>
                    <div className='content__items'>
                        {pizzas.map((obj) => (<PizzaItems {...obj} />))}
                    </div>
                </div>
            </div>
    );
}


export default PizzaBlock