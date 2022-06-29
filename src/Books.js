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
            console.log(this.state.categories);
            return "+subject:" + this.state.categories;
        }
    }

    searchBook = (e) =>{
        e.preventDefault();
        
        request
            .get("https://www.googleapis.com/books/v1/volumes")
            .query(
                {
                    q: this.state.searchField + this.getCategories(), 
                    maxResults: 30,
                    orderBy: this.state.sortingBy,  
                    startIndex: 0,  
                    key: "AIzaSyCwcY9nfyZVj9E_FX1xP78Lqltec98vIkY",

                })
            .then((data)=>{
                this.setState({loadItems: this.state.loadItems});
                this.setState({books: [...data.body.items]});
                this.setState({countResult: data.body.totalItems});
                this.isFound = true;
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
                    key: "AIzaSyCwcY9nfyZVj9E_FX1xP78Lqltec98vIkY",

                })
            .then((data)=>{
                // console.log(this.state.categories);
                console.log(data);
                console.log(this.state.searchField  + this.getCategories());
                this.setState({loadItems: this.state.loadItems + 30});
                this.setState({books: this.state.books.concat([...data.body.items])});
                this.setState({countResult: data.body.totalItems});
            })
    }

    checkCountLoadItems = () => {
        if(this.state.countResult < this.state.loadItems + 30){
            this.setState({loadItems: this.state.loadItems + 30});
        }
        else this.isEnd = true;
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
                    <p className='wrapper-load'><p className='loadMore-text'>End</p></p>
                );
            }
            else return(
                <p className='wrapper-load'><p onClick = {this.searchMore} className='loadMore-text'>Load more</p></p>
            );
        }
    }

    handleSearch = (e) => {
        this.setState({searchField: e.target.value});
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
                </header>
                {this.checkFound(1)}
                <BookList books = {this.state.books} />
                {this.checkFound(2)}
            </div>
        );
    }
}

export default Books;