var Image = require('../models/image');
var _ = require('underscore');
var aws = require('aws-sdk');
var config = require('../../config');
const accessKeyId = config.accessKeyId;
const secretAccessKey = config.secretAccessKey;
const region = config.region;

aws.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region:region
});

exports.getAllImages = function(req,res){
    Image.find({},function(err,images){
        if (err){
            res.status(500).json({"success":false,"errMsg":err})
        }else{
            res.json({"success":true,"data":images})
        }
    })
}

exports.getOneImageById = function(req,res){
    var id = req.params.id;
    Image.findById(id,function(err,image){
        if (err){
            res.status(500).json({"success":false,"errMsg":err});
        }else{
            if (image==null){
                res.json({"success":false,"errMsg":"can not find the image by the id"})
            }else{
                res.json({"success":true,"data":image})
            }
        }
    })
}

exports.createNewImageInfo = function(req,res){
    var imageObj = req.body;
    if (!imageObj){
        res.status(422).json({"success":false,"errMsg":"content can not be empty"});
    }else {
        var name = imageObj.name;
        Image.findOne({name:name},function(err,image){
            if (err){
                 res.status(500).json({"success":false,"errMsg":err})
            }else{
                if (!image){
                    var image = new Image(imageObj);
                    image.save(function(err){
                        if (err){
                             res.status(500).json({"success":false,"errMsg":err});
                        }else{
                            res.json({"success":true,"data":image});
                        }
                    },{versionKey: false})
                }else{
                    res.status(422).json({"success":false,"errMsg":"the image has existed in the database"});
                }
            }
        })
    }
}

exports.getAmazonS3putObjectUrl = function(req,res){
    const path = req.body.path;
    const filename = path+'/'+req.body.filename;
    const filetype = req.body.filetype;
    s3 = new aws.S3();
    const params = {
            Bucket: 'shuchengc',
            Key: filename,
            ACL:'public-read',
            Expires: 60,
            ContentType: filetype
    };
    s3.getSignedUrl('putObject',params,function(err, data) {
            if (err) {
                console.log(err);
                res.json({"success":false,"errMsg":err});
            } else {
                res.json({"success":true,"data":data});
            }
    });
}

exports.getAmazonS3getObjectUrl = function(req,res){
    const filename = req.body.filename;
    s3 = new aws.S3();
    const params ={
        Bucket:'shuchengc',
        Key:filename
    };
    const url = s3.getSignedUrl('getObject',params);
    res.json({"success":true,"data":url});
}

