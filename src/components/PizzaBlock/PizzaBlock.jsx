

import "../PizzaBlock/PizzaBlock.scss"

import { useEffect } from "react"
import PizzaItems from "../PizzaItems/PizzaItems.jsx"
import Categories from "../Categories/Categories.jsx"
import Sort from "../Sort/Sort.jsx"
import { useState } from "react"
import usePizzaService from "../../services/PizzaService.js"
import { Skeleton } from "./Skeleton.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { fetchPizzaList } from "../../redux/slices/pizzaSliceAsync.js"
import Pagination from "../Pagination/index.js"
const PizzaBlock = () => {
    const { loading, error, getPizzaBySort } = usePizzaService();
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();
    const pizzaList = useSelector(state => state.pizzaList.data.pizzas);
    const search = useSelector(state => state.search)
    const filter = useSelector(state => state.filter)
    const sort = useSelector(state => state.sort)
    
    useEffect(() => {
        dispatch(fetchPizzaList());
    }, [search,sort,filter]);
    return (
        <div className='content'>
            <div className="container">
                <div className='content__top'>
                    <Categories/>
                    <Sort/>
                </div>
                <div className='content__title'>Все пиццы</div>
                <div className='content__items'>
                    {loading ? 

                        [...new Array(8)].map((_,index) => <div className="pizza-block-wrapper"><Skeleton key={index}/></div>)

                   

                     : error ? (
                        <div>Something went wrong. Please try again later.</div>
                    ) : (
                        pizzaList.map(obj => <PizzaItems {...obj} key={obj.id} />)
                    )}
                </div>
                <Pagination/>
            </div>
        </div>
    );
}

export default PizzaBlock;