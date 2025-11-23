let huffmanTree = null;
let codeMap = {};

function calculateFrequency(text) {
    let freq = {};
    for (let char of text) {
        if (!freq[char]) freq[char] = 0;
        freq[char]++;
    }
    return freq;
}

class Node {
    constructor(char, freq, left = null, right = null) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

function buildHuffmanTree(freq) {
    let nodes = Object.entries(freq).map(([char, f]) => new Node(char, f));
    while (nodes.length > 1) {
        nodes.sort((a, b) => a.freq - b.freq);
        let left = nodes.shift();
        let right = nodes.shift();
        let merged = new Node(null, left.freq + right.freq, left, right);
        nodes.push(merged);
    }
    return nodes[0];
}

function generateCodes(node, code = "", map = {}) {
    if (!node) return;
    if (node.char) map[node.char] = code;
    generateCodes(node.left, code + "0", map);
    generateCodes(node.right, code + "1", map);
    return map;
}

function encode(text) {
    return text.split('').map(char => codeMap[char]).join('');
}

function decode(encodedText, node) {
    let decoded = "";
    let current = node;
    for (let bit of encodedText) {
        if (bit === "0") current = current.left;
        else current = current.right;
        if (current.char) {
            decoded += current.char;
            current = node;
        }
    }
    return decoded;
}

function encodeText() {
    const text = document.getElementById("inputText").value;
    if (!text) return;
    let freq = calculateFrequency(text);
    huffmanTree = buildHuffmanTree(freq);
    codeMap = generateCodes(huffmanTree);
    const encoded = encode(text);
    document.getElementById("encodedOutput").innerText = encoded;
    document.getElementById("decodedOutput").innerText = "";
}

function decodeText() {
    if (!huffmanTree) return;
    const encoded = document.getElementById("encodedOutput").innerText;
    const decoded = decode(encoded, huffmanTree);
    document.getElementById("decodedOutput").innerText = decoded;
}