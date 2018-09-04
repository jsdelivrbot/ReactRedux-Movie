import React from 'react'


const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const VideoListItem = ({movie}) => {
    return <li className="list-group-item">
                <div className="media">
                    <div className="media-left">
                        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} width="100px" height="100px"/>
                    </div>
                    <div className="media-body">
                        <h5 className="title_list_item">{movie.title}</h5>
                    </div>
                </div>
            </li>
}

export default VideoListItem;