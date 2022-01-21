require('dotenv').config();
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
const jwtExpDays = parseInt(process.env.JWT_EXPIRY_DAYS) || 15; // 15 days

module.exports = {
	generateToken: (userId) => {
		const expires = expiresIn(jwtExpDays);

		// Store hash in your password DB if required.
		const hash = getHash(userId, saltRounds);

		const token = jwt.encode(
			{
				exp: expires,
				sign: hash,
			},
			process.env.JWT_SECRET
		);
		return token;
	},

	validateToken: (token, userId) => {
		const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

		if (decodedToken.exp <= Date.now()) {
			return {
				success: false,
				status: 401,
				message: 'Token expired',
			};
		} else if (!checkHash(decodedToken.sign, userId)) {
			return {
				success: false,
				status: 401,
				message: 'Invalid Token',
			};
		} else {
			return {
				success: true,
				status: 200,
			};
		}
	},
};

const expiresIn = (numDays) => {
	var dateObj = new Date();
	return dateObj.setDate(dateObj.getDate() + numDays);
};

const getHash = (userId, saltRounds) => {
	return bcrypt.hashSync(String(userId), saltRounds);
};

const checkHash = (hash, userId) => {
	return bcrypt.compareSync(String(userId), String(hash));
};
