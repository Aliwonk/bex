import jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs';
import nodemailer from 'nodemailer';
import UserModel from '../database/userModel.js';
import validateData from './modules/validateData.js';
dotenv.config({path: './.env'});

export default async function registerUser(req, res) {

    validateData(req, 'register', async (err, data) => {

        // send error validate
        if(err) return res.writeHead(400, {'Content-Type': 'application/json'}).end(JSON.stringify({err}));
        
        // check user
        const getUser = await UserModel.findOne({ where: { email: data.email } });
        if(getUser) {
        
            // delete img from folder uploads if user exists
            if(data.img) {
                fs.unlinkSync('uploads\\' + data.img);
            }

            return res.writeHead(400, {'Content-Type': 'application/json'}).end(JSON.stringify({err: `User with email ${data.email} exists`}));
        
        }else {
            const jwtKey = process.env.JWT_KEY;

            // save data user if user doesn't exist
            const user = await UserModel.create(data); 
            if(user) {

                const token = jwt.sign(data, jwtKey, {algorithm: 'HS256'}, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) });
                res.cookie('token_user', token);
                res.writeHead(201, {'Content-Type': 'application/json'}).end(JSON.stringify({message: 'User created'}));

                // send mail
                let testAccount = await nodemailer.createTestAccount();

                const transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                      user: testAccount.user, // generated ethereal user
                      pass: testAccount.pass, // generated ethereal password
                    },
                  });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: '<userService@mail.com>', // sender address
                    to: user.dataValues.email, // list of receivers
                    subject: 'User service', // Subject line
                    text: 'You have successfully registered with the service', // plain text body
                });

                // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }else {

                res.writeHead(500, {'Content-Type': 'application/json'}).end(JSON.stringify({err: 'Error create user'}));

            };
        
        }
        
    });

};