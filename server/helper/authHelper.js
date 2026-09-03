import bcrypt from 'bcrypt'

export const hashPassword = async(password)=>{

    const saltRound= 10;
    const encrypt = await bcrypt.hash(password,saltRound)
    return encrypt
}

export const comparePassword = async(password,encrypt)=>{
    return bcrypt.compare(password,encrypt)
}