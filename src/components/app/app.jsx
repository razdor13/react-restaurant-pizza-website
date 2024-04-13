import '../app/app.scss'
import PizzaBlock from '../../pages/PizzaBlock/PizzaBlock.jsx';
import Promo from '../../pages/Promo/Promo.jsx';
import CartEmpty from '../../pages/Card/Card.jsx';
import MainLayout from '../../layouts/MainLayout.jsx';

import { Route, Routes } from 'react-router-dom';

import NotFound from '../NotFound/NotFound.jsx';
import About from '../../pages/About/About.jsx';
import Story from '../../pages/About/Story.jsx';
import Contact from '../../pages/About/Contact.jsx';
const App = () => {

    return (

        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Promo />} />
                <Route path="/pizzas" element={<PizzaBlock />} />
                <Route path="/cart" element={<CartEmpty />} />
                <Route path="/about" element={<About />}>
                    <Route index element={<Story />} />
                    <Route path="contact" element={<Contact />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>


    )
}


export default App