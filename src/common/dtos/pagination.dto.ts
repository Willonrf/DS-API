import { IsOptional, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CursorPaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit: number = 10;

  @IsOptional()
  @IsString()
  cursor?: string;
}
