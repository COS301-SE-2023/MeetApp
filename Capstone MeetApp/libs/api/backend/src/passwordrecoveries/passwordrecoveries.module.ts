import { Module } from '@nestjs/common';
import { PasswordRecoveriesService } from './passwordrecoveries.service';
import { PasswordRecoveriesController } from './passwordrecoveries.controller';
import { PasswordRecovery, PasswordRecoverySchema } from './schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schema';
import { Organisation, OrganisationSchema } from '../organisations/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PasswordRecovery.name, schema: PasswordRecoverySchema }, {name : User.name, schema: UserSchema}, {name : Organisation.name, schema: OrganisationSchema}])],
  controllers: [PasswordRecoveriesController],
  providers: [PasswordRecoveriesService]
})
export class PasswordRecoveriesModule {}
