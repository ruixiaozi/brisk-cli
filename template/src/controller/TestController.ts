import { ResultVo, TestVo } from '@/model/vo';
import { TestService } from '@/service';
import { BRISK_CONTROLLER_METHOD_E, Controller, InQuery, RequestMapping } from 'brisk-controller';
import { AutoWrite } from 'brisk-ioc';
import { Log, Logger } from 'brisk-log';

@Controller('/test', { tag: { name: 'test', description: '测试' } })
export class TestController {

  @AutoWrite()
  private testService!: TestService;


  @Log(Symbol(TestController.name))
  private logger!: Logger;


  // GET /test/hello
  @RequestMapping('/hello', {
    title: '你好',
    description: '你好',
    method: BRISK_CONTROLLER_METHOD_E.GET,
  })
  async hello(@InQuery() name?: string): Promise<ResultVo<TestVo[]>> {
    this.logger.info(`hello ${name}`);
    const res = await this.testService.hello();
    return new ResultVo(true, `hello ${name}`, res);
  }


}
