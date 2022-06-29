import React from 'react';

const BookCard = (props) => {
    function checkLength (str){
        if(str.length > 45){
            str = str.substr(0, 45) + "...";
        }
        return str;
    }
    return(
        <div className='BookCard'>
            <img src={props.img} alt = "Book cover"/>
            <div className='book-inform'>
                <p className='book-categoties'>{props.category}</p>
                <p className='book-title'>{checkLength(props.title)}</p>
                <p className='book-authors'>{props.autors}</p>
            </div>
        </div>
    );
}

export default BookCard;