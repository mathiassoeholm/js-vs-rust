importScripts("//unpkg.com/js-md5@0.7.3");

let i = 1;
while (true) {
  md5(i.toString());
  if (i % 1000000 == 0) {
    postMessage(i);
  }
  i++;
}
