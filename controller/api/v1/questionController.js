const Question=require('../../../model/question');


module.exports.create=async function(req,res)
{
    try{

       // craeting our question
        let title=req.body.title;
        let question=await Question.create(
            {
                title:title,
                vote:false
            }
        );


        return res.json(200,
            {
                message:'question created succefully',
                data:question
            });
    }catch(err)
    {
        return res.json(500,
            {
                message:'Server error ',
                data:err
            });
    }
}


module.exports.deleteQuestion=async function(req,res)
{
    try
    {

             let question=await Question.findById(req.params.id);

             await Like.deleteMany({_id: {$in: question.option}});

             if(question)
             {

                // if queston is voted cant delete 
                if(question.vote)
                {
                    return res.json(400,
                    {
                        message:'question have vote cant be deleted',
                    });
                }

                else
                {
                    // deleting our question
                    question=await Question.findByIdAndDelete(req.params.id);
                

                    return res.json(200,
                        {
                            message:'question deleted',
                        });
            }
        }else 
        { return res.json(400,
            {
                message:'question dosnt exits',
            });
        }

    }catch(err)
    {
        return res.json(500,
            {
                message:'Server error ',
                data:err
            });
    }
}


module.exports.showAllQuestions=async function(req,res)
{
    try{

        // finding all question and
        let question=await Question.findById(req.params.id).populate({path:'option'});

        if(question)
        {

            return res.json(200,
                {
                    message:'questios is',
                    data:question
                });
        }
        else
        {
            return res.json(400,
                {
                    message:'question dosnt exits',
                });
        }


    }catch(err)
    {
        return res.json(500,
            {
                message:'Server error ',
                data:err
            });
    }
}