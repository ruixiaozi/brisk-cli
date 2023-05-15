import 'bytenode';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';

// 设置系统环境
const argv = process.argv.filter((arg) => arg.startsWith('--model'));
const evn = argv?.[0]?.split('=')?.[1] || 'production';
process.env.NODE_ENV = evn;

// 设置resouce path
const resourcePath = process.env.NODE_ENV === 'production' ? __dirname : path.join(__dirname, './resource');
process.env.RESOURCE_PATH = resourcePath;

// 读取环境文件
dotenv.config({ path: path.join(resourcePath, `.env.${evn}`) });

// 加载主程序
if (evn === 'production') {
  const jscPath = path.join(__dirname, './main.jsc');
  if (fs.existsSync(jscPath)) {
    require(jscPath);
  }
} else {
  require(path.join(__dirname, './index'));
}

