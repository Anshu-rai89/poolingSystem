const express=require('express');

// using express route
const router=express.Router();

const optionController=require('../../../controller/api/v1/optionController');

router.delete('/:id/delete',optionController.deleteOption);
router.put('/:id/add_vote',optionController.addVote);


module.exports=router;