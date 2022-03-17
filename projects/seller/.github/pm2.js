const pm2 = require("pm2");
const [res, mode, port] = process.argv.slice(2);
pm2.connect(function (err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }
  pm2.list((err, list) => {
    const name = `${res}.${mode}.${port}`;
    const exist = list.find((proc) => proc.name === name);
    if (exist) {
      pm2.restart(name, (err, proc) => {
        pm2.disconnect();
      });
    } else
      pm2.start(
        {
          script: `npm run ${mode}`,
          name,
          env: {
            PORT: Number(port),
          },
        },
        (error, proc) => {
          pm2.disconnect();
        }
      );
  });
});
