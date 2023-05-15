import path from 'path';
import BriskController from 'brisk-controller';
import BriskORM, { BriskOrmConnectOption } from 'brisk-orm';
import { configure, LOGGER_LEVEL_E, getLogger } from 'brisk-log';
import { typeCast } from 'brisk-ts-extends';

// 静态导入
import './model/po';
import './model/vo';
import './dao';
import './service';
import './controller';

// 配置日志
configure({
  level: process.env.NODE_ENV === 'development' ? LOGGER_LEVEL_E.info : LOGGER_LEVEL_E.warn,
  enableFile: true,
});

// default可改为自己的项目名称
const logger = getLogger(Symbol('default'));

(async() => {
  const db = require(path.join(process.env.RESOURCE_PATH!, './db.json'));
  if (!db) {
    logger?.error('no db config');
    return;
  }
  BriskORM.connect(typeCast<BriskOrmConnectOption>(db));
  // 同步数据库
  await BriskORM.autoSync();
  await BriskController.start(3000, {
    // 是否开启跨域
    cors: true,
    swagger: process.env.NODE_ENV === 'development',
    // 静态文件，可直接访问
    staticPath: path.join(process.env.RESOURCE_PATH!, 'public'),
    globalBaseUrl: process.env.BASE_URL,
  });
})();

process.on('exit', async() => {
  await BriskController.distory();
  await BriskORM.distory();
});
