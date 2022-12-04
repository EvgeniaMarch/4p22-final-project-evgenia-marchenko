import React from 'react';
import './Input.css';


function Input ({inputValue, setInputValue}) {

    return (
        <div className="form-pannel">
            <div className="form-pannel__search-div">
                <label htmlFor="search" className="form-pannel__search-label">Поиск</label>
                <input type="text" 
                       placeholder="Поиск по названию" 
                       className="form-pannel__search-input" 
                       id="search" 
                       value={inputValue}  
                       onChange={(e) => setInputValue(e.target.value)}>
                </input>
            </div>
        </div>
    )
}

export default Input
