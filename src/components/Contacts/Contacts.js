import './Contacts.css';
import React from 'react';
import Select from 'react-select';
import { useState, useEffect } from "react";


function Contacts () {

    const [selectedOption, setSelectedOption] = useState([]);
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ errors, setErrors ] = useState({
        name: {
            isErrore: false,
            errorMessage: '',
            
        },
        email: {
            isErrore: false,
            errorMessage: '',
        },
        phone: {
            isErrore: false,
            errorMessage: '',
        },
        
    });
    const [ about, setAbout] = useState('');
    const [ checkbox, setCheckbox] = useState(false);
    const [ radio, setRadio] = useState('');
    const [ file, setFile] = useState('')
    const [ disableButton, setDisableButton] = useState(true)

    function changeValue (event) {
        setRadio(event.target.value);
    }

    useEffect(() => {
        let check = false
        Object.values(errors).forEach((item) => {
            if(item.isErrore) {
                check = true
            } 

        });
        setDisableButton(check)
    }, [errors])
    


    const onSubmit = (e) => {
        e.preventDefault();
        let result = {};
        result.email = email;
        result.name = name;
        result.phone = phone;
        result.select = selectedOption.map((item) => item.value);
        result.text = about;
        result.permission = checkbox;
        result.satisfyed = radio;
        result.file = file;
        console.log(result)
        
    };

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValidEmail = !!e.target.value?.match(regEmail);
            if (e.target.value) {
            setErrors((prevState) => {
                return {
                    ...prevState,
                    email: {
                        isErrore: !isValidEmail,
                        errorMessage: `${isValidEmail ? '' : '???????????????????????? email'}`
                    }
                }
            })}
    }


    const {name: nameError, email: emailError, phone: phoneError, select: selectError} = errors;
    
    const options = [
        { value: '???????? ???????????????? ?????????? ?? ????????????????', label: '???????? ???????????????? ?????????? ?? ????????????????', className: 'select__options' },
        { value: '?? ???? ?????????????? ?????????????? ??????????????', label: '?? ???? ?????????????? ?????????????? ??????????????', className: 'select__options' },
        { value: '?????? ?????????????? ????????', label: '?????? ?????????????? ????????', className: 'select__options' },
        { value: '???????????? ???? ?????????????? ??????????????', label: '???????????? ???? ?????????????? ??????????????', className: 'select__options' }
      ]
      
        useEffect(() => {

            if (name.length < 2 && name.length) {
                setErrors(prevState => {
                    return {
                        ...prevState,
                        name: {
                            isErrore: true,
                            errorMessage: "?????????????? ???????????????????? ??????",
                        },
                    };
                });
            } else {
                setErrors((prevState) => {
                    return {
                        ...prevState,
                        name: {
                            isErrore: false,
                            errorMessage: "",
                        }
                    }
                })
            }
        }, [name]);


        useEffect(() => {
            const regTel = /^\(?(\d{4})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
            const isValidTel = !!phone?.match(regTel);
            if (phone) {
                setErrors((prevState) => {
                    return {
                        ...prevState,
                        phone: {
                            isErrore: !isValidTel,
                            errorMessage: `${isValidTel ? '' : '???????????????????????? ??????????'}`
                        }
                    }
                })
            }
        }, [phone])

        return (
        <>
            <h1 className="contacts-header">????????????????</h1>
            <div className="contact-container">
                <div>???? ???????? ???????????????? ???? ?????? ???????????????????????? ?????? ??????????????!</div>
                <h2 className="contact-container__header">?????????????????? ?? ????????</h2>
                <p>???????????????????? ???????????? ?? ???????????? ?????????? ??? <a href="tel:8 800 777-68-93">8 800 777-68-93, </a>
                <a href="tel:+7(952) 409-99-90">+7(952) 409-99-90</a> </p>
                <p>?????????????????????????????????????? ??? <a href="mailto:office@supershop.ru">office@supershop.ru</a></p>
                <p>?????????????????? ?? PR ??? <a href="mailto:marketing@supershop.ru">marketing@supershop.ru</a></p>
                <p>?????????????????????????????? ??? <a href="mailto:hr@supershop.ru">hr@supershop.ru</a></p>
                <p>?????????????? ?????????????? ?????????????? ??? <a href="mailto:opt@supershop.ru">opt@supershop.ru</a></p>
                <h2 className="contact-container__header">???????????????? ??????????????????</h2>

                <form className="contacts-form" onSubmit={(e) => onSubmit(e)}>
                    <label htmlFor="email" className="contacts-form__label">
                        <span className="contacts-form__req">*</span>
                        Email
                        {emailError.isErrore && <span className="contacts-form__error-email">{emailError.errorMessage}</span>} 
                    </label>

                    <div className="contacts-form__input">
                        <input
                            type="text"
                            id="email"
                            placeholder="?????????????? email"
                            className="contacts-form__input-text"
                            value={email}
                            required
                            onChange={(e) => emailHandler(e)}
                        />
                    </div>

                    <label htmlFor="name" className="contacts-form__label">
                        <span className="contacts-form__req">*</span>
                        ??????
                        {nameError.isErrore && <span className="contacts-form__error-name">{nameError.errorMessage}</span>}
                    </label>
                    <div className="contacts-form__input">
                        <input
                            type="text"
                            id="name"
                            placeholder="???????????? ??????"
                            className="contacts-form__input-text"
                            value={name}
                            required
                            onChange ={(e) => setName(e.target.value)}
                        />
                    </div>
                    
                    <label htmlFor="phone" className="contacts-form__label">??????????????
                        {phoneError.isErrore && <span className="contacts-form__error-phone">{phoneError.errorMessage}</span>}
                    </label>

                    <div className="contacts-form__input">
                        <input
                            type="tel"
                            id="phone"
                            placeholder="????????.: 89111234567"
                            className="contacts-form__input-text"
                            value={phone}
                            required
                            onChange = {(e) => setPhone(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="complaint" className="contacts-form__label"><span className="contacts-form__req">*</span>???????? ??????????????????
                            <span className="contacts-form__error-select"></span>
                        </label>
                        <Select isMulti placeholder='???????????????? ???????? ??????????????????' className='contacts-form__select' id='complaint' required={true}
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                                styles = { (baseStyle, state) => ({
                                    ...baseStyle,
                                    color: state.isFocused ? '#01996D' : 'black',
                                    backgroundColor: state.isSelected ? '#01996D' : 'none'
                                }) }
                                theme = {(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                        ...theme.colors,
                                        primary: '#01996D',
                                        primary25: '#01996D',
                                        neutral50: 'black',
                                        neutral30: '#01996D',
                                    },
                                })}
                        /> 
                    </div>
                    
                    <label htmlFor="about" className="contacts-form__label textarea-label">?????? ????????????, ?????????? ?????? ??????????????????</label>
                    
                    <div className="contacts-form__textarea-input">
                        <textarea id="about" name="about" 
                        placeholder="" 
                        className="contacts-form__textarea-input_text"
                        value={about}
                        onChange = {(e) => setAbout(e.target.value)}
                        rows="6"
                        ></textarea>
                    </div>
                    
                    <div className="contacts-form__label radio-label">???????????????? ???? ???? ?????????? ??????????????????</div>
                    <div className="contacts-form__radio">
                        <input type="radio" 
                               id="radio1" 
                               name="satisfied" 
                               value="yes" 
                               className="contacts-form__radio-input" 
                               checked={radio === 'yes' ? true : false}
                               onChange={changeValue}
                        />
                        <label htmlFor="radio1" className="contacts-form__radio-label">????</label>
                    </div>
                    <div className="contacts-form__radio">
                        <input type="radio" 
                               id="radio2" 
                               name="satisfied" 
                               value="no" 
                               className="contacts-form__radio-input" 
                               checked={radio === 'no' ? true : false}
                               onChange={changeValue}
                               />
                        <label htmlFor="radio2" className="contacts-form__radio-label">??????</label>
                    </div>
                    
                    <div className="contacts-form__label-value">?????????????????? ???????? ??????????????</div>
                    <label className="contacs-form__input-file">
                        <span className="contacs-form__input-file-text" type="text"></span>
                        <input className="contacs-form__input-file_value" type="file" 
                               name="file"
                               value = {file}
                               onChange={(e) => setFile(e.target.value)}/>        
                        <span className="contacs-form__input-file-btn">???????????????? ????????</span>
                    </label>

                    <div className="contacts-form__checkbox">
                        <input
                            type="checkbox"
                            id="permission"
                            className="contacts-form__checkbox-input"
                            value={checkbox}
                            onChange ={(e) => setCheckbox(e.target.checked)}
                        />
                        <label htmlFor="permission" className="contacts-form__checkbox-label">
                            ?? ???????????????? ???????????????? ???????????????????? ???? ??????????</label>
                    </div>
                    <input className="contacts-form__button" type="submit" value="??????????????????" disabled={disableButton}/>
                </form>
            </div>
        </>
    )
}

export default Contacts