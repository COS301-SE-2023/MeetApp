import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { PendingAccountsService } from './pendingaccounts.service';
import { CreatePendingAccountDto } from './dto/create-pendingaccount.dto';
import { ApiOperation, ApiResponse, ApiParam, ApiTags, ApiSecurity } from '@nestjs/swagger';

@Controller('attendances')
@ApiSecurity('Api-Key')
@ApiTags('Attendances')
export class PendingAccountsController {
  constructor(private readonly pendingAccountsService: PendingAccountsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new pending account' }) 
  @ApiResponse({ status: 201, description: 'Pending account created successfully' })
  create(@Body() createPendingAccount: CreatePendingAccountDto ) {
    
    return this.pendingAccountsService.create(createPendingAccount);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pending accounts' }) 
  @ApiResponse({ status: 201, description: 'List of pending accounts' })
  findAll() {
    
    return this.pendingAccountsService.findAll();
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
