import React, {Component} from 'react'
import SearchBar from '../components/search-bar'
import VideoList from './video-list'
import axios from 'axios'


const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "api_key=49a7c834e4ee728f7194deb5586b9d39"


class App extends Component {

    constructor (props) {
        super(props)
        this.state = {movieList:{},currentMovie:{}}
    }

    componentWillMount () {
        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function(response){
            this.setState({movieList:response.data.results.slice(1,6)});
            this.setState({currentMovie:response.data.results[0]})
            console.log("-----------");
            console.log("", this.state.movieList);
            console.log("-----------");
        }.bind(this));
    }

    render () {
        return (
            <div>
                <SearchBar/>
                <VideoList/>
            </div>
        )
    }
}

export default App;