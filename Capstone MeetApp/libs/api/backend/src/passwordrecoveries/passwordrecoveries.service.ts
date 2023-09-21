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
    const userSalt = this.getUserSalt(userEmail)
    const hashToken = (await hash(userEmail, userSalt)).replace('/','x').replace('$','d')
    const recoveryLink = 'https://localhost:3000/api/' + hashToken
    const transporter = createTransport({
      host: process.env['SMTP_HOST'],
    port: 2525,
    auth: {
        user: process.env['SMTP_USER'],
        pass: process.env['SMTP_PASS']
      }
    });
    const expirationTime = Date.now() + 10 * 60 * 1000
    const PRObject = {emailAddress: userEmail, token : hashToken, expiration : expirationTime}
    console.log(PRObject)


    const mailOptions = {
      from: process.env['SMTP_SENDER'],
      to: userEmail,
      subject: 'MeetApp: Forgot Password',
      text: 'Click the link below to recover your account.\n' + recoveryLink + '\n\n' +'Click the link below to unsubscribe',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Email sent:', info.response);
        this.create
      }
    });
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
