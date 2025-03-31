import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FindOneDeviceDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
