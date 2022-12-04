import './OneCard.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket } from '../../store/basket/basketSlice'

function OneCard({images, title, category, price, id }) {
    
    const dispatch = useDispatch();
    const products = useSelector((state) => state.basket);
    
    const onByClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(addToBasket(id));
    }

    const onDeleteClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(removeFromBasket(id))
    }
    return (
        <>
            <Link to={`products/${id}`} key={id} className="cards__card">
                    <div className="cards__card-title"><div className="cards__card-title-value">{title}</div></div>
                    <img src={images} alt="product-image" className="cards__card-image"/>
                    <div>
                        <span className="cards__card-category">Категория: </span>
                        <span className="cards__card-category-value">{category.name}</span>
                    </div>
                    <div>
                        <span className="cards__card-price">Цена: </span>
                        <span className="cards__card-price-value">{price}</span>
                    </div>
                    
                    {!products[id] && <button className="cards__card-button" onClick={onByClick}>В корзину</button>}
                    {products[id] && (
                        <div className="cards__button-container">
                            <button className="cards__button-container_change" onClick={onDeleteClick}>-</button>
                            <span className="cards__button-container_amount">{ products[id] }</span>
                            <button className="cards__button-container_change" onClick={onByClick}>+</button>
                        </div>
                    )}

            </Link>
                
               
        </>
    )
}

export default OneCard