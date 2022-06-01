const express = require("express");
const usersch = require("../models/User")
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
let fetchuser = require("../middleware/fetchuser")

secretKey = "nodemon@JWT"




//create user with end point /api/auth/createuser. No login required
router.post("/createuser",
    //validations for name,email,password
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }), async (req, res) => {
        try {
            //if there are any errors in validations,then they will be displayed
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            //checking whether user exists already or not.
            let user1 = await usersch.findOne({ email: req.body.email })
            if (user1) {
                return res.status(400).json({ error: "This email already exists" })
            }
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);
            let data = {
                user: {
                    id: usersch.id
                }
            }
            var token = jwt.sign(data, secretKey);
            //if user doesn't exist, new user will be created.
            let user = await usersch.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            }).then(user => res.json({ "Authorization": token }))
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error occured")
        }
    })




//Login a user with end point /api/auth/loginuser. login required
router.post("/loginuser",
    //validations for email
    body('email').isEmail(), async (req, res) => {
        let success = false
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let user = await usersch.findOne({ email: req.body.email })
            if (!user) {
                return res.status(400).send({ success, "message": "Sorry,No user with this email and password exists" })
            }
            if(user.blocked === "blocked"){
                return res.status(400).send({ success, "message": "Sorry,Your account is blocked" })
            }
            let login = bcrypt.compare(req.body.password, user.password);
            if (!login) {
                return res.status(400).send({ success, "message": "Please login with correct credentials" })
            }
            let data = {
                user: {
                    id: user.id
                }
            }
            var token = jwt.sign(data, secretKey);
            success = true
            return res.status(200).send({ success, token })

        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error occured")
        }
    })



//gets user with the auth token provided in header
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        let userid = req.user.id
        const user = await usersch.findById(userid).select("-password")
        res.status(200).send(user)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }

})

//  deleting a user with its id 
router.delete("/deleteuser/:id", fetchuser, async (req, res) => {
    try {
        const user = await usersch.findById(req.params.id)
        if (!user) {
            return res.status(404).send("User doesnot exists")
        }
        // return res.status(200).send(user._id);
        if (user._id.toString() != req.user.id) {
            return res.status(401).send("Not authorised!!")
        }
        let userDelete = await usersch.findByIdAndDelete(req.params.id)
        return res.status(200).send("Success! User has been deleted")
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})

// editing a user profile
router.put("/edituser/:id", fetchuser, async (req, res) => {
    try {
        const { name, email } = req.body
        const user = await usersch.findById(req.params.id)
        if (!user) {
            return res.status(404).send("User doesnot exists")
        }
        if (user._id.toString() != req.user.id) {
            return res.status(401).send("Not authorised!!")
        }
        const newUser = {}
        newUser.name = name
        newUser.email = email
        let updatedUser = await usersch.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true })
        return res.status(200).send(updatedUser)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})















// ---------------------------------------------  admin functionalities  -------------------------------------------------------

router.get("/getallusers",async (req, res) => {
    try {
        const users = await usersch.find({})
        res.status(200).send(users)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }

})

router.post("/blockuser/:id",async (req, res) => {
    try {
        const userid = req.params.id
        console.log(userid)
        const update = {
            blocked:"blocked"
        }
        const user = await usersch.findByIdAndUpdate(userid,update,{ new: true })
        return res.status(200).send(user)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})


router.post("/unblockuser/:id",async (req, res) => {
    try {
        const userid = req.params.id
        const update = {
            blocked:"not blocked"
        }
        const user = await usersch.findByIdAndUpdate(userid,update,{ new: true })
        return res.status(200).send(user)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})


module.exports = router
