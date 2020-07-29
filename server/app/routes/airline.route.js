const express = require('express');
const router = express.Router();
const controller = require('../controller/airline.controller');
var multer = require('multer');
var FolderName = "./logo/";
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FolderName)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'
        || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

var upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

//GET /api/airline
router.get('/', controller.getAirlines);

//GET /api/airline/:id
router.get('/:id', controller.getAirline);

//POST /api/airline
router.post('/', upload.single('logo'), controller.postAirline);

//PUT /api/airline
router.put('/:id', upload.single('logo'), controller.putAirline);

//DELETE /api/airline
router.delete('/:id', controller.deleteAirline);

module.exports = router;