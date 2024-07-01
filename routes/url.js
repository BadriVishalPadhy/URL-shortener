const express = require('express');
const{handleGenerateNewSHortURL} = require("../controllers/url")
const router = express.Router();

router.post('/',handleGenerateNewSHortURL);

module.exports =router;
