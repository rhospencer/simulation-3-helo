import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './nav.css'

class Nav extends Component {
    constructor() {
        super()

        this.state = {

        }
    }

    render() {
        return(
            <div className="nav">
                <h2>{this.props.username.username}</h2>
                <img src={this.props.username.profile_pic} alt="Users Profile Picture"/>
                <button><Link to={'/dashboard'}>Home</Link></button>
                <button><Link to={'/new'}>New Post</Link></button>
                <button><Link to={'/'}>Logout</Link></button>
            </div>
        )
    }

    
}

function mapStateToProps(reduxState) {
    const {username, profile_pic} = reduxState
    return {username, profile_pic}
}

export default connect(mapStateToProps)(Nav)