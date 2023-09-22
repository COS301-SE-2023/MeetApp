import { Module } from '@nestjs/common';
import { PasswordRecoveriesService } from './passwordrecoveries.service';
import { PasswordRecoveriesController } from './passwordrecoveries.controller';
import { PasswordRecovery, PasswordRecoverySchema } from './schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PasswordRecovery.name, schema: PasswordRecoverySchema }, {name : User.name, schema: UserSchema}])],
  controllers: [PasswordRecoveriesController],
  providers: [PasswordRecoveriesService]
})
export class PasswordRecoveriesModule {}
