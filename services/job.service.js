const { jobModel } = require('../models/job.model');
const { orginizationModel } = require('../models/orginization.model');

module.exports.addJob = async (req, res) => {
    const {   orginizationId,
        jobName,
        jobLevel,
        industry,
        salary,
        experience,
        jobType,
        postDate,
        deadline,
        jobOverview,
        requiredSkills,
        preferredExperience
    } = req.body;
    const [ job ] = await jobModel.insertMany({   orginizationId,
        jobName,
        jobLevel,
        industry,
        salary,
        experience,
        jobType,
        postDate,
        deadline,
        jobOverview,
        requiredSkills,
        preferredExperience
    });
    await orginizationModel.findOneAndUpdate(
        {_id:orginizationId},
        { $addToSet: {jobs: job._id} }
    );
    res.json({message:'success'});
};


module.exports.getJobs = async (req, res) => {
    const { _id } = req.params;
    const jobs  = await jobModel.find({orginizationId:_id});
    res.json({message:'success',jobs});
};