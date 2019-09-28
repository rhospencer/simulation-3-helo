import React, {Component} from 'react'
import Post from '../Post/Post'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Dashboard extends Component {
    constructor() {
        super()

        this.state = {
            search: '',
            myPosts: true,
            posts: []
        }
    }

    componentDidMount() {
        this.getPosts(this.props.id.id)
    }

    handleSearchChange(e) {
        this.setState({search: e.target.value})
    }

    handleCheckBoxChange() {
        this.setState({myPosts: !this.state.myPosts})
    }

    getPosts(id) {
        axios.get(`/api/posts/${id}?userposts=${JSON.stringify(this.state.myPosts)}&search=${this.state.search}`)
        .then(res => {
            this.setState({posts: res.data})
        })
    }

    resetSearch(id) {
        
        console.log(this.state.search)
        console.log(this.state.myPosts)
        axios.get(`/api/posts/${id}?userposts=${JSON.stringify(this.state.myPosts)}&search=${''}`)
        .then(res => {
            console.log(res.data)
            this.setState({search: ''})
            this.setState({posts: res.data})
        })
    }

    render() {
        let postsList = this.state.posts.map(el => {
            return <Link to={`/post/${el.id}`} key={el.id}>
                <div className="post-box">
                    <h3>{el.title}</h3>
                    <p>by {el.username}</p>
                    <img src={el.profile_poc} alt="User Profile Picture"/>
                </div>
            </Link>
        })
        return(
            <div className="dashboard">
                Dashboard
                <input onChange={(e) => this.handleSearchChange(e)} value={this.state.search} placeholder="Search" type="text"/>
                <button onClick={() => this.getPosts(this.props.id.id)}>Search</button>
                <button onClick={() => this.resetSearch(this.props.id.id)}>Reset</button>
                My Posts <input onChange={() => this.handleCheckBoxChange()} checked={this.state.myPosts} type="checkbox"/>
                {postsList}
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    const {id} = reduxState
    return {id}
}


export default connect(mapStateToProps)(Dashboard)

