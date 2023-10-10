import { PartialType } from '@nestjs/mapped-types';
import { CreatePendingAccountDto } from './create-pendingaccount.dto';

export class UpdatePendingAccountDto extends PartialType(CreatePendingAccountDto) {}
