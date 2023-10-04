import { Module } from '@nestjs/common';
import { PasswordRecoveriesService } from './passwordrecoveries.service';
import { PasswordRecoveriesController } from './passwordrecoveries.controller';
import { PasswordRecovery, PasswordRecoverySchema } from './schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schema';
import { Organisation, OrganisationSchema } from '../organisations/schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: PasswordRecovery.name, schema: PasswordRecoverySchema }, {name : User.name, schema: UserSchema}, {name : Organisation.name, schema: OrganisationSchema}]), JwtModule.register({
    global: true,
    secret: process.env['JWT_PRIVATE_KEY'],
    signOptions: { expiresIn: '1 day' },
  })],
  controllers: [PasswordRecoveriesController],
  providers: [PasswordRecoveriesService]
})
export class PasswordRecoveriesModule {}
