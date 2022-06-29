import React from 'react';
import BookCard from './BookCard';

const BookList = (props) => {

    let imgUrl = "";

    function checkImg(book){
        if(book.volumeInfo.imageLinks === undefined){
            
            imgUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm81P7TSBIArdAfY2iNZysOqa5FDoCqxG-IQ&usqp=CAU";
        }
        else imgUrl = book.volumeInfo.imageLinks.thumbnail;
        return imgUrl;
    }

    return(
        <div className='BookList'>
            {
                props.books.map((book, i) => {
                    return(
                        <BookCard 
                            img = {checkImg(book)}                            
                            title = {book.volumeInfo.title}
                            category = {book.volumeInfo.categories}
                            autors = {book.volumeInfo.authors}
                            description = {book.volumeInfo.description}
                        />);
                })
            }
        </div>
    );
}

export default BookList;