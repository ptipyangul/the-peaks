import React, { Component } from 'react';

class BookmarkButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
           buttonLabel: 'ADD BOOKMARK',
           isExisted: null,
           newsId: null
        }
    }

    componentDidMount () {
        this.setState({ newsId: this.props.newsId}, () => {
            this.checkAndUpdateBookmarks();
        });
    }

    componentDidUpdate() {
    }

    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    checkAndUpdateBookmarks() {
        let bookmarks = localStorage.getItem('bookmarks');
        if (bookmarks) {
            bookmarks = JSON.parse(bookmarks);            
            let isExisted = ( this.getKeyByValue(bookmarks, this.state.newsId) >= 0 ) ? true : false;
            let newLabel = ( isExisted ) ? "REMOVE BOOKMARK" : "ADD BOOKMARK";
            this.setState({ isExisted: isExisted, buttonLabel: newLabel });
        }
    }

    handleBookmarkBtnClick () {
        let bookmarks = localStorage.getItem('bookmarks');
        bookmarks = JSON.parse(bookmarks);        
        if ( this.state.isExisted ) { // REMOVE
            let index = this.getKeyByValue(bookmarks, this.state.newsId);
            bookmarks.splice(index, 1);
        } else { // ADD
            if (bookmarks === null) bookmarks = [];
            bookmarks = [...bookmarks, this.state.newsId]; 
        }
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        this.checkAndUpdateBookmarks();
    }

    render ()  {
        return(
            <div>
                <button className="bookmarkBtn" onClick={() => this.handleBookmarkBtnClick(this)}>{this.state.buttonLabel}</button>
            </div>
        );
    };
}

export default BookmarkButton;