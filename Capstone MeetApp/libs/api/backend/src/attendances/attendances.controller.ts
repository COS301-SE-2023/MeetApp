import { Controller, Get, Param, Delete, Post, Body, Headers, Logger } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('attendances')
@ApiTags('Attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new attendance' }) 
  @ApiResponse({ status: 201, description: 'Attendance created successfully' })
  create(@Body() createAttendanceDto: CreateAttendanceDto, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader)
    return this.attendancesService.create(createAttendanceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all attendances' }) 
  @ApiResponse({ status: 201, description: 'List of attendances' })
  findAll(@Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader)
    return this.attendancesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific attendance' }) 
  @ApiResponse({ status: 201, description: 'Specified attendance' })
  @ApiParam({name : 'id', description: 'The attendance id to find', required: true})
  findOne(@Param('id') id: string, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader)
    return this.attendancesService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific attendance' }) 
  @ApiResponse({ status: 201, description: 'Deleted attendance' })
  @ApiParam({name : 'id', description: 'The attendance id to delete', required: true})
  remove(@Param('id') id: string, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader)
    return this.attendancesService.remove(id);
  }
}
