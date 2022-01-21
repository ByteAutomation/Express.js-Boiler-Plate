module.exports = (errors) => {
	let message = [];
	for (let i in errors) {
		message.push(errors[i].message);
	}
	return message;
};
