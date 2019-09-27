import React, {Component} from 'react'
import Post from '../Post/Post'

export default class Dashboard extends Component {
    constructor() {
        super()

        this.state = {
            search: '',
            myPosts: true,
            posts: []
        }
    }

    handleSearchChange(e) {
        this.setState({search: e.target.value})
    }

    handleCheckBoxChange() {
        this.setState({myPosts: !this.state.myPosts})
    }

    render() {
        let postsList = this.state.posts.map(el => {
            return <Post key={el.id} data={el}/>
        })
        return(
            <div className="dashboard">
                Dashboard
                <input onChange={(e) => this.handleSearchChange(e)} value={this.state.search} placeholder="Search" type="text"/>
                <button>Search</button>
                <button>Reset</button>
                My Posts <input onChange={() => this.handleCheckBoxChange()} checked={this.state.myPosts} type="checkbox"/>
                {postsList}
            </div>
        )
    }
}