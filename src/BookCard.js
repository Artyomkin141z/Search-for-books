import React, { useState } from 'react';
import BookFullCard from './BookFullCard';

const BookCard = (props) => {
    
    let [modalActive, setModaldActive] = useState(false);
    
    function checkLength (str){
        str = String(str);
        if(str.length > 45 && str){
            str = str.substr(0, 45) + "...";
        }
        else if(str === "undefined"){
            str = "--Can't ask for property--";
        }
        return str;
    }
    return(
        <div>
        <div className='BookCard'
            onClick={() => setModaldActive(true)}
        >
            <img className='book-img' src={props.img} alt = "Book cover"/>
            <div className='book-inform'>
                <p className='book-categoties'>{props.category}</p>
                <p className='book-title'>{checkLength(props.title)}</p>
                <p className='book-authors'>{props.autors}</p>
            </div>
            
        </div>
            <BookFullCard
                active = {modalActive}
                setActive = {setModaldActive}
                img = {props.img}                            
                title = {props.title}
                category = {props.category}
                autors = {props.autors}
                description = {props.description}
            />
        </div>
    );
}

export default BookCard;