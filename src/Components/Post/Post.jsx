import React, {Component} from 'react'

export default class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return(
            <div className="post">
                Post
                {this.props.el.title}
                by {this.props.author_id}
                {this.props.profile_pic}
            </div>
        )
    }
}