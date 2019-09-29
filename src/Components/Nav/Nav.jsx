import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './nav.css'
import {updateUser, logout} from '../../ducks/reducer'
import axios from 'axios'


class Nav extends Component {
    constructor() {
        super()

        this.state = {

        }
    }

    componentDidMount() {
        axios.get('/api/auth/me').then(res => {
            this.props.updateUser(res.data)
        })
    }

    logout() {
        axios.post('/auth/logout').then(res => {
            this.props.logout()
        })
    }

    render() {
        return(
            <div className="nav">
                <h2>{this.props.username.username}</h2>
                <img src={this.props.username.profile_pic} alt="Users Profile Picture"/>
                <button><Link to={'/dashboard'}>Home</Link></button>
                <button><Link to={'/new'}>New Post</Link></button>
                <button onClick={() => this.logout()}><Link to={'/'}>Logout</Link></button>
            </div>
        )
    }

    
}

function mapStateToProps(reduxState) {
    const {username, profile_pic} = reduxState
    return {username, profile_pic}
}

export default connect(mapStateToProps, {updateUser, logout})(Nav)