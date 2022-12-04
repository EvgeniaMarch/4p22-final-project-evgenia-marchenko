import './Categories.css';
import { useState, useEffect} from 'react';
import mockCategories from './mockCategories';


function Categories({activeCategory, setActiveCategory}) {
    const [categories, setCategories] = useState([]);
   
    useEffect(() => {
        setCategories(mockCategories);
    }, []);

    const onClick = (category) => {
        setActiveCategory(category);
    } 

    const showAll = () => {
        setActiveCategory(null);
    }
    

    return (
        <div className='categories'>
            <h2 className='categories__heading'>Категории товаров</h2>
            <div className='categories__container'>
                {categories.length > 0 && categories.map((el) => {
                    const {id, name, image} = el;
                    return (
                            <div key={id} className='container__cards'>
                                <div  onClick={() => onClick(el)} className={activeCategory !== null && activeCategory.name === el.name ? 'active' : 'not-active' } >
                                <div className="container__cards-title">{name}</div>
                                <img src={image} alt={`photo${name}`} className="container__cards-image"></img>
                                </div>
                            </div>
                    )
                })}
            </div>
            <button onClick={showAll} className='categories__button'>Показать все</button>
        </div>
    )
}

export default Categories