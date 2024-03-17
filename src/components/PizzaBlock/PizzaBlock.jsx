
import "../PizzaBlock/PizzaBlock.scss"
import { useEffect } from "react"
import PizzaItems from "../PizzaItems/PizzaItems.jsx"
import Categories from "../Categories/Categories.jsx"
import Sort from "../Sort/Sort.jsx"
import { useState } from "react"
import usePizzaService from "../../services/PizzaService.js"
const PizzaBlock = () => {
    const { loading, error, getHelloWorld } = usePizzaService();
    const [items, setItems] = useState([]);

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = () => {
        getHelloWorld()
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
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
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