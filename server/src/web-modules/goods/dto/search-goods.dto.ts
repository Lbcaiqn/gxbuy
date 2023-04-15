import { ApiProperty } from '@nestjs/swagger/dist';

export class SearchGoodDto {
  @ApiProperty({ type: String, example: '衣服' })
  keyword: string;

  @ApiProperty({ type: Number, example: 1219 })
  c1id: number;

  @ApiProperty({ type: Number, example: 1249 })
  c2id: number;

  @ApiProperty({ type: Number, example: 1269 })
  c3id: number;

  @ApiProperty({ type: Number, example: 30 })
  pageSize: number;

  @ApiProperty({ type: Number, example: 1 })
  page: number;
}
