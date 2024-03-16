import '../app/app.scss'
import usePizzaService from '../../services/PizzaService'
import { useEffect, useRef, useState } from 'react';
import PizzaBlock from '../PizzaBlock/PizzaBlock.jsx';
import Promo from '../Promo/Promo.jsx';
import CartEmpty from '../Card/Card.jsx';
import MainLayout from '../../layouts/MainLayout.jsx';
import { Route, Routes, BrowserRouter  as Router } from 'react-router-dom';
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
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Promo />} />
                    <Route path="/other" element={<PizzaBlock />} />
                    <Route path='/cart' element={<CartEmpty/>} />
                </Route>
            </Routes>
        </Router>
    )
}


export default App