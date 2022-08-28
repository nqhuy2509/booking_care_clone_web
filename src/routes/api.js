import express from 'express';
import UserController from '../controllers/UserController';
import DocterController from '../controllers/DoctorController';

let router = express.Router();

let initAPIRoute = (app) => {
	router.post('/login', UserController.handleLogin);
	router.get('/get-all-users', UserController.handleGetAllUser);
	router.post('/create-new-user', UserController.handleCreateNewUser);
	router.put('/edit-user', UserController.handleEditUser);
	router.delete('/delete-user', UserController.handleDeleteUser);
	router.get('/allcode', UserController.getAllCode);

	router.get('/top-doctor-home', DocterController.getDoctorHome);
	router.get('/get-all-doctor', DocterController.getAllDocTor);
	router.post('/post-info-doctor', DocterController.postInfoDoctor);
	router.get('/get-info-doctor', DocterController.getInfoDoctor);
	router.put('/edit-info-doctor', DocterController.saveEditInfoDoctor);
	router.get(
		'/get-detail-doctor-by-id',
		DocterController.getDetailDoctorById
	);
	router.post('/bulk-create-schedule', DocterController.bulkCreateSchedule);

	return app.use('/api/v1', router);
};

export default initAPIRoute;
