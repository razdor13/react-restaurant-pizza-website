

import "../PizzaBlock/PizzaBlock.scss"

import { useEffect } from "react"
import PizzaItems from "../PizzaItems/PizzaItems.jsx"
import Categories from "../Categories/Categories.jsx"
import Sort from "../Sort/Sort.jsx"
import { useState } from "react"
import usePizzaService from "../../services/PizzaService.js"
import { Skeleton } from "./Skeleton.jsx"
const PizzaBlock = () => {
    const { loading,setLoading, error, getPizzaBySort } = usePizzaService();
    const [items, setItems] = useState([]);

    useEffect(() => {
        setLoading(true)
        onRequest()
    }, []);

    const onRequest = () => {
        getPizzaBySort("price",3,'пе',1)
            .then(res => setItems(res))
            .catch(error => console.error('Error fetching data:', error));
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
                        items.map(obj => <PizzaItems {...obj} key={obj.id} />)
                    )}
                </div>
            </div>
        </div>
    );
}

export default PizzaBlock;