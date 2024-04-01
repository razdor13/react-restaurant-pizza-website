import "../Promo/Promo.scss"
import pizzaPromo from '../../static/pizza2 (2).png'
import Ecllipse from '../../static/Ellipse 1.png'
import { Link } from "react-router-dom"
import ScrollReveal from 'scrollreveal'
import { useEffect } from "react"


ScrollReveal({
    reset: true,
    distance: '500px',
    duration: 2000,
    delay:200
})

const Promo = () => {
    useEffect(() => {
        ScrollReveal().reveal(`.promo_info_section`,{origin:"bottom"})
        ScrollReveal().reveal(`.promo_img_section`,{origin:"top"})
    },[])
    return (
        <div className="wrepper_promo">
            <div className="promo_info_section">
                <h2 className="title_promo">Meet, Eat & <span>Enjoy</span> The <span>Taste</span></h2>
                <div className="description_introduction">
                    <h3 className="info" >Food tastes better when you share it with your family and friends.</h3>
                    <div className="btn_block">
                        <Link to="/pizzas"  className="Place_Order_btn" >Go</Link>
                        <Link to="/gg" className="Get_Started_btn">?</Link>
                    </div>
                </div>
            </div>
            <div className="promo_img_section">
                <img className="ecllipse" src={Ecllipse} alt=""></img>
                <img className="pizza2" src={pizzaPromo} alt=""></img>
            </div>       
        </div>
        )
}


export default Promo