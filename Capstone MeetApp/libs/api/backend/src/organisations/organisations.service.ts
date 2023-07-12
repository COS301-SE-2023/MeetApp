import { Injectable } from '@nestjs/common';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
// import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Organisation } from './schema';
import { Model } from 'mongoose';
import { EventsService } from '../events/events.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OrganisationsService {
  constructor(@InjectModel(Organisation.name) private organisationModel: Model<Organisation>, private eventService :EventsService, private jwtService: JwtService){
    
  }
  async create(createOrgDto: CreateOrganisationDto) {
    const newOrg = await new this.organisationModel(createOrgDto);
    return newOrg.save();
  }
  async login(username: string, password: string) {
    const orgToLoginInto = await this.organisationModel.find({username : username}).exec()
    if (orgToLoginInto.length == 0){
      return {organisation: null, message: 'Organisation not found'}
    }
    else {
      if (orgToLoginInto[0].password == password){
        const payload = {id : orgToLoginInto[0].id, username : orgToLoginInto[0].username, password: orgToLoginInto[0].password}
        return {access_token: await this.jwtService.signAsync(payload),message : 'Login successful'}
      }
      else{
        return {organisation: username, message : 'Incorrect password'}
      }
    }
  }

  findAll() {
    return this.organisationModel.find().exec();
  }

  findOne(id: string) {
    //const ObjectIdfromString = ObjectId.createFromHexString(id)
    return this.organisationModel.findById(id).exec(); 
  }

  async findEvents(id: string) {
    const orgDoc = await this.organisationModel.findById(id).exec();
    if (orgDoc){
      const eventsArr = orgDoc.events;
    
  
    const eventPromises = eventsArr.map((currentEventID) =>
      this.eventService.findOne(currentEventID.toString())
    );
  
    const eventInfoArr = await Promise.all(eventPromises);
    console.log(eventInfoArr);
    return eventInfoArr;
    }
    else
      return []
  }

  // update(id: number, updateOrganisationDto: UpdateOrganisationDto) {
  //   NotImplementedException
  //   return `This action updates a #${id} organisation`;
  // }

  remove(id: number) {
    return `This action removes a #${id} organisation`;
  }
}
