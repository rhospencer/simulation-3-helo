import React, {Component} from 'react'
import axios from 'axios'

export default class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            img: '',
            content: '',
            username: '',
            profile_pic: ''
        }
    }



    componentDidMount() {
        console.log(+this.props.match.params.id)
        axios.get(`/api/post/${+this.props.match.params.id}`).then(res => {
            this.setState({title: res.data.title, img: res.data.img, content: res.data.content, username: res.data.username, profile_pic: res.data.profile_pic})
            console.log(this.state)
        })
    }

    render() {
        return(
            <div className="post">
                {this.state.title}
                <br/>
                <img src={this.state.img} alt="Post Image"/>
                <br/>
                {this.state.content}
                <br/>
                {this.state.username}
                <br/>
                <img src={this.state.profile_pic} alt="User Profile Picture"/>
            </div>
        )
    }
}