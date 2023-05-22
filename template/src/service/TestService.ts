import { typeCast } from 'brisk-ts-extends';
import { TestDao } from '@dao';
import { TestVo } from '@model/vo';
import { AutoWrite, Service } from 'brisk-ioc';
import { Log, Logger } from 'brisk-log';

@Service()
export class TestService {

  @AutoWrite()
  private testDao!: TestDao;

  @Log(Symbol(TestService.name))
  private logger!: Logger;

  /**
   * hello
   * @returns
   */
  public async hello(): Promise<TestVo[]> {
    this.logger.info('hello');
    const list = (await this.testDao.list())?.map((item) => typeCast<TestVo>(item));
    return list || [];
  }

}
