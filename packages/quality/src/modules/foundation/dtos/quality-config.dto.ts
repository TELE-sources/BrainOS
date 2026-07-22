import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateQualityConfigDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  parameters: Record<string, any>;

  @IsOptional()
  integrations: Record<string, any>;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  version?: string;

  @IsOptional()
  effectiveFrom?: Date;

  @IsOptional()
  effectiveTo?: Date;
}

export class UpdateQualityConfigDto extends PartialType(CreateQualityConfigDto) {}