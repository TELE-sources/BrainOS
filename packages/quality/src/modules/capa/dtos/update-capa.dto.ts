import { PartialType } from '@nestjs/mapped-types';
export class UpdateCAPADto extends PartialType(CreateCAPADto) {}
