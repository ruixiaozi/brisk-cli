import {
  Column,
  PrimaryKey,
  Table,
  BRISK_ORM_TYPE_E,
} from 'brisk-orm';

@Table('test', {
  softDelete: true,
})
export class TestPo {

  @PrimaryKey({ type: BRISK_ORM_TYPE_E.LONG })
  public id!: number;

  @Column()
  public name!: string;

  @Column()
  public password!: string;

  @Column({
    dbName: 'delete_at',
    default: new Date(0),
    deleteValue: () => new Date(),
  })
  public deleteAt?: Date;

  @Column({ dbName: 'create_time' })
  public createTime!: Date;
}
