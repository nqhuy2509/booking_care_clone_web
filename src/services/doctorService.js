import db from '../models/index';

let getTopDoctorHome = (limit) => {
	return new Promise(async (resolve, reject) => {
		try {
			let users = await db.User.findAll({
				attributes: {
					exclude: ['password'],
				},
				include: [
					{
						model: db.Allcode,
						as: 'positionData',
						attributes: ['valueEn', 'valueVi'],
					},
					{
						model: db.Allcode,
						as: 'genderData',
						attributes: ['valueEn', 'valueVi'],
					},
				],
				limit,
				nest: true,
				raw: true,
				order: [['createdAt', 'DESC']],
				where: {
					roleId: 'R2',
				},
			});

			resolve({
				errCode: 0,
				message: 'OK',
				data: users,
			});
		} catch (e) {
			reject(e);
		}
	});
};

let getAllDocTor = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let data = await db.User.findAll({
				where: {
					roleId: 'R2',
				},
				attributes: {
					exclude: ['password', 'image'],
				},
			});
			resolve({
				errCode: 0,
				message: 'OK',
				data,
			});
		} catch (e) {
			reject(e);
		}
	});
};

let postInfoDoctor = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.id) {
				resolve({
					errCode: 1,
					message: 'Please choose doctor who want to add info',
				});
			} else {
				await db.Markdown.create({
					contentHTML: data.contentHTML,
					contentMarkdown: data.contentMarkdown,
					description: data.description,
					doctorId: data.id,
				});

				resolve({
					errCode: 0,
					message: 'Save info succeed!',
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let getInfoDoctor = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!id) {
				resolve({
					errCode: 1,
					message: 'Missing request parameters',
				});
			} else {
				let data = await db.Markdown.findOne({
					where: { doctorId: id },
				});
				if (!data) {
					resolve({
						errCode: 2,
						message: 'Doctor info not found!',
					});
				} else {
					resolve({
						errCode: 0,
						message: 'Doctor info founded!',
						data,
					});
				}
			}
		} catch (e) {
			reject(e);
		}
	});
};

let saveEditInfoDoctor = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.id) {
				resolve({
					errCode: 1,
					message: 'Missing parameters',
				});
			} else {
				let { id, contentHTML, contentMarkdown, description } = data;
				let doctor = await db.Markdown.findOne({
					where: { doctorId: id },
					raw: false,
				});

				if (!doctor) {
					resolve({
						errCode: 2,
						message: 'Doctor info not found!!',
					});
				} else {
					if (!contentHTML || !contentMarkdown) {
						resolve({
							errCode: 3,
							message: 'Missing required parameters',
						});
					} else {
						doctor.contentHTML = contentHTML;
						doctor.contentMarkdown = contentMarkdown;
						doctor.description = description;
						await doctor.save();

						resolve({
							errCode: 0,
							message: 'OK',
						});
					}
				}
			}
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	getTopDoctorHome,
	getAllDocTor,
	postInfoDoctor,
	getInfoDoctor,
	saveEditInfoDoctor,
};
