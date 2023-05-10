import React, { Component } from 'react';
import axios from 'axios';

export default class MarkButton extends React.Component {
	constructor(props) {
		super(props);

        this.handleClick = this.handleClick.bind(this);

		this.state = { 
            title: '',
            description: '',
            projectName: '',
            assignee: '',
            priority: '',
            status: '',
            type: '',
            users: [],
            projects: []
        };
	}

	componentDidMount() {
        axios.get('http://localhost:3000/tickets/'+this.props._id)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    projectName: res.data.projectName,
                    assignee: res.data.assignee,
                    priority: res.data.priority,
                    status: res.data.status,
                    type: res.data.type
                })
            })
            .catch((error) => { console.log(error); })

       
        axios.get('http://localhost:3000/users/')
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    users: res.data.map(user => user.name)
                })
            }
        })
        .catch((error) => { console.log(error); })

        
        axios.get('http://localhost:3000/projects/')
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    projects: res.data.map(project => project.name)
                })
            }
        })
        .catch((error) => { console.log(error); })
    }

    handleClick(e) {
        e.preventDefault();

        this.state.status !== 'Resolved' ?
        this.setState({status: 'Resolved'}) : 
        this.setState({status: 'Open'})

        const ticket = {
            title: this.state.title,
            description: this.state.description,
            projectName: this.state.projectName,
            assignee: this.state.assignee,
            priority: this.state.priority,
            status: this.state.status,
            type: this.state.type
        }

        axios.post('http://localhost:3000/tickets/update/' + this.props._id, ticket)
            .then(res => console.log(res.data));
            
        alert('Successfully updated.');
    }
	
	render() {
		return(
            this.state.status !== 'Resolved' ? 
            <a href="#" onClick={this.handleClick} 
            className="badge badge-success">Mark as Resolved</a> :
            <a href="#" onClick={this.handleClick}
            className="badge badge-secondary">Mark as Open</a>          
		);
	}
}