import React, {Component} from 'react'

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

    render() {
        return(
            <div className="post">
                Post
                {this.state.title}
                {this.state.img}
                {this.state.content}
                {this.state.username}
                {this.state.profile_pic}
            </div>
        )
    }
}