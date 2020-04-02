const Options=require('../../../model/option');
const Question=require('../../../model/question');

module.exports.create=async function(req,res)
{
    try{
           // finding question by id 
        let question=await Question.findById(req.params.id);

        if(question)
        {
                  
            // our id is ome more than options our question have 
            let id=question.option.length+1;
             let vote=0;

             // setting our url
             let url=`http://localhost:9000/options/${id}/add_vote`;

             // craeting our url
             let option=await Options.create(
                 {
                     id:id,
                     question:question._id,
                     text:req.body.text,
                     votes:vote,
                     link:url
                 }
             );

             // adding option in our question option array
               question.option.push(option);
               question.save();

             return res.json(200,
                {
                    message:'option created succfully',
                    data:option
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



module.exports.deleteOption=async function(req,res)
{

    try{
              let option=await Options.findById(req.params.id);

              if(option)
              { 
                  // checeking here if option have votes or not

                  let v=Number(option.votes);

                  // if vote is 0 delete it 
                    if(v===0)
                    {
                        //if 
                        option=await Options.findByIdAndDelete(req.params.id);
                        return res.json(200,
                            {
                                message:'option deleted',
                            });
                    }
                    else
                    {

                        return res.json(400,
                            {
                                message:'optionis voted cant delete',
                            });
                        }
                    }
              
              else{

            return res.json(400,
                {
                    message:'option dosnt exits',
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




module.exports.addVote=async function(req,res)
{

    try{
          // finding option by id to check if exits or not
              let option=await Options.findById(req.params.id);

              // if option exits 
              if(option)
              {
                  // get previos votes 
                  let v=Number(option.votes)+1;

                  // update it 
                  option=await Options.findByIdAndUpdate({_id:req.params.id},{votes:v});
                
                  // make vote in question true so that we cant delete it now 
                  let question=await Question.findByIdAndUpdate({_id:option.question},{vote:true});
                  

                  return res.json(200,
                    {
                        message:'option vote added',
                        data:option
                    });
              }
              else{

            return res.json(400,
                {
                    message:'option dosnt exits',
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