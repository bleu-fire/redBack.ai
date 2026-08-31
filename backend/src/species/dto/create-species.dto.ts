import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSpeciesDto {
  @IsString()
  @IsNotEmpty()
  scientificName: string;

  @IsString()
  @IsOptional()
  commonName?: string;

  @IsString()
  @IsOptional()
  family?: string;

  @IsString()
  @IsOptional()
  genus?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  habitat?: string;

  @IsString()
  @IsOptional()
  distribution?: string;

  @IsString()
  @IsOptional()
  behavior?: string;

  @IsString()
  @IsOptional()
  venomInfo?: string;

  @IsString()
  @IsOptional()
  conservationStatus?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageUrls?: string[];
}
