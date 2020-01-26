import React from 'react';
import * as API from '../../services/APIService';
import axios from 'axios';

export default class Tags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: []
        }
    }
    source = axios.CancelToken.source();

    componentDidMount() {
        this.getTags();
    }

    componentWillUnmount() {
        this.source.cancel('componente tag');
    }

    getTags = async () => {
        const tags = await API.getTags(this.source);
        if ( tags )
            this.setState({tags});
    } 

    renderTags = tags => {
        return (
            tags.map( tag => <option key={tag} value={tag}>{tag}</option>) 
        );
    }

    onChange = evt => {
        const selectedIndex = evt.target.selectedIndex - 1; // Descontar el 'Select a tag'  
        const selectedTag = this.state.tags[ selectedIndex ];

        this.props.onTagSelected(selectedTag);
    }

    onMultipleChange = evt => {
        let selectedTags = ([...evt.target.options].filter(options => options.selected).map( option => option.value ));
        this.props.onTagSelected(selectedTags);
    }

    render(){
        const { tags } = this.state;
        const required_ = this.props.required;
        return (
            <div>
                {
                (tags && tags.length && !this.props.multiple) ? 
                (
                    <select defaultValue="" required={required_} className="form-control" id="tags-select" onChange={this.onChange}>
                        <option value="" disabled>Select a tag</option>
                        { this.renderTags(tags) }
                    </select>
                ) : 
                (
                    <select multiple value={this.props.selectedTags} required={required_} className="form-control" id="tags-select" onChange={this.onMultipleChange}>
                        { this.renderTags(tags) }
                    </select>
                )
                }
            </div>
        );
    }
}