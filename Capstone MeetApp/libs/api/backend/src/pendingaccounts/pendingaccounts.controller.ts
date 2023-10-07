import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { PendingAccountsService } from './pendingaccounts.service';
import { ApiOperation, ApiResponse, ApiParam, ApiTags, ApiSecurity } from '@nestjs/swagger';

@Controller('attendances')
@ApiSecurity('Api-Key')
@ApiTags('Attendances')
export class PendingAccountsController {
  constructor(private readonly pendingAccountsService: PendingAccountsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new pending account' }) 
  @ApiResponse({ status: 201, description: 'Pending account created successfully' })
  sendEmail(@Body('emailAddress') emailAddress : string, @Body('type') type : string ) {
    
    return this.pendingAccountsService.sendEmail(emailAddress, type);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pending accounts' }) 
  @ApiResponse({ status: 201, description: 'List of pending accounts' })
  findAll() {
    
    return this.pendingAccountsService.findAll();
  }

  @Get('isTaken')
  @ApiOperation({ summary: 'Check if the username or email address is taken' }) 
  @ApiResponse({ status: 201, description: 'A payload with the result of the response alongside a message' })
  isTaken(@Body('username') username : string, @Body('emailAddress') emailAddress : string, @Body('type') type : string) {
    
    return this.pendingAccountsService.isTaken(username, emailAddress, type);
  }

  @Get('verify')
  @ApiOperation({ summary: 'Check if the OTP is correct or not' }) 
  @ApiResponse({ status: 201, description: 'A payload with the result of the response alongside a message' })
  verify(@Body('emailAddress') emailAddress : string, @Body('code') code : number, @Body('type') type : string) {
    
    return this.pendingAccountsService.verify(emailAddress, code, type);
  }


  

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific pending account' }) 
  @ApiResponse({ status: 201, description: 'Specified pending account' })
  @ApiParam({name : 'id', description: 'The pending account id to find', required: true})
  findOne(@Param('id') id: string, ) {
    
    return this.pendingAccountsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific pending account' }) 
  @ApiResponse({ status: 201, description: 'Deleted pending account' })
  @ApiParam({name : 'id', description: 'The pending account id to delete', required: true})
  remove(@Param('id') id: string, ) {
    
    return this.pendingAccountsService.remove(id);
  }
}
