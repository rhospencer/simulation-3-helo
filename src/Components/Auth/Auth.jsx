import React, {Component} from 'react'
import axios from 'axios'
import {updateUser} from '../../ducks/reducer'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

class Auth extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange(e, key) {
        this.setState({[key]: e.target.value})
    }

    register() {
        axios.post('/auth/register', this.state).then(res => {
            this.props.updateUser(res.data)
            this.props.history.push('/dashboard')
        })
    }

    login() {
        axios.post('/auth/login', this.state).then(res => {
            if (res.data.id) {
                this.props.updateUser(res.data)
                this.props.history.push('/dashboard')
            }
        })
    }

    render() {
        return(
            <div className="auth">
                Auth
                <input onChange={e => this.handleChange(e, 'username')} placeholder={'Username'} type="text"/>
                <input onChange={e => this.handleChange(e, 'password')} placeholder={'Password'} type="password"/>
                <button onClick={() => this.login()}>Login</button>
                <button onClick={() => this.register()}>Register</button>
            </div>
        )
    }
}

export default connect(null, {updateUser})(Auth)