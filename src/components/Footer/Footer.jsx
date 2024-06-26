import "../Footer/Footer.scss"
import { Link } from "react-router-dom"
import { UseSelector } from "react-redux"
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <Link to={'/about'} className="footer__link">
                    Про нас
                </Link>
            </div>
        </footer>
    )
}

export default Footer