import './Basket.css'
import { useSelector } from "react-redux"
import OneCard from "../OneCard/OneCard";


function Basket() {

    const goods = useSelector(state => state.goods.entities);
    const basket = useSelector(state => state.basket);
    return (
        <div className='basket'>
            <div className='basket__price'>
                <span className='basket__price-name'>Общая стоимость </span><span className='basket__price-value'>{ goods.reduce((acc, good) => {
                if (basket[good.id]) {
                acc += good.price * basket[good.id];}
                return acc}, 0) }</span>
            </div>
            <div className="cards">
                {goods
                    .filter((good) => basket[good.id])
                    .map((good) => {
                        return (
                            <OneCard key={good.id} 
                                        images={good.images} 
                                        title={good.title} 
                                        category={good.category} 
                                        price={good.price} 
                                        id={good.id} /> 
                        )
                    })} 
                    
            </div>
            <button className="basket__button" >Оплатить</button>
        </div>
    )
}

export default Basket