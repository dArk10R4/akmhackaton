const { Router } = require('express');

const reportController = require('../Controllers/ReportController');
const { isUsersImage, hasPermissionToReport } = require('../Middlewares/reportMiddleware');
const { isLoggedIn } = require('../Middlewares/UserMiddlewares');

const router = new Router();

router.get('/image/:imageName', isLoggedIn, isUsersImage, reportController.getImage);
router.post('/create', isLoggedIn, reportController.createReport);
router.get('/:reportId', isLoggedIn, hasPermissionToReport, reportController.getReportById);
router.get('/', isLoggedIn, reportController.getReports);


module.exports = router;