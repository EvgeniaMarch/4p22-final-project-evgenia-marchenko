import './Header.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Header() {

    const basket = useSelector ((state) => state.basket)

    return (
        <header className='header'>
            <span className='header__name'><Link to={'/'}>SuperShop</Link></span>
            <div className="header__navigation">
                <span className='header__navigation-about'><Link to={'About'}>О нас</Link></span>
                <span className='header__navigation-contacts'><Link to={'Contacts'}>Контакты</Link></span>
                <span className='header__navigation-basket'><Link to={'Basket'}>Корзина
                    <sup>
                        { Object.values(basket).reduce((acc, item) => {
                        acc+= item;
                        return acc}, 0)}
                    </sup></Link>
                </span>
                <span className='header__navigation-enter'><Link to={'Enter'}>Вход/Регистрация</Link></span>
            </div>

        </header>
    )
}

export default Header;