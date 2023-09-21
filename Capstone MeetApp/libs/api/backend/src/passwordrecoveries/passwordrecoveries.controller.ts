import { Controller, Get, Param, Delete, Post, Body, Query } from '@nestjs/common';
import { PasswordRecoveriesService } from './passwordrecoveries.service';
import { CreatePasswordRecoveryDto } from './dto/create-passwordrecovery.dto';
import { ApiOperation, ApiResponse, ApiParam, ApiTags, ApiSecurity } from '@nestjs/swagger';

@Controller('passwordrecoveries')
@ApiSecurity('Api-Key')
@ApiTags('PasswordRecoveries')
export class PasswordRecoveriesController {
  constructor(private readonly passwordRecoveryService: PasswordRecoveriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new password recovery' }) 
  @ApiResponse({ status: 201, description: 'Password recovery created successfully' })
  create(@Body() createPRDto: CreatePasswordRecoveryDto, ) {
    
    return this.passwordRecoveryService.create(createPRDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all password recoveries' }) 
  @ApiResponse({ status: 201, description: 'List of password recoveries' })
  findAll() {
    
    return this.passwordRecoveryService.findAll();
  }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get a specific password recovery' }) 
  // @ApiResponse({ status: 201, description: 'Specified password recovery' })
  // @ApiParam({name : 'id', description: 'The password recovery id to find', required: true})
  // findOne(@Param('id') id: string, ) {
    
  //   return this.passwordRecoveryService.findOne(id);
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific password recovery' }) 
  @ApiResponse({ status: 201, description: 'Deleted password recovery' })
  @ApiParam({name : 'id', description: 'The password recovery id to delete', required: true})
  remove(@Param('id') id: string, ) {
    
    return this.passwordRecoveryService.remove(id);
  }

  @Post('send')
  async emailSend(@Body('emailAddress') email: string){
    return await this.passwordRecoveryService.sendEmail(email)
  }

  @Get('verify')
  async tokenVerify(@Query('token') token: string, @Query('email') email: string){
    return await this.passwordRecoveryService.verifyEmailToken(email, token)
  }
}
