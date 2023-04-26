import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

enum StateType {
  WAITPAID = "wait-paid",
  WAITSHIPPED = "wait-shipped",
  WAITRECEIVE = "wait-receive",
  WAITCOMMENT = "wait-comment",
  FINISH = "finish",
  CANCEL = "cancel",
  INVALID = "invalid",
}

@Entity()
export class OrderInformation {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  _id: string;

  @Column({
    type: "enum",
    enum: StateType,
  })
  order_state: StateType;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  add_time: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  update_time: Date;

  @Index()
  @Column({ type: "bigint", unsigned: true })
  user_id: string;
}
