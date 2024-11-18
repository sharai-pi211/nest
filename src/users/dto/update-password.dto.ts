import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'Old password of the user',
    example: 'OldPassword123',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    description: 'New password of the user',
    example: 'NewPassword123',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
