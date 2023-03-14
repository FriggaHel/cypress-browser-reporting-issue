const { spawn } = require('child_process');

function runCypress(cmd, args) {
  return new Promise(function (resolve) {
    const p = spawn(cmd, args);
    p.on('close', function (exitCode) {
      resolve(`exitCode: ${exitCode}`);
    });
    p.stdout.on('data', function (data) {
      process.stdout.write(data.toString());
    })
    p.stderr.on('data', function (data) {
      process.stderr.write(data.toString());
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
    wait(3 * 60 * 1000),
    runCypress('cypress', ['run', '--headed', '-b', 'webkit']),
  ]);

  console.log(`Result: ${first}`);
  process.exit(0);
}


(function () {
  main();
})();