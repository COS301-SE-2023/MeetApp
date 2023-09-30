import { Module } from '@nestjs/common';
import { ApiBackendModule } from '@capstone-meet-app/api/backend'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ApiBackendModule, ConfigModule.forRoot({envFilePath: '../../../../.env', isGlobal : true}), MongooseModule.forRoot(process.env.DB_CONNECTION_STRING_SEDI, {dbName: process.env.DB_NAME_SEDI})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 