import { Module } from '@nestjs/common';
import { ApiBackendModule } from '@capstone-meet-app/api/backend'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ApiBackendModule, MongooseModule.forRoot('mongodb+srv://Akani_H:K35873587@cluster0.lyg43am.mongodb.net/?retryWrites=true&w=majority', {dbName: 'MeetApp'})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 