import {
  Column,
  PrimaryKey,
  Table,
} from 'brisk-orm';

@Table('test')
export class TestPo {

  @PrimaryKey()
  public id!: string;

  @Column()
  public name!: string;

  @Column()
  public password!: string;

}
