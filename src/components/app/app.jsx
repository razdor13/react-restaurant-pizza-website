import '../app/app.scss'
import usePizzaService from '../../services/PizzaService'
import { useEffect, useRef, useState } from 'react';
import Header from '../Header/Header.jsx';
import Categories from '../Categories/Categories.jsx';
import Sort from '../Sort/Sort.jsx';
import PizzaBlock from '../PizzaBlock/PizzaBlock.jsx';
const App = () => {

    const { loading, error, getHelloWorld } = usePizzaService();
    const [message, setMessage] = useState()

    useEffect(() => {
        // onRequest()

    }, [])

    const onRequest = () => {
        getHelloWorld()
            .then(res => setMessage(() => res.message))
    };

    return (
        <div className="wrapper">
            <Header />
            <div className='content'>
                <div className="container">
                    <div className='content__top'>
                        <Categories/>
                        <Sort/>
                    </div>
                    <div className='content__title'>Все пиццы</div>
                    <div className='content__items'>
                        <PizzaBlock/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default App