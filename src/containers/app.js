import React, {Component} from 'react'
import SearchBar from '../components/search-bar'
import VideoList from './video-list'
import VideoDetail from '../components/video-detail'
import Video from '../components/video'
import axios from 'axios'

//Const API
const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const SEARCH_URL = "search/movie?language=fr&include_adult=false"
const API_KEY = "api_key=49a7c834e4ee728f7194deb5586b9d39"


class App extends Component {

    constructor (props) {
        super(props)
        this.state = {movieList:{},currentMovie:{}}
    }

    componentWillMount () {
        this.initMovies();
    }


    //Request + setState list film populaire & le best film
    initMovies (){
        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function(response){
            this.setState({movieList:response.data.results.slice(1,6),currentMovie:response.data.results[0]}, function(){
                this.applyVideoToCurrentMovie();
            });
        }.bind(this));
    }


    //Request + setState vidéo ID du film le plus populaire
    applyVideoToCurrentMovie () {
        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`).then(function(response){
            const youtubeKey = response.data.videos.results[0].key;
            let newCurrentMovieState = this.state.currentMovie;
            newCurrentMovieState.videoId = youtubeKey;
            this.setState({currentMovie : newCurrentMovieState});
        }.bind(this));
    }


    //Modifie le Current movie par le clic
    onClickListItem (movie){
        this.setState({currentMovie:movie},function () {
            this.applyVideoToCurrentMovie();
        })
    }

    //Modifie le currentMovie par la value de la searchBar
    onClickSearch (searchText){
        //Si il y a une valeur dans la search bar
        if (searchText) {
            //request API
            axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`).then(function(response){

                //Si réponse API
                if (response.data && response.data.results[0]) {
                    //Si réponse API différent de currentMovie
                    if (response.data.results[0].id != this.state.currentMovie.id) {
                        //Film de SearchBar -> CurrentMovie
                        this.setState({currentMovie: response.data.results[0]},() => {
                            this.applyVideoToCurrentMovie();
                        })
                    }
                }

                this.setState({movieList:response.data.results.slice(1,6),currentMovie:response.data.results[0]}, function(){
                    this.applyVideoToCurrentMovie();
                });
            }.bind(this));    
        }
    }


    render () {

        //Attente du retour de request async
        const renderVideoList = () => {
            if (this.state.movieList.length>=5) {
                return <VideoList movieList={this.state.movieList} callback={this.onClickListItem.bind(this)}/>
            }
        }

        return (
            <div>
                <div className="search_bar">
                    <SearchBar callback={this.onClickSearch.bind(this)}/>
                </div>
                

                <div className="row">
                    <div className="col-md-8">
                        <Video videoId={this.state.currentMovie.videoId} />
                        <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview} />
                    </div>
                    <div className="col-md-4">
                        {renderVideoList()}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;