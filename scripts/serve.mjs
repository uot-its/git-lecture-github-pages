import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = 'dist';
const port = Number(process.env.PORT ?? 4173);
const types = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8']
]);

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://localhost:${port}`);
  const pathname = normalize(url.pathname === '/' ? '/index.html' : url.pathname);
  if (pathname.includes('..')) {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }
  const path = join(root, pathname);
  try {
    const data = await readFile(path);
    res.writeHead(200, { 'Content-Type': types.get(extname(path)) ?? 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(port, () => {
  console.log(`Preview: http://localhost:${port}`);
});
