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

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organisationsService.remove(+id);
  }
  @UseGuards(AuthGuard)
  @Get(':id/events/top3')
  async getTop3AttendedEvents(@Param('id') organizationId: string) {
    return this.organisationsService.getTop3AttendedEvents(organizationId);
  }

  @UseGuards(AuthGuard)
  @Get(':id/events/top')
  async getTopAttendedEvent(@Param('id') organizationId: string) {
    return this.organisationsService.getTopAttendedEvent(organizationId);
  }

  @UseGuards(AuthGuard)
  @Get(':id/events/top3-categories')
  async getTop3EventCategories(@Param('id') organizationId: string) {
    return this.organisationsService.getTop3EventCategories(organizationId);
  }

  @UseGuards(AuthGuard)
  @Get(':id/events/top-category')
  async getTopEventCategory(@Param('id') organizationId: string) {
    return this.organisationsService.getTopEventCategory(organizationId);
  }

  @UseGuards(AuthGuard)
  @Get(':id/events/top-region')
  async getTopEventRegion(@Param('id') organizationId: string) {
    return this.organisationsService.getTopEventRegion(organizationId);
  }

  @UseGuards(AuthGuard)
  @Get(':id/events/top3-regions')
  async getTop3EventRegions(@Param('id') organizationId: string) {
    return this.organisationsService.getTop3EventRegion(organizationId);
  }

  @UseGuards(AuthGuard)
  @Get(':id/events/top3-supporters-events')
  async getTop3SupportersAndEvents(@Param('id') organizationId: string) {
    return this.organisationsService.getTop3SupportersAndTheirTopEvents(organizationId);
  }

  @UseGuards(AuthGuard)
  @Get(':id/events/top-supporters-events')
  async getTopSupportersAndEvents(@Param('id') organizationId: string) {
    return this.organisationsService.getTopSupportersAndTheirTopEvents(organizationId);
  }

  @UseGuards(AuthGuard)
  @Get(':id/events/top3-supporters')
  async getTop3Supporters(@Param('id') organizationId: string) {
    return this.organisationsService.getTop3Supporters(organizationId);
  }

  @UseGuards(AuthGuard)
  @Get(':id/events/top-supporter')
  async getTopSupporter(@Param('id') organizationId: string) {
    return this.organisationsService.getTopSupporter(organizationId);
  }

  @UseGuards(AuthGuard)
  @Get(':id/events/region-count')
  async getRegionCount(@Param('id') organizationId: string) {
    return this.organisationsService.getRegionCount(organizationId);
  }

  @UseGuards(AuthGuard)
  @Get(':id/events/category-count')
  async getCategoryCount(@Param('id') organizationId: string) {
    return this.organisationsService.getCategoryCount(organizationId);
  }
  
  
}
