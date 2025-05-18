import cron from 'node-cron';
import { clearDatabase } from './utils';

cron.schedule('0 0 */5 * *', async () => {
  await clearDatabase();
});
