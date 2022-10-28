const updateRefreshToken = (username, refreshToken) => {
	users = users.map(user => {
		if (user.username === username)
			return {
				...user,
				refreshToken
			}

		return user
	})
}
module.exports = updateRefreshToken;
