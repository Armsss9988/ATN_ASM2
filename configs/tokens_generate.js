require('dotenv').config()
const jwt = require('jsonwebtoken')
const generateTokens = payload => {
	const { id, username } = payload

	// Create JWT
	const accessToken = jwt.sign(
		{ id, username },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: '5m'
		}
	)



	return accessToken
}
module.exports = generateTokens;