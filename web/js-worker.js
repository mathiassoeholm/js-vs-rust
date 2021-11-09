importScripts("./node_modules/js-md5/build/md5.min.js");

let i = 1;
while (true) {
  md5(i.toString());
  if (i % 1000000 == 0) {
    postMessage(i);
  }
  i++;
}
