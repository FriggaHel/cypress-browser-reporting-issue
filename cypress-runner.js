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

function startFfmpeg() {
  const ffmpeg = spawn('ffmpeg', ['-f', 'gdigrab', '-framerate', '30', '-i', 'desktop', '-o', 'recording.mp4']);
  ffmpeg.stdout.on('data', function (data) {
    process.stdout.write(data.toString());
  })
  ffmpeg.stderr.on('data', function (data) {
    process.stderr.write(data.toString());
  })
  return ffmpeg.pid();
}

function stopFfmpeg(pid) {
  process.kill(pid, 'SIGINT');
}

async function main() {
  const pid = startFfmpeg();

  await wait (5 * 1000);
  const first = await Promise.race([
    wait(3 * 60 * 1000),
    runCypress('npm', ['run', 'cypress']),
  ]);
  stopFfmpeg(pid);
  await wait (5 * 1000);

  console.log(`Result: ${first}`);
  process.exit(0);
}


(function () {
  main();
})();