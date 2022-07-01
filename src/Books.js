import React, { Component } from 'react';
import SearchBox from './SeatchBox';
import Header from './Header';
import BookList from './BookList';
import request from "superagent";

//AIzaSyCwcY9nfyZVj9E_FX1xP78Lqltec98vIkY

class Books extends Component{
    constructor(props){
        super(props);
        this.isFound = false;
        this.isEnd = false;
        this.state = {
            books: [],
            searchField: "",
            categories: "All",
            sortingBy: "relevance",
            countResult: 0,
            loadItems: 0,
        }
    }

    getCategories = () => {
        if(this.state.categories === "All"){
            return "";
        }
        else {
            return "+subject:" + this.state.categories;
        }
    }

    searchBook = async (e) =>{
        e.preventDefault();
        request
            .get("https://www.googleapis.com/books/v1/volumes")
            .query(
                {
                    q: this.state.searchField + this.getCategories(), 
                    maxResults: 30,
                    orderBy: this.state.sortingBy,  
                    startIndex: 0,  
                    // key: "AIzaSyCwcY9nfyZVj9E_FX1xP78Lqltec98vIkY",
                })
            .then((data)=>{
                this.setState({loadItems: this.state.loadItems});
                this.setState({books: [...data.body.items]});
                this.setState({countResult: data.body.totalItems});
                this.isFound = true;
                this.checkCountLoadItems(data.body.totalItems);
            })
            .catch(() => {
                this.setState({countResult: 0});
                this.setState({books: []});
                this.isFound = true;
                this.checkCountLoadItems(0);
                
            })
    }

    searchMore = (e) => {
        e.preventDefault();

        request
            .get("https://www.googleapis.com/books/v1/volumes")
            .query(
                {
                    q: this.state.searchField + this.getCategories(), 
                    maxResults: 30,
                    orderBy: this.state.sortingBy,  
                    startIndex: this.state.loadItems,  
                })
            .then((data)=>{
                this.setState({loadItems: this.state.loadItems + 30});
                this.setState({books: this.state.books.concat([...data.body.items])});
                this.setState({countResult: data.body.totalItems});
                this.checkCountLoadItems(data.body.totalItems);
            })
            .catch(() => {
                console.log(alert);
            })
    }

    checkCountLoadItems = (countResult) => {
        if(countResult < this.state.loadItems + 30){
            this.isEnd = true;
        }
        else this.isEnd = false;
    }

    checkFound = (i) => {
        if(this.isFound && i === 1){
            return(
                <p className='found-text'>Found {this.state.countResult} result</p>
            );
        }
        if(this.isFound && i === 2){
            if(this.isEnd){
                return(
                    <p className='wrapper-load'><p className='loadMore-text end-click'>End</p></p>
                );
            }
            else return(
                <p className='wrapper-load'><p onClick = {this.searchMore} className='loadMore-text click-loadMore'>Load more</p></p>
            );
        }
    }

    handleSearch = (e) => {
        this.setState({searchField: e.target.value});
        this.isShowPreloder = true;
    }

    handleCategories = (e) => {
        this.setState({categories: e.target.value});
    }

    handleSortingBy = (e) => {
        this.setState({sortingBy: e.target.value});
    }

    render(){
        return(
            <div className='App'>
                <header>
                    <div>
                        <Header />
                        <SearchBox 
                            handleSearch = {
                                this.handleSearch
                            } 
                            handleCategories = {
                                this.handleCategories
                            }
                            handleSortingBy = {
                                this.handleSortingBy
                            }
                            searchBook = {
                                this.searchBook
                            }
                        />
                    </div>
                </header>
                {this.checkFound(1)}
                <BookList books = {this.state.books} />
                {this.checkFound(2)}
            </div>
        );
    }
}

export default Books;