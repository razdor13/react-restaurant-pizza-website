import '../app/app.scss'
import usePizzaService from '../../services/PizzaService'
import { useEffect, useRef, useState } from 'react';
import Header from '../Header/Header.jsx';
import Categories from '../Categories/Categories.jsx';
import Sort from '../Sort/Sort.jsx';
import PizzaBlock from '../PizzaBlock/PizzaBlock.jsx';
import Promo from '../Promo/Promo.jsx';
import CartEmpty from '../Card/Card.jsx';
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
            <CartEmpty/>
        </div>
    )
}


export default App