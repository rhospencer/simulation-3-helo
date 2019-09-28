module.exports = {
    async register(req, res) {
        const db = req.app.get('db')
        const {username, password} = req.body

        const user = await db.find_username(username)
        if (user[0]) return res.status(200).send({message: 'Username already in use'})

        const newUser = await db.add_user([username, password])
        
        req.session.id = newUser[0].id
        console.log(req.session)
        console.log(newUser[0].id)
        res.status(200).send(newUser, req.session.id)
    },

    async login(req, res) {
        const db = req.app.get('db')
        const {username, password} = req.body

        const user = await db.find_username(username)
        if (!user) return res.status(200).send({message: 'Username not found'})

        if (password !== user[0].password) {
            return res.status(200).send({message: 'Incorrect Password'})
        } else {
            console.log(user)
            res.session.id = user.id
            return res.status(200).send(user[0])
        }
    },

    async logout(req, res) {
        req.session.destroy()
        res.status(200).send({message: 'Logged Out'})
    },

    async getPosts(req, res) {
        const db = req.app.get('db')
        const {id} = req.session.id
        const {userposts, search} = req.query

        if (userposts === 'true' && search !== '') {
            const posts = await db.get_user_posts([`%${search}%`, id])
            return res.status(200).send(posts)
        } else if (userposts !== 'true' && !search) {
            const posts = await db.get_unknown_posts(id)
            return res.status(200).send(posts)
        } else if (userposts !== 'true' && search !== '') {
            const posts = await db.get_all_posts(`%${search}%`)
            return res.status(200).send(posts)
        } else {
            const posts = await db.get_all_user_posts(id)
            return res.status(200).send(posts)
        }
    },

    async getSinglePost(req, res) {
        const db = req.app.get('db')
        const {id} = req.params
        
        const post = await db.get_single_post(id)
        return res.status(200).send(post[0])
    },

    async addPost(req, res) {
        const db = req.app.get('db')
        const {title, img, content} = req.body
        const {id} = req.params
        console.log(title, img, content, id)

        const post = await db.add_post([title, img, content, id])
        console.log(post)
        res.status(200).send({message: 'Post Added'})

    }
}