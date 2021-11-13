// Source: https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/
// Original code by avanitrachhadiya2155
// Modified by mathiassoeholm
function huffmanEncode(text) {
  const frequencies = {};

  for (var i = 0; i < text.length; i++) {
    const prev = frequencies[text[i]] || 0;
    frequencies[text[i]] = prev + 1;
  }

  const queue = [];
  for (const char in frequencies) {
    const node = {
      char,
      frequency: frequencies[char],
      left: null,
      right: null,
    };

    queue.push(node);
  }

  queue.sort((a, b) => a.frequency - b.frequency);

  let root = null;
  while (queue.length > 1) {
    const left = queue.shift();
    const right = queue.shift();

    root = {
      char: null,
      frequency: left.frequency + right.frequency,
      left,
      right,
    };

    // Insert node at correct place
    queue.splice(
      queue.findIndex((a) => a.frequency > root.frequency),
      0,
      root
    );
  }

  const dict = {};

  const generateDict = (node, code) => {
    if (node.left === null && node.right === null && node.char !== null) {
      dict[node.char] = code;
      return;
    }

    generateDict(node.left, code + "0");
    generateDict(node.right, code + "1");
  };

  generateDict(root, "");

  const encodedText = text
    .split("")
    .map((char) => dict[char])
    .join("");

  console.log("text", text);
  console.log("dict", dict);
  console.log("encoded", encodedText);
}

onmessage = (e) => {
  huffmanEncode(e.data);
};
