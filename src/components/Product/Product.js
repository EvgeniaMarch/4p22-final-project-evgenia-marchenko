import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Product.css';
import { addToBasket, removeFromBasket } from '../../store/basket/basketSlice';
import { useDispatch, useSelector } from 'react-redux';


function Product() {
    const { id } = useParams();
    const [ goods, setGoods ] = useState([])
    const products = useSelector((state) => state.basket)
    const dispatch = useDispatch();
   
    useEffect(() => {
        (async () => {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
            const result = await response.json();
        setGoods(result)
        })();
        
    }, []);

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
        <div className="product-page">
            <h1 className="product-page__title">{goods.title}</h1>
            <div className="product-page__price-value">{goods.price}</div>
            <img src={goods.images} alt="product-image" className="product-page__image"/>
            <div className="product-page__description">Описание товара: </div>
            <div className="product-page__description-value">{goods.description}</div>
            
            {
                !products[id] && <button className="product-page__button" onClick={onByClick}>В корзину</button>
            }
            {
                products[id] && (<div className="product-page__button-container">
                    <button className="product-page__button-container_change" onClick={onDeleteClick}>-</button>
                <span className="product-page__button-container_amount">{ products[id] }</span>
                <button className="product-page__button-container_change" onClick={onByClick}>+</button>
                </div> )
            }
        </div>
        
    )
}

export default Product;