import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {PendingAccount } from './schema';
import { User } from '../users/schema';
import { Organisation } from '../organisations/schema';
import { createTransport} from 'nodemailer';

@Injectable()
export class PendingAccountsService {
  constructor(@InjectModel(PendingAccount.name) private pendingAccountModel: Model<PendingAccount>, @InjectModel(User.name) private userModel: Model<User>, @InjectModel(Organisation.name) private orgModel: Model<Organisation>){
    
  }
  async sendEmail(emailAddress: string, type : string) {
    const checkPA = await this.pendingAccountModel.findOne({ emailAddress: emailAddress, type: type }).exec();

    if (checkPA){

      if (checkPA.verfied)
        return {payload: "", message : "Account has already been verified"}

      const code = Math.floor(Math.random() * 900000) + 100000;
      const pendingAccountUpdate = await this.pendingAccountModel.findByIdAndUpdate(checkPA._id, {OTP : code}, { new: true }).exec();

      if (!pendingAccountUpdate)
        return {payload: null, message : "Resending failed, try again later"}

      const transporter = createTransport({
        host: process.env['SMTP_HOST'],
        port: 2525,
        auth: {
          user: process.env['SMTP_USER'],
          pass: process.env['SMTP_PASS']
        }
      });

      const mailOptions = {
        from: process.env['SMTP_SENDER'],
        to: emailAddress,
        subject: 'MeetApp: OTP',
        text: 'Use the One Time Pin below to verify your account.\n' + pendingAccountUpdate.OTP + '\n\n' +'Click the link below to unsubscribe',
      };

      return transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          const deletedPA = await this.pendingAccountModel.findByIdAndDelete(pendingAccountUpdate._id).exec();
          Logger.log(deletedPA?.emailAddress + " has been deleted")
          return {message: 'Email failed to send, try again later', payload: null}
        } else {
          Logger.log("Email sent successfully \n" + info)
            return {message: 'OTP resent successfully', payload : pendingAccountUpdate}   
        }

      })
    }
    const code = Math.floor(Math.random() * 900000) + 100000;
    const createPAdto = {emailAddress : emailAddress, OTP : code, type : type, verified : false}
    const newPA = await new this.pendingAccountModel(createPAdto);
    const savedNewPA = await newPA.save()
    if (!savedNewPA)
      return {payload: null, message : "Error saving pending account"}
    const transporter = createTransport({
      host: process.env['SMTP_HOST'],
      port: 2525,
      auth: {
        user: process.env['SMTP_USER'],
        pass: process.env['SMTP_PASS']
      }
    });

    const mailOptions = {
      from: process.env['SMTP_SENDER'],
      to: emailAddress,
      subject: 'MeetApp: OTP',
      text: 'Use the One Time Pin below to verify your account.\n' + savedNewPA.OTP + '\n\n' +'Click the link below to unsubscribe',
    };

    return transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        const deletedPA = await this.pendingAccountModel.findByIdAndDelete(savedNewPA._id).exec();
        Logger.log(deletedPA?.emailAddress + " has been deleted")
        return {message: 'Email failed to send, try again later', payload: null}
      } else {
          Logger.log("Email sent successfully \n" + info)
          return {message: 'OTP resent successfully', payload : savedNewPA}   
      }

    })
  }

  findAll() {
    return this.pendingAccountModel.find().exec();
  }

  findOne(id: string) {
    return this.pendingAccountModel.findById(id).exec();
  }

  // update(id: number, updatePendingAccountDto: UpdatePendingAccountDto) {
  //   return `This action updates a #${id} pending account`;
  // }

  async remove(id: string) {
    const deletedPA = await this.pendingAccountModel.findByIdAndDelete(id);
    if (!deletedPA) {
      throw new NotFoundException(`Pending account #${id} not found`);
    }
    return deletedPA;
  }

  async isTaken(username : string, emailAddress : string, type : string){
    if (type == 'User'){
      const userCheckEmail = await this.userModel.findOne({emailAddress: emailAddress}).exec()
      if (userCheckEmail)
        return {payload : true, message : 'Email address already exists'}
      const userCheckName = await this.userModel.findOne({username: username}).exec()
      if (userCheckName)
        return {payload : true, message : 'Username already exists'}
      return {payload : false, message : 'Username and email address are uqniue'}
      
    }
    else if (type == 'Organisation'){
      const orgCheckEmail = await this.orgModel.findOne({emailAddress: emailAddress}).exec()
      if (orgCheckEmail)
        return {payload : true, message : 'Email address already exists'}
      const orgCheckName = await this.orgModel.findOne({username: username}).exec()
      if (orgCheckName)
        return {payload : true, message : 'Username already exists'}
      return {payload : false, message : 'Username and email address are uqniue'}

    }
    return {payload : null, message : "Invalid account type"}
  }

  async verify(emailAddress : string, code : number, type : string)
  {
    const pendingAccount = await this.pendingAccountModel.findOne({ emailAddress: emailAddress, type : type}).exec()
    if (!pendingAccount)
      return {payload: null, message: 'Account not found'}
    if (pendingAccount.verfied)
      return {payload: null, message: 'Email address already verified'}
    if (pendingAccount.OTP != code)
      return {payload: null, message: 'Invalid pin'}
    const pendingAccountUpdate = await this.pendingAccountModel.findByIdAndUpdate(pendingAccount._id, {verified : true}, { new: true }).exec();
    if (!pendingAccountUpdate)
      return {payload: null, message: 'Verification failed, try again later'}
    return {payload: pendingAccountUpdate, message: 'Account verfied!'}
      
  }
}
