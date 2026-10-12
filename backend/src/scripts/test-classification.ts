import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import path from 'path';
import { groqClient } from '../services/ai/groq.client';

async function run() {
  console.log('Testing Spider vs Non-Spider Vision Classification...');

  const spiderPath = path.resolve(__dirname, '../../images/funnel-web/funnel-web-1.jpg');
  if (fs.existsSync(spiderPath)) {
    const spiderBuf = fs.readFileSync(spiderPath);
    const res = await groqClient.identifySpiderImage(spiderBuf, 'image/jpeg');
    console.log('\n--- 🕷️ SPIDER TEST ---');
    console.log(JSON.stringify(res, null, 2));
  }

  const iconPath = path.resolve(__dirname, '../../../mobile/assets/images/icon.png');
  if (fs.existsSync(iconPath)) {
    const iconBuf = fs.readFileSync(iconPath);
    const res = await groqClient.identifySpiderImage(iconBuf, 'image/png');
    console.log('\n--- 🚫 NON-SPIDER TEST ---');
    console.log(JSON.stringify(res, null, 2));
  }
}

run().catch(console.error);
