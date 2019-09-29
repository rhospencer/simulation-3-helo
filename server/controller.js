module.exports = {
    async register(req, res) {
        const db = req.app.get('db')
        const {username, password} = req.body

        const user = await db.find_username(username)
        if (user[0]) return res.status(200).send({message: 'Username already in use'})

        const newUser = await db.add_user([username, password])
        
        req.session.userid = newUser[0].id
        res.status(200).send({id: req.session.userid, user: newUser[0]})
    },

    async login(req, res) {
        const db = req.app.get('db')
        const {username, password} = req.body

        const user = await db.find_username(username)
        if (!user) return res.status(200).send({message: 'Username not found'})

        if (password !== user[0].password) {
            return res.status(200).send({message: 'Incorrect Password'})
        } else {
            req.session.userid = user[0].id
            return res.status(200).send({id: req.session.userid, user: user[0]})
        }
    },

    async logout(req, res) {
        req.session.destroy()
        res.status(200).send({message: 'Logged Out'})
    },

    async getUserInfo(req, res) {
        const db = req.app.get('db')
        const {userid} = req.session

        const user = await db.get_user_info(userid)
        return res.status(200).send(user[0])
    },

    async getPosts(req, res) {
        const db = req.app.get('db')
        const {userid} = req.session
        const {userposts, search} = req.query

        if (userposts === 'true' && search !== '') {
            const posts = await db.get_user_posts([`%${search}%`, userid])
            return res.status(200).send(posts)
        } else if (userposts !== 'true' && !search) {
            const posts = await db.get_unknown_posts(userid)
            return res.status(200).send(posts)
        } else if (userposts !== 'true' && search !== '') {
            const posts = await db.get_all_posts(`%${search}%`)
            return res.status(200).send(posts)
        } else {
            const posts = await db.get_all_user_posts(userid)
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
        const {userid} = req.session

        const post = await db.add_post([title, img, content, userid])
        res.status(200).send({message: 'Post Added'})

    }
}