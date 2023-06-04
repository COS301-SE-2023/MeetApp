import { Module } from '@nestjs/common';
import { ApiBackendModule } from '@capstone-meet-app/api/backend'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ApiBackendModule, MongooseModule.forRoot('mongodb+srv://u19007443:AGGGyM0C7n4VyBtN@cluster0.nh0ftux.mongodb.net/?retryWrites=true&w=majority', {dbName: 'MeetAppMockDB'})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
