import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';


const Helper = {
    // hash password method

    hashPassword(pass){
        return bcrypt.hashSync(pass, bcrypt.genSaltSync(8))
    },

    // compare password

    comparePassword(hashPassword, pass){
        return bcrypt.compareSync(pass, hashPassword)
    },

    // validate email
    isValidEmail(e){
        return /\S+@\S+\.\S+/.test(e);
    },
    // generate token

    generateToken(id){
        const token = jwt.sign({
            userId: id
        },
        process.env.SECRET, { expiresIn: '7d'}
        );
        return token;
    }
}

export default Helper;