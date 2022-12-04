import './Card.css';
import { useState, useEffect } from "react";
import Input from '../Input/Input'     
import Categories from '../Categories/Categories';
import OneCard from '../OneCard/OneCard';
import { useDispatch, useSelector } from 'react-redux';
import { clearBasket } from '../../store/basket/basketSlice';
import { getGoods } from '../../store/Products/goodsSlice';


function Card() {
  const [ goods, isLoading ] = useSelector((state) => [ state.goods.entities, state.goods.loading ]);
  const [ activeCategory, setActiveCategory ] = useState(null);
  const [ shownGoods, setShownGoods] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  const basket = useSelector(state => state.basket);

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getGoods());
  }, []);

  useEffect(() => {
    if (activeCategory === null) {
      setShownGoods(goods)
  } else {
    const newShownGoods = goods.filter((el) => el.category.name === activeCategory.name)
    setShownGoods(newShownGoods);
  }
    
  }, [goods, activeCategory]);
  
  
  return (
      <>
          <Input inputValue={inputValue} setInputValue={setInputValue}/>
          <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          <h1 className="App__header">Товары в наличии</h1>
          <div className="app__button">
              {!(Object.values(basket).length) ? 
                        <button className='app__button-remove_disabled' >Очистить корзину</button> : null}
              {Object.values(basket).length ? 
                        <button className='app__button-remove' onClick={() => dispatch(clearBasket())}>Очистить корзину</button> : null}
          </div>
          
          
          <div className="cards">
            
            {!isLoading && shownGoods.filter(good => good.title.toLowerCase().includes(inputValue.toLowerCase()))
                                      .map(good => {
              const { images, title, category, price, id } = good;
              return ( 
                <OneCard key={id} 
                         images={images} 
                         title={title} 
                         category={category} 
                         price={price} 
                         id={id} />

              )
            })}
            {
              isLoading && (
                <h2>Loading...</h2>
              )
            }
            
          </div> 
      </>
  )

}

export default Card;
