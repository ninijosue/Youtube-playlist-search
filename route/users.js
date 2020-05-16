const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const protection = require('../middleway/userJWT');



router.post('/signUp', (req, res, next) => {

    User.find({Email: req.body.Email})
    .exec()
    .then(user => {
        if(user.length > 1 ){
            res.status(401).json({
                message: "Email all read exist"
            })
        }
        else{
            
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                                res.status(500).json({
                                    error: err
                                })
                            }else{
        
        
                                const user = new User({
                                    _id: new mongoose.Types.ObjectId(),
                                    Email: req.body.Email,
                                    password: hash
                                });
                            
                                user.save()
                                
                                .then(result =>{
                                    console.log(result);
                                    res.status(200).json({
                                        message: 'user created',
                                        response: result
                                    });
                                    

                                })
                                .catch(err =>{ 
                                    res.status(500).json({
                                       error:err
                                          })
                            
                                })
                            
                            }
            })
            
        }
    }
    )
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
   

})

router.post('/login',(req, res, next) => {
    const responseObj = {
        message: "message"
    };
    
  User.find({Email: req.body.Email})
  .exec()
  .then(user => {
     
      
      if(user.length < 1){
        responseObj.message = "Wrong email";
        res.status(200).json(responseObj);
      }
      else{
      
          bcrypt.compare(req.body.password, user[0].password, (err, result) => {
              if(err) responseObj.error = err;
              else {
                if(!result) responseObj.message = 'Incorrect password';
                else {

            
                const token = JWT.sign(
                      {
                          Email: user[0].Email,
                          userID: user[0]._id
                      },
                      '1234567890',
                      {
                          expiresIn: "1h"
                      }
                  );
                  
                  res.cookie('log_token', token);
                 
                  
                responseObj.message = 'you are protected';
                responseObj.token = token;
    
              }
           }
           res.status(200).json(responseObj);
        
        })
        
      }
   

  })
  .catch(err => {
      responseObj.error = err;
      res.status(200).json(responseObj);
  })
  

  
})

router.post('/img', protection ,(req, res, next) => {
    res.status(200).json({
        message: 'yes'
    })
})



module.exports = router;
