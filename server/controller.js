module.exports = {
    async register(req, res) {
        const db = req.app.get('db')
        const {username, password} = req.body

        const user = await db.find_username(username)
        if (user[0]) return res.status(200).send({message: 'Username already in use'})

        const newUser = await db.add_user([username, password])
        res.status(200).send(newUser)
    },

    async login(req, res) {
        const db = req.app.get('db')
        const {username, password} = req.body

        const user = await db.find_username(username)
        if (!user) return res.status(200).send({message: 'Username not found'})

        if (password !== user[0].password) {
            return res.status(200).send({message: 'Incorrect Password'})
        } else {
            return res.status(200).send(user[0])
        }
    },

    async getPosts(req, res) {
        const db = req.app.get('db')
        const {id} = req.params
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
    }
}