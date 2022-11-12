//require necessary modules
const bodyParser = require('body-parser');
const Sample = require('./models/sample');
const bcrypt = require('bcrypt');
module.exports = (app) => {

    var nameRegEx = /^[a-z ,.'-]+$/i;
    var emailRegEx = /^[a-zA-Z0-9._%+-]+@northeastern+\.edu$/;
    var passwordRegEx = ("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,14})");

    

    //User creation --- POST: /user/create
    app.post('/user/create',bodyParser.json(), function(req, res) {

        var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
       

        if( !name.trim().match(nameRegEx)){
            res.status(400);
            res.json("Invalid Full Name");
        }
        else if( !email.trim().match(emailRegEx)){
            res.status(400);
            res.json("use proper northeastern email id");
        }

        else if(!password.trim().match(passwordRegEx)){
            res.status(400);
            res.json("use strong password ");
        }
        
        else{

        var user = new Sample(req.body);
        user.save(function(error, data) {
            if (error)
                console.log('saving failed');
            console.log('data saved ');
            res.status(201)
            res.json(data);
        });
        }
    });


    //Update user -- POST: /user/edit
    app.put('/user/edit',async function(req,res){

       
        var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
        const salt = await bcrypt.genSalt(10); 
        
        try{
        if(!password.trim().match(passwordRegEx)){
            res.status(400);
            res.json("Use strong password ");
        return res.send();
        }
    }catch(error){
        return error;
    }
        let newpassword = await bcrypt.hash(password, salt);
        let newname = req.body.name;
        const user = await Sample.findOne({ email: email });
        if(user==null){
            console.log("User doesn't exist")
            res.json({"message":"User doesn't exist!! Check the email again"});
            return;
        }
        
        else{
            
        Sample.findOneAndUpdate({email: email},
            {$set:{email: email, password: newpassword, name: newname}},
            {new: true}, (error,doc) => {
                console.log(doc);
                if(error){
                    res.json({"message":"Password Update failed!"});
                    console.log("Password updation failed!");
                }
                
                if(doc == null){
                    res.status(400);
                    res.json("User doesn't exist");
                }
                else{
                    res.json("Updated successfully");
                    return res.send();
                }
            })

        }
    })
        

    //Delete User -- DELETE: /user/delete
    app.delete('/user/delete',async function(req,res){
        try{  
        let emailDelete = req.body.email;
        let passwordDelete = req.body.password;   
          
        const user = await Sample.findOne({ email: emailDelete });
        console.log("Deleted User: ")
        console.log(user);
        const isMatch = await user.isValidPassword(passwordDelete);
        
        if (!isMatch){
            try{
            res.status(400);
            res.json({"message":"Invalid old password!"});
            return res.send();
            }catch(error){
                return error;
            }
        }
    

        Sample.findOneAndDelete({email:emailDelete}, function(error, doc){
            if(error){
                res.json("Delete failed! Try again.");
                console.log("Delete failed!");
                return res.send();
            }
            if(doc == null){
                res.status(400);
                res.json("user doesn't exist");
                return res.send();
            }
        
            else{
                res.status(201);
                res.json("Data deleted successfully");
                return res.send();
            }
        
    
        }
        ); 
    }catch(error){
        res.json({"message":"User doesn't exist"});
        return res.send();
    }
    });


    //Get all the users -- 
    app.get('/user/getAll', function(req, res) {
        Sample.find(function(error, samples) {
            if (error)
                res.send(error);
            console.log('samples', samples);
            res.status(200);
            res.json(samples);
        });
    });

}