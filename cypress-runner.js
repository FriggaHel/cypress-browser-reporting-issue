const { exec } = require('child_process');

function runCypress(cmd) {
  return new Promise(function (resolve) {
    const p = exec(cmd);
    p.on('exit', function (exitCode) {
      resolve(`exitCode: ${exitCode}`);
    });
    p.on('stdout', function (data) {
      console.log(data);
    })
    p.on('stderr', function (data) {
      console.log(data);
    })
  });
}

function wait(duration) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve('timeout');
    }, duration);
  });
}

async function main() {
  const first = await Promise.race([
    wait(5 * 60 * 1000),
    runCypress('npx cypress run --headed -b webkit'),
  ]);

  console.log(`Result: ${first}`);
  process.exit(0);
}


(function () {
  main();
})();