import { TestPo } from '@model/po';
import { BriskOrmDao, Dao } from 'brisk-orm';

@Dao(TestPo)
export class TestDao extends BriskOrmDao<TestPo> {

}
