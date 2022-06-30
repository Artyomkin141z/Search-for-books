import React from 'react';

const BookFullCard = (props) => {

    return(
        <div className={props.active ? "modal active" : "modal"} 
            onClick={() => props.setActive(false)}
        >
            <div className='modal__content' onClick={e => e.stopPropagation()}>
                <img className='bookFull-img' src={props.img} alt = "Book cover"/>
                <div className='bookFull-inform'>
                    <p className='bookFull-title'>{props.title}</p>
                    <p className='bookFull-categoties'>{props.category}</p>       
                    <p className='bookFull-authors'>{props.autors}</p>
                    <div  className='bookFull-description'>
                    <p>{props.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookFullCard;