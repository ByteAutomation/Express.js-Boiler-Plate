require('dotenv').config();
const jwt = require('jwt-simple');
const jwtHelper = require('../helpers/jwt-token-helper');

module.exports = async (req, res, next) => {
	// Pass JWT in Header as Authorization
	const token =
		req.headers['Authorization'].split(' ')[1] ||
		req.headers['x-access-token'];

	// Pass userId in Header as x-key
	const userId = req.headers['x-key'];

	if (token && userId) {
		try {
			// Validate Token
			const result = jwtHelper.validateToken(token, userId);

			if (result.success) {
				next();
			} else {
				return res.status(result.status).send({
					message: result.message,
				});
			}
		} catch (err) {
			return res.status(500).send({ message: err.message });
		}
	} else {
		return res.status(422).send({ message: 'Token or Key is missing' });
	}
};
