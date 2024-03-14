import "../Promo/Promo.scss"
import pizzaPromo from '../../static/pizza2.png'
import Ecllipse from '../../static/Ellipse 1.png'
const Promo = () => {
    return (
        <div class="wrepper_promo">
            <div class="promo_info_section">
                <h2 className="title_promo">Meet, Eat & <span>Enjoy</span> The <span>Taste</span></h2>
                <div class="description_introduction">
                    <h3 class="info">Food tastes better when you share it with your family and friends.</h3>
                    <div class="btn_block">
                        <button class="Place_Order_btn">Place Order</button>
                        <button class="Get_Started_btn">Get Started</button>
                    </div>
                </div>
            </div>
            <div class="promo_img_section">
                <img class="ecllipse" src={Ecllipse} alt=""></img>
                <img class="pizza2" src={pizzaPromo} alt=""></img>
            </div>       
        </div>
        )
}


export default Promo