import { Injectable } from '@nestjs/common';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Organisation } from './schema';
import mongoose, { Model } from 'mongoose';
import { EventsService } from '../events/events.service';

@Injectable()
export class OrganisationsService {
  constructor(@InjectModel(Organisation.name) private organisationModel: Model<Organisation>, private eventService :EventsService){
    
  }
  create(createOrganisationDto: CreateOrganisationDto) {
    return 'This action adds a new organisation';
  }

  findAll() {
    return this.organisationModel.find().exec();
  }

  findOne(id: string) {
    //const ObjectIdfromString = ObjectId.createFromHexString(id)
    return this.organisationModel.findById(id).exec(); 
  }

  update(id: number, updateOrganisationDto: UpdateOrganisationDto) {
    return `This action updates a #${id} organisation`;
  }

  remove(id: number) {
    return `This action removes a #${id} organisation`;
  }
}
