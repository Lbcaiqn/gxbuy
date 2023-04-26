import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

enum CommandType {
  Selected = 'selected',
  Cancel = 'cancel',
  ShopSelected = 'shop-selected',
  ShopCancel = 'shop-cancel',
}

export class ShopcartUpdateAllSelectedDto {
  @IsNotEmpty()
  @IsEnum(CommandType)
  @ApiProperty({ type: String, example: 'selected' })
  command: CommandType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: '' })
  shop_id: string;
}
