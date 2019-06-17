import React, { Component } from 'react'; 
import api from '../services/api';
import Spinner from 'react-spinner-material';

import './New.css';

class New extends Component {
    state = {
        loading: false,
        textButton: "Enviar",
        error: '',
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags:  '',
    };

    handleSubmit = async e => {
        e.preventDefault();

        if(this.state.image === null){
            this.setState({ error: "selecione uma imagem"});
        } else if (this.state.author.length < 1) {
            this.setState({ error: "informar local do post"}); 
        } else if (this.state.place.length < 1) {
            this.setState({ error: "informar local do post"}); 
        } else if (this.state.description.length < 1) {
            this.setState({ error: "informar descrição"}); 
        } else if (this.state.hashtags.length < 1) {
            this.setState({ error: "informar hashtags"}); 
        }else {

            const data = new FormData();
        
            data.append('image', this.state.image);
            data.append('author', this.state.author);
            data.append('place', this.state.place);
            data.append('description', this.state.description);
            data.append('hashtags', this.state.hashtags);
            
            this.setState({ loading: true });
            
            await api.post('posts', data);

            this.props.history.push('/');
        }
        
    }

    handleImageChange = e => {
        this.setState({ image: e.target.files[0] });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const {loading} = this.state;
        return(
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleImageChange} />

                <input
                    type="text"
                    name="author" 
                    placeholder="Autor do post"
                    onChange={this.handleChange}
                    value={this.state.author}
                />

                <input
                    type="text"
                    name="place" 
                    placeholder="Local do post"
                    onChange={this.handleChange}
                    value={this.state.place}
                />

                <input
                    type="text"
                    name="description" 
                    placeholder="Descrição do post"
                    onChange={this.handleChange}
                    value={this.state.description}
                />

                <input
                    type="text"
                    name="hashtags" 
                    placeholder="Hashtags do post"
                    onChange={this.handleChange}
                    value={this.state.hashtags}
                />

                <button type="submit" disabled={loading}>
                    { loading && <Spinner size={30} spinnerColor={"#fff"} spinnerWidth={2} visible={true} />}
                     { !loading && this.state.textButton } 
                </button>

                <h4>{this.state.error}</h4>
            </form>
        );
    }
}

export default New;