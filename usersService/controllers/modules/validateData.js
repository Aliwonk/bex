import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

export default async function validateData(req, method = 'none', callback) {
    const { name, email, password } = req.body;
    const file = req.file;

    if(method === 'register') {
        // check data for emptiness
        if(name === '' || email === '' || password === '') return callback('Empty data', null);
    
    }else if(method === 'auth') {
        // check data for emptiness
        if(email === '' || password === '') return callback('Empty data', null);
    }

    // validate email
    const emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if(!emailReg.test(email)) return callback('Incorrect email', null);

    // validate password
    const beginWithoutDigit = /\d.*$/,
    beginLetter = /([a-z][A-Z])|([A-Z][a-z])/,
    minimum4Chars = /^.{6,}$/;    
        
    if(!beginWithoutDigit.test(password)) {
            
        return callback('Password without digits', null);
        
    } else if (!minimum4Chars.test(password)) {
        
        return callback('Short password min 4', null);

    }else if(!beginLetter.test(password)) {
    
        return callback('Without capital letter', null);

    };
            
    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const dataUser = {...req.body, password: bcrypt.hashSync(password, salt)};

    // validate file
    if(file) {
        return validateFile(file, (err, img) => {
            if(err) return callback(err, null);
            return callback(null, {...dataUser, img});
        });
        
    };

    callback(null, dataUser);

};

async function validateFile(file, callback) {
    const { mimetype, size, filename, originalname } = file;
    const pathFile = file.path;
    const sizeFile =  size / 1024 / 1000;


    if(mimetype !== 'image/jpeg' && mimetype !== 'image/png' && mimetype !== 'image/jpg') {
    
        fs.unlinkSync(pathFile, (errDel) => {
            if(errDel) return callback('File deletion error', null);
        });

        return callback('Incorrect file type', null);

    }else if(sizeFile > 10) {
     
        fs.unlinkSync(pathFile, (errDel) => {
            if(errDel) return callback('File deletion error', null);    
        });

        return callback('Big file size', null);
    
    }else {

        // new name file 
        const newFile = filename + path.parse(originalname).ext;
        
        // change file extention 
        fs.renameSync(pathFile, 'uploads\\' + newFile, (errRename) => {
            if(errRename) return callback('Error rename file');
        });

        callback(null, newFile);
    };
};