import { Controller, Get, Param, Delete, Post } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
//import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { ApiOperation, ApiResponse, ApiParam, ApiTags, ApiSecurity } from '@nestjs/swagger';

@Controller('recommendations')
@ApiSecurity('Api-Key')
@ApiTags('Recommendations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  // @Post()
  // @ApiOperation({ summary: 'Create a new recommendation' }) 
  // @ApiResponse({ status: 201, description: 'Recommendation created successfully' })
  // create(@Body() createRecommendationDto: CreateRecommendationDto, ) {
    
  //   return this.recommendationsService.create(createRecommendationDto);
  // }

  @Get(':username')
  @ApiOperation({ summary: 'Get a specific recommendation' }) 
  @ApiResponse({ status: 201, description: 'Specified recommendation' })
  @ApiParam({name : 'username', description: 'The username to find recommendations for', required: true})
  findOne(@Param('username') username: string, ) {
    
    return this.recommendationsService.getRecommendations(username);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific recommendation' }) 
  @ApiResponse({ status: 201, description: 'Deleted recommendation' })
  @ApiParam({name : 'id', description: 'The recommendation id to delete', required: true})
  remove(@Param('id') id: string, ) {
    
    return this.recommendationsService.remove(id);
  }

  @Post('initialise')
  async initialiseDocs(){
    return this.recommendationsService.updateDocs()
  }

  @Post('initialise/:username')
  async initialiseDocsSignle(@Param('username') username : string){
    return this.recommendationsService.updateDocsSingle(username)
  }
}
