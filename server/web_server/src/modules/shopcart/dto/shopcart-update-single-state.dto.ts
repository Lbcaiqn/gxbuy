import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

enum CommandType {
  Add = 'add',
  Reduce = 'reduce',
  Selected = 'selected',
}

export class ShopcartUpdateSingleStateDto {
  @IsNotEmpty()
  @IsEnum(CommandType)
  @ApiProperty({ type: String, example: 'add' })
  command: CommandType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: '12345' })
  goods_sku_id: string;
}
