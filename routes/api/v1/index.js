const express=require('express');

// using express route
const router=express.Router();

router.use('/questions',require('./question'));
router.use('/options',require('./option'));


module.exports=router;