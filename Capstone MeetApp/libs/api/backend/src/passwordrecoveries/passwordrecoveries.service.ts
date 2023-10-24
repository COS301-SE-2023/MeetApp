import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordRecovery } from './schema';
import { CreatePasswordRecoveryDto } from './dto/create-passwordrecovery.dto';
import { createTransport} from 'nodemailer';
import {hash} from 'bcrypt'
import { User } from '../users/schema';
import { Organisation } from '../organisations/schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PasswordRecoveriesService {
  constructor(@InjectModel(PasswordRecovery.name) private passwordRecoveryModel: Model<PasswordRecovery>, @InjectModel(User.name) private userModel: Model<User>, @InjectModel(Organisation.name) private orgModel: Model<Organisation>, private jwtService : JwtService){
    
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
    const userExists = await this.userModel.find({emailAddress : userEmail})
    const orgExists = await this.orgModel.find({emailAddress : userEmail})
    if (!userExists && !orgExists)
      return {message : 'Unsuccessful', payload : 'Account does not exist'}
    
    const regexSlash = new RegExp('/', 'g');
    const regexDollar = new RegExp('$', 'g');
    const userSalt = this.getUserSalt(userEmail)
    const hashToken = (await hash(userEmail, userSalt)).replace(regexSlash,'x')
    const hashTokenParse = hashToken.replace(regexDollar, 'd')
    const recoveryLink = 'http://dev-meetapp.s3-website.af-south-1.amazonaws.com/forgotpassword/' + hashTokenParse
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

    return transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        return {message: 'unsuccessful', payload: error}
      } else {
        return {message: 'successful', payload : {id : info, object : await this.create(PRObject)}}
        
      }
    });
  }

  async verifyEmailToken(email: string, token : string){
    const PR = await this.passwordRecoveryModel.find({emailAddress: email})
    if (!PR)
      return {message: 'unsuccessful', payload: 'Password recovery not requested'}
  const latestPR = PR[PR.length -1]
    if (latestPR.token != token)
      return {message: 'unsuccessful', payload: 'Invalid token'}
    if (latestPR.expiration < Date.now())
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
  getUserSaltReset(username : string, plainPass : string){
    return (this.getAsciiSum(username) * plainPass.length) % 8
  }

  async passwordrest(usermail : string, newPassword : string)
  {
  //createUserDto.password
  //const user = await this.userModel.findOne({emailAddress: usermail}).exec();
  const userExists = await this.userModel.find({emailAddress : usermail}).exec()
  console.log(userExists)
  
  const orgExists = await this.orgModel.find({emailAddress : usermail}).exec()
  console.log(orgExists)
  if (orgExists.length==0 && userExists){
    const user = await this.userModel.findOne({emailAddress: usermail}).exec();
    if (!user)
      return {message : 'Unsuccessful', payload : 'Account does not exist, er'}
    const userSalt = this.getUserSaltReset(user.username, newPassword)
    const hashedPass = await hash(newPassword, userSalt)
    const userUpdated = await this.userModel.findOneAndUpdate({emailAddress: user.emailAddress},{password : hashedPass}).exec()
    if (!userUpdated)
      return {message : 'Password recovery failed', payload : 'null'}
    const payload = {id : (await userUpdated).id, username : (await userUpdated).username, password: (await userUpdated).password}
    return {access_token: await this.jwtService.signAsync(payload),message : 'Recovery successful'}
  }


  else if (userExists.length==0 && orgExists)

  {
    const user = await this.orgModel.findOne({emailAddress: usermail}).exec();
    if (!user)
      return {message : 'Unsuccessful', payload : 'Account does not exist, Org'}
    const userSalt = this.getUserSaltReset(user.username, newPassword)
    const hashedPass = await hash(newPassword, userSalt)
    const userUpdated = await this.orgModel.findOneAndUpdate({emailAddress: user.emailAddress},{password : hashedPass}).exec()
    if (!userUpdated)
      return {message : 'Password recovery failed', payload : 'null'}
    const payload = {id : (await userUpdated).id, username : (await userUpdated).username, password: (await userUpdated).password}
    console.log("succes")
    return {access_token: await this.jwtService.signAsync(payload),message : 'Recovery successful'}
  }
  else
    return {message : 'Unsuccessful', payload : 'Account does not exist, Both'}

}
  
}
