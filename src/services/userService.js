import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			let userData = {};
			let isExist = await checkUserEmail(email);
			if (isExist) {
				let user = await db.User.findOne({
					where: { email },
					attributes: [
						'email',
						'roleId',
						'password',
						'firstName',
						'lastName',
					],
					raw: true,
				});
				if (user) {
					let check = await bcrypt.compareSync(
						password,
						user.password
					);

					if (check) {
						userData.errCode = 0;
						userData.message = 'OK';
						delete user.password;
						userData.user = user;
					} else {
						userData.errCode = 3;
						userData.message = 'Password is inncorrect !!';
					}
				} else {
					userData.errCode = 2;
					userData.message = "Your's email isn't exist!";
				}
			} else {
				userData.errCode = 1;
				userData.message = "Your's email isn't exist!";
			}
			resolve(userData);
		} catch (e) {
			reject(e);
		}
	});
};

let checkUserEmail = (email) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({ where: { email } });

			resolve(user ? true : false);
		} catch (e) {
			reject(e);
		}
	});
};

let getAllUsers = (id) => {
	let dataFinding = {
		attributes: {
			exclude: ['password'],
		},
	};
	return new Promise(async (resolve, reject) => {
		try {
			let users;
			if (id === 'ALL') {
				users = await db.User.findAll({
					...dataFinding,
				});
			} else if (id) {
				users = await db.User.findOne({
					...dataFinding,
					where: { id },
				});
			}

			resolve(users);
		} catch (e) {
			reject(e);
		}
	});
};

let createNewUser = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			// Check email is exist
			let check = await checkUserEmail(data.email);
			if (check) {
				resolve({
					errCode: 1,
					message: 'Email is already registered!',
				});
			} else {
				let hashPasswordFromByBcypt = await hashUserPassword(
					data.password
				);
				await db.User.create({
					email: data.email,
					password: hashPasswordFromByBcypt,
					firstName: data.firstName,
					lastName: data.lastName,
					address: data.address,
					gender: data.gender,
					roleId: data.role,
					positionId: data.position,
					phonenumber: data.phoneNumber,
				});

				resolve({
					errCode: 0,
					message: 'OK',
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let hashUserPassword = (password) => {
	return new Promise(async (resolve, reject) => {
		try {
			var hashPassword = await bcrypt.hashSync(password, salt);
			resolve(hashPassword);
		} catch (e) {
			reject(e);
		}
	});
};

let deleteUser = (id) => {
	return new Promise(async (resolve, reject) => {
		let user = await db.User.findOne({ where: { id } });
		if (!user) {
			resolve({
				errCode: 2,
				message: "User isn't exist",
			});
		}
		await db.User.destroy({ where: { id } });
		resolve({ errCode: 0, message: 'User is deleted' });
	});
};

let editUser = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let id = data.id;
			if (!id) {
				resolve({
					errCode: 2,
					message: 'Missing required params',
				});
			}
			let user = await db.User.findOne({
				where: { id },
			});
			if (user) {
				await db.User.update(
					{
						firstName: data.firstName,
						lastName: data.lastName,
						address: data.address,
					},
					{ where: { id } }
				);
				resolve({
					errCode: 0,
					message: 'Update user successed !',
				});
			} else {
				resolve({
					errCode: 1,
					message: 'User not found',
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let getAllCode = (type) => {
	return new Promise(async (resolve, reject) => {
		try {
			let res = {};
			if (!type) {
				res.errCode = 1;
				res.message = 'Missing required params';
			} else {
				let allcode = await db.Allcode.findAll({ where: { type } });
				res.errCode = 0;
				res.data = allcode;
			}

			resolve(res);
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	handleUserLogin,
	getAllUsers,
	createNewUser,
	deleteUser,
	editUser,
	getAllCodeService: getAllCode,
};
