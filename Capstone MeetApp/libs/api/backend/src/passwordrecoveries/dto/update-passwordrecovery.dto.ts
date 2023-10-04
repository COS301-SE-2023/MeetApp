import { PartialType } from '@nestjs/mapped-types';
import { CreatePasswordRecoveryDto } from './create-passwordrecovery.dto';

export class UpdatePasswordRecoveryDto extends PartialType(CreatePasswordRecoveryDto) {}
