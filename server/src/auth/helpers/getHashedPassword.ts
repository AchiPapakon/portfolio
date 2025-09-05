import * as bcrypt from 'bcrypt';

const getHashedPassword = async (password: string): Promise<string> => {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
};

export default getHashedPassword;
