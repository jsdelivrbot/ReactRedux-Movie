import React,{Component} from 'react'

class SearchBar extends Component{

    constructor(props){
        super(props);
        this.state = {
            searchText:"",
            placeHolder:"Tapez votre film...",
            intervalBeforeRequest:1000,
            lockRequest: false
        }
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-8 input-group">
                    <input type="text" className="form-control input-lg" onChange={this.handleChange.bind(this)} placeholder={this.state.placeHolder}/>
                    <span className="input-group-btn">
                        <button className="btn btn-secondary" onClick={this.handleOnClick.bind(this)}>Go</button>
                    </span>
                </div>
            </div>
        )
    }

    //Entrée dans searchBar
    handleChange(event){
        this.setState({searchText:event.target.value});
        //Si lock n'est pas true (lock ouvert)
        if (!this.state.lockRequest) {
            //lock -> true
            this.setState({lockRequest:true})
            //Toute les intervalBeforeRequest, lancer une recherche
            setTimeout(function(){this.search()}.bind(this),this.state.intervalBeforeRequest)
        }
    }

    handleOnClick () {
        this.search();
    }

    //Envoi du callback de searchText
    search(){
        this.props.callback(this.state.searchText);
        this.setState({lockRequest:false})
    }
}

export default SearchBar