import React, { Component } from 'react';
import Gif from './Gif';
import { isFavorited } from '../../helpers/gifs';

class GifList extends Component {
    // Convert to functional component.
    
    handleClick = event => {
        const { addFavoriteGif, removeFavoriteGif, gif } = this.props;
        const { gifs, favoriteGifs } = gif;
        const { id, classList } = event.target;
        const faveGif = gifs[id];
        const isFaveButton = classList.contains('fave-btn');

        // Spark animation
        if (isFaveButton) {
            if (isFavorited(id, favoriteGifs)) {
                classList.remove('active');
                removeFavoriteGif(id);
            } else {
                classList.add('active');
                addFavoriteGif(faveGif);
            };
        };
        
    };

    renderGifList = () => {
        const { gif } = this.props
        const { gifs } = gif;
        const gifIds = Object.keys(gifs);

        return gifIds.map(id => {
            const gif = gifs[id];
            const { title, images } = gif;
            const { original: { url } } = images;

            return <li key={id}><Gif id={id} title={title} url={url} /></li>;
        });
    };


    render() {
        return <ul onClick={this.handleClick} className="gif-list">{this.renderGifList()}</ul>
    };
};


export default GifList;