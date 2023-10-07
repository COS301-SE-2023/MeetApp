import { Module } from '@nestjs/common';
import { PendingAccountsService } from './pendingaccounts.service';
import { PendingAccountsController } from './pendingaccounts.controller';
import { PendingAccount, PendingAccountSchema } from './schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: PendingAccount.name, schema: PendingAccountSchema }])],
  controllers: [PendingAccountsController],
  providers: [PendingAccountsService]
})
export class PendingAccountsModule {}
