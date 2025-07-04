const cron = require('node-cron');
const { exec } = require('child_process');
let c = 0;

const restartMCPEBot = () => {
  exec('pm2 restart mcpebot', (err, stdout, stderr) => {
    if (err) {
      console.error('Restart error:', err);
      return;
    }
    console.log('Restarted mcpebot:', stdout);
  });
};

cron.schedule('*/15 * * * *', async () => {
  //console.log('[CRON] Starting restart sequence...');
  console.log(`[CRON] Starting restart sequence at ${new Date().toLocaleTimeString()}`);

  //restartMCPEBot(); // 1st
  restartMCPEBot(); // 2nd

  await new Promise(resolve => setTimeout(resolve, 10000));
  restartMCPEBot(); // 3rd

  await new Promise(resolve => setTimeout(resolve, 10000));
  //restartMCPEBot(); // 4th

  //console.log('[CRON] Restart sequence finished.');
  console.log(`[CRON] Restart sequence finished at ${new Date().toLocaleTimeString()}`);
});
