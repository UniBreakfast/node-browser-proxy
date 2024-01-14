const { readFile } = require('fs/promises');

require('http').createServer(handleRequest).listen(1234);

function handleRequest(req, res) {
  if (req.url.startsWith('/api/')) {
    handleAPI(req, res);
  } else {
    serveFile(req, res);
  }
}

async function handleAPI(req, res) {
  const x = { y: { z: 123 }, yy(arg1, arg2) { return { z: arg1.repeat(arg2) } } };

  const code = await getBody(req);
  const result = await eval(code);

  res.end(JSON.stringify(result || null));
}

async function getBody(req) {
  let body = '';

  for await (const chunk of req) body += chunk;

  return body;
}

async function serveFile(req, res) {
  try {
    const path = 'public/' + (req.url.slice(1) || 'index.html');
    const fileContent = await readFile(path);
    
    res.end(fileContent);
  } catch {
    res.writeHead(404).end(`File ${req.url} not found!`);
  }
}
