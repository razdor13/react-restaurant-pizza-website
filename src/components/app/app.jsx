import '../app/app.scss'
import PizzaBlock from '../PizzaBlock/PizzaBlock.jsx';
import Promo from '../Promo/Promo.jsx';
import CartEmpty from '../Card/Card.jsx';
import MainLayout from '../../layouts/MainLayout.jsx';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import NotFound from '../NotFound/NotFound.jsx';
import About from '../About/About.jsx';
import Story from '../About/Story.jsx';
import Contact from '../About/Contact.jsx';
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