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
                Post
                {this.state.title}
                <br/>
                {this.state.img}
                <br/>
                {this.state.content}
                <br/>
                {this.state.username}
                <br/>
                {this.state.profile_pic}
            </div>
        )
    }
}