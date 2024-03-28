

import "../PizzaBlock/PizzaBlock.scss"

import { useEffect } from "react"
import PizzaItems from "../PizzaItems/PizzaItems.jsx"
import Categories from "../Categories/Categories.jsx"
import Sort from "../Sort/Sort.jsx"
import { useState } from "react"
import usePizzaService from "../../services/PizzaService.js"
import { Skeleton } from "./Skeleton.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { fetchPizzaList, setCurrentPage } from "../../redux/slices/pizzaSliceAsync.js"
import Pagination from "../Pagination/index.js"
const PizzaBlock = () => {
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();
    const pizzaList = useSelector(state => state.pizzaList.data.pizzas);
    const search = useSelector(state => state.search)
    const filter = useSelector(state => state.filter)
    const loading = useSelector(state => state.pizzaList.loading)
    const error = useSelector(state => state.pizzaList.error)
    const totalPages = useSelector(state => state.pizzaList.data.totalPages)
    const currentPage = useSelector(state => state.pizzaList.data.currentPg)
    const sort = useSelector(state => state.sort)
    console.log(loading)
    useEffect(() => {
        dispatch(fetchPizzaList());
    }, [search,sort,filter,currentPage]);
    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
      };
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
                <Pagination  onChangePage={onChangePage} currentPage={currentPage} totalPages={totalPages}/>
            </div>
        </div>
    );
}

export default PizzaBlock;