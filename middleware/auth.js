const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
	const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
	if (!token) return res.sendStatus(401)

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

		req.userId = decoded.id
		next()
	} catch (error) {
		console.log(error)
		return res.sendStatus(403)
	}
	
}

module.exports = verifyToken