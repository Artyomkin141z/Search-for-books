import React from 'react';

const SearchBox = (props) => {
        return(
            <div>
                <form  className='search_box' action=''
                    onSubmit={props.searchBook}
                >
                    <input onChange={props.handleSearch} maxlength="100" type="text"></input>
                    <button onClick={props.searchBook} className='serch_button'></button>
                </form>
                <div className='filter_box'>
                    <div className='categories_box'>
                        <p className='filter_text'>Categories</p>
                        <select 
                            onChange={props.handleCategories}
                            onClick = {props.handleCategories}
                        >
                            <option>All</option>
                            <option>Art</option>
                            <option>Biography</option>
                            <option>Computers</option>
                            <option>History</option>
                            <option>Medical</option>
                            <option>Poetry</option>
                        </select>
                    </div>
                    <div className='sorting_box'>
                        <p className='filter_text'>Sorting by</p>
                        <select onChange={props.handleSortingBy}>
                            <option>relevance</option>
                            <option>newest</option>
                        </select>
                    </div>
                </div>
            </div>
        );
}

export default SearchBox;