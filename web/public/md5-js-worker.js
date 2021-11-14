importScripts("//unpkg.com/js-md5@0.7.3");

const timeStart = Date.now();

for (let i = 0; i < 1_000_000; i++) {
  md5(i.toString());
}

const duration = Date.now() - timeStart;

postMessage(duration);
