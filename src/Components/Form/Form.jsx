import React, {Component} from 'react'
import './form.css'
import {connect} from 'react-redux'
import axios from 'axios'

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            img: '',
            content: ''
        }
    }

    handleChange(e, key) {
        this.setState({[key]: e.target.value})
    }

    addPost() {
        if (this.props.id) {
            axios.post(`/api/newpost/${this.props.id.id}`, this.state).then(res => {
                this.props.history.push('/dashboard')
            })
        } else {
            alert('Must be logged in to create post.')
        }
    }

    render() {
        return(
            <div className="form">
                {console.log(this.props.id.id)}
                Form
                <input onChange={e => this.handleChange(e, 'title')} placeholder="Title" type="text" value={this.state.title}/>
                <input onChange={e => this.handleChange(e, 'img')} placeholder="Image" type="text" value={this.state.img}/>
                <input onChange={e => this.handleChange(e, 'content')} placeholder="Content" type="text" value={this.state.content}/>
                {!this.state.img 
                ? 
                (<img src='http://www.vacationseastafrica.com/images/img-placeholder.jpg'/>)
                :
                (<img src={this.state.img} alt="Post Img"/>)}
                <button onClick={() => this.addPost()}>Post</button>
                
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        id: reduxState.id
    }
}

export default connect(mapStateToProps)(Form)