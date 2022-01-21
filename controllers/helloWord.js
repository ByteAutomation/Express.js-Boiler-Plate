const { Validator } = require('node-input-validator');
const parseErrors = require('../helpers/validation-parser');
const jwtHelper = require('../helpers/jwt-token-helper');

// load here any Models or Config from .env

module.exports = {
	/**
	 * Get Request Hello Word Demo
	 * @param {*} req
	 * @param {*} res
	 */
	helloGetDemo: async (req, res) => {
		// Test .env file
		// console.log(process.env.JWT_SECRET);
		// console.log(process.env.APP_NAME);

		// Test JWT functions
		// 1. Generate JWT by using userID as payload
		const token = jwtHelper.generateToken('1');
		console.log(token);
		// 2. Validate JWT Token by using userID
		const result = jwtHelper.validateToken(token, '1');
		console.log(token);

		// Test
		res.status(200).send({
			success: true,
			message: 'Welcome to Hello!',
		});
	},

	/**
	 * Post Request Hello Word Demo
	 * @param {*} req
	 * @param {*} res
	 * @returns
	 */
	helloPostDemo: async (req, res) => {
		try {
			const v = new Validator(req.body, {
				param_1: 'required',
				param_2: 'required',
			});

			const matched = await v.check();

			if (!matched) {
				return res.status(422).send({
					success: false,
					message: parseErrors(v.errors),
				});
			}

			// Test errors in response
			// console.log('param_1:', req.body.param_1);
			// console.log('param_2:', req.body.param_1);

			return res.status(200).send({
				success: true,
				message: 'Welcome to Hello POST!',
			});
		} catch (error) {
			return res.status(500).send({
				success: false,
				message: error.message,
			});
		}
	},
};
