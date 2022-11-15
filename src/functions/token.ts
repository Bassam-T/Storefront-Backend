import jsonwebtoken from 'jsonwebtoken';

const generateToken = (id: number): string => {
  return jsonwebtoken.sign(id.toString(), process.env.JWT_SECRET as string);
};

export default generateToken;