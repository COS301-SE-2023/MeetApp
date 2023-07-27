import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  Request,
  UseGuards
} from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { AuthGuard } from './organisations.guard';

interface AuthenticatedRequest extends Request {
  organisation: {id : string, username : string, password: string};
}

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

  @UseGuards(AuthGuard)
  @Get('account')
  getAccount(@Request() req : AuthenticatedRequest) {
      return req.organisation;
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

  @Get(':id/events/top3')
  async getTop3AttendedEvents(@Param('id') organizationId: string) {
    return this.organisationsService.getTop3AttendedEvents(organizationId);
  }

  @Get(':id/events/top')
  async getTopAttendedEvent(@Param('id') organizationId: string) {
    return this.organisationsService.getTopAttendedEvent(organizationId);
  }

  @Get(':id/events/top3-categories')
  async getTop3EventCategories(@Param('id') organizationId: string) {
    return this.organisationsService.getTop3EventCategories(organizationId);
  }

  @Get(':id/events/top-category')
  async getTopEventCategory(@Param('id') organizationId: string) {
    return this.organisationsService.getTopEventCategory(organizationId);
  }

  @Get(':id/events/top-region')
  async getTopEventRegion(@Param('id') organizationId: string) {
    return this.organisationsService.getTopEventRegion(organizationId);
  }

  @Get(':id/events/top3-regions')
  async getTop3EventRegions(@Param('id') organizationId: string) {
    return this.organisationsService.getTop3EventRegion(organizationId);
  }

  @Get(':id/events/top3-supporters-events')
  async getTop3SupportersAndEvents(@Param('id') organizationId: string) {
    return this.organisationsService.getTop3SupportersAndTheirTopEvents(organizationId);
  }

  @Get(':id/events/top-supporters-events')
  async getTopSupportersAndEvents(@Param('id') organizationId: string) {
    return this.organisationsService.getTopSupportersAndTheirTopEvents(organizationId);
  }

  @Get(':id/events/top3-supporters')
  async getTop3Supporters(@Param('id') organizationId: string) {
    return this.organisationsService.getTop3Supporters(organizationId);
  }

  @Get(':id/events/top-supporter')
  async getTopSupporter(@Param('id') organizationId: string) {
    return this.organisationsService.getTopSupporter(organizationId);
  }

  @Get(':id/events/region-count')
  async getRegionCount(@Param('id') organizationId: string) {
    return this.organisationsService.getRegionCount(organizationId);
  }

  @Get(':id/events/category-count')
  async getCategoryCount(@Param('id') organizationId: string) {
    return this.organisationsService.getCategoryCount(organizationId);
  }
  
  
}
