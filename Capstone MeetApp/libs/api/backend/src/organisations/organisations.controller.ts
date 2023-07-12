import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';

@Controller('organisations')
export class OrganisationsController {
  constructor(private readonly organisationsService: OrganisationsService) {}

  @Post('signup')
  create(@Body() createOrganisationDto: CreateOrganisationDto) {
    return this.organisationsService.create(createOrganisationDto);
  }

  @Post('login')
  login(@Body() LoginInfo : UpdateOrganisationDto){
    if (LoginInfo != null){
      if (LoginInfo.password != null && LoginInfo.username != null)
        return this.organisationsService.login(LoginInfo.username,LoginInfo.password)
      else 
        return {organisation : null, message: "username or password missing"}
    }
    else
      return {organisation: null, message : "No payload found"}
  }


  @Get()
  findAll() {
    return this.organisationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organisationsService.findOne(id);
  }

  @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateOrganisationDto: UpdateOrganisationDto
  // ) {
  //   return this.organisationsService.update(+id, updateOrganisationDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organisationsService.remove(+id);
  }
}
