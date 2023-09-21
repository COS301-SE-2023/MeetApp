import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordRecovery } from './schema';
import { CreatePasswordRecoveryDto } from './dto/create-passwordrecovery.dto';
import { createTransport} from 'nodemailer';
import {hash} from 'bcrypt'

@Injectable()
export class PasswordRecoveriesService {
  constructor(@InjectModel(PasswordRecovery.name) private passwordRecoveryModel: Model<PasswordRecovery>){
    
  }
  async create(createPRDto: CreatePasswordRecoveryDto) {
    const newPR = await new this.passwordRecoveryModel(createPRDto);
    return newPR.save();
  }

  findAll() {
    return this.passwordRecoveryModel.find().exec();
  }

  findOne(id: string) {
    return this.passwordRecoveryModel.findById(id).exec();
  }

  // update(id: number, updatePRDto: UpdatePasswordRecoveryDto) {
  //   return `This action updates a #${id} password recovery`;
  // }

  async remove(id: string) {
    const deletedPR = await this.passwordRecoveryModel.findByIdAndDelete(id);
   if (!deletedPR) {
     throw new NotFoundException(`Password recovery #${id} not found`);
   }
   return deletedPR;
  }

  async sendEmail(userEmail : string){
    const regexSlash = new RegExp('/', 'g');
    const regexDollar = new RegExp('$', 'g');
    const userSalt = this.getUserSalt(userEmail)
    const hashToken = (await hash(userEmail, userSalt)).replace(regexSlash,'x')
    const hashTokenParse = hashToken.replace(regexDollar, 'd')
    const recoveryLink = 'https://localhost:3000/api/' + hashTokenParse
    const transporter = createTransport({
      host: process.env['SMTP_HOST'],
    port: 2525,
    auth: {
        user: process.env['SMTP_USER'],
        pass: process.env['SMTP_PASS']
      }
    });
    const expirationTime = Date.now() + 10 * 60 * 1000
    const PRObject = {emailAddress: userEmail, token : hashTokenParse, expiration : expirationTime}
    console.log(PRObject)


    const mailOptions = {
      from: process.env['SMTP_SENDER'],
      to: userEmail,
      subject: 'MeetApp: Forgot Password',
      text: 'Click the link below to recover your account.\n' + recoveryLink + '\n\n' +'Click the link below to unsubscribe',
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error('Error:', error);
        return {message: 'unsuccessful', payload: error}
      } else {
        console.log('Email sent:', info.response);
        return {message: 'successful', payload : await this.create(PRObject)}
        
      }
    });
  }

  async verifyEmailToken(email: string, token : string){
    const PR = await this.passwordRecoveryModel.findOne({emailAddress: email})
    if (!PR)
      return {message: 'unsuccessful', payload: 'Password recovery not requested'}
    if (PR.token != token)
      return {message: 'unsuccessful', payload: 'Invalid token'}
    if (PR.expiration < Date.now())
      return {message: 'unsuccessful', payload: 'Token expired'}
    return {message: 'successful', payload: 'Request accepted'}

  }
  

  getAsciiSum(str : string) {
    let sum = 0;
  
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      sum += charCode;
    }
  
    return sum;
  }

  getUserSalt(usermail : string){
    return (this.getAsciiSum(usermail) * usermail.length) % 5
  }

}
