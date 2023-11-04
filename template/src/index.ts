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
  level: process.env.NODE_ENV === 'development' ? LOGGER_LEVEL_E.debug : LOGGER_LEVEL_E.info,
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
  await BriskORM.connect({
    ...typeCast<BriskOrmConnectOption>(db),
     // 同步数据库
    autoSync: {
      enable: true,
      enableUpdateTable: true,
      enableDeleteTable: true,
      expectTables: [],
    },
  });

  await BriskController.start(Number(process.env.PORT || 3000), {
    // 是否开启跨域
    cors: true,
    swagger: true,
    // 静态文件，可直接访问
    staticPath: path.join(process.env.RESOURCE_PATH!, 'public'),
    globalBaseUrl: process.env.BASE_URL,
  });

  if (process.env.NODE_ENV === 'development') {
    logger.info(`Swagger: http://localhost:${process.env.PORT || 3000}${process.env.BASE_URL}swagger/index.html`);
  }
})();

process.on('exit', async() => {
  await BriskController.distory();
  await BriskORM.distory();
});

process.on('uncaughtException', (error) => {
  logger.error('global error:', error);
});
