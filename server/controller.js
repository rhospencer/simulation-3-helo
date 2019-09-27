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
            console.log(user[0])
            return res.status(200).send(user[0])
        }
    }
}