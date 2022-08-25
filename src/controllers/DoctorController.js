import { response } from 'express';
import doctorService from '../services/doctorService';

let getDoctorHome = async (req, res) => {
	let limit = req.query.limit || 10;
	try {
		let response = await doctorService.getTopDoctorHome(+limit);
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			message: 'Error from server',
		});
	}
};

let getAllDocTor = async (req, res) => {
	try {
		let response = await doctorService.getAllDocTor();
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			message: 'Error from server',
		});
	}
};

let postInfoDoctor = async (req, res) => {
	try {
		let response = await doctorService.postInfoDoctor(req.body);
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			message: 'Error from server',
		});
	}
};

let getInfoDoctor = async (req, res) => {
	try {
		let { id } = req.query;
		let response = await doctorService.getInfoDoctor(id);
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			message: 'Error from server',
		});
	}
};

let saveEditInfoDoctor = async (req, res) => {
	try {
		let response = await doctorService.saveEditInfoDoctor(req.body);
		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(200).json({
			errCode: -1,
			message: 'Error from server',
		});
	}
};
module.exports = {
	getDoctorHome,
	getAllDocTor,
	postInfoDoctor,
	getInfoDoctor,
	saveEditInfoDoctor,
};
