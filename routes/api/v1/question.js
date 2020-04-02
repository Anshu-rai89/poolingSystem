const express=require('express');

// using express route
const router=express.Router();
const questionController=require('../../../controller/api/v1/questionController');
const optionController=require('../../../controller/api/v1/optionController');

router.post('/create',questionController.create);
router.get('/:id',questionController.showAllQuestions);
router.delete('/:id/delete',questionController.deleteQuestion);
router.post('/:id/options/create',optionController.create);
module.exports=router;