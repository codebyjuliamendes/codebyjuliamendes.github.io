// Gera assets/og.png (1200x630) com Playwright: node scripts/og.cjs
const { chromium } = require('playwright');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

(async () => {
  const mark = readFileSync(join(__dirname, '../assets/favicon.svg'), 'utf8');
  const html = `<html><head><link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@500;700&family=JetBrains+Mono:wght@500&display=block" rel="stylesheet">
  <style>
    body{margin:0;width:1200px;height:630px;background:#f7f6f2;font-family:'Instrument Sans';color:#14161a;display:flex;flex-direction:column;justify-content:space-between;padding:72px 80px;box-sizing:border-box;
      background-image:radial-gradient(circle at 92% 8%,#e8e8fb 0,transparent 42%),radial-gradient(circle at 100% 100%,#f6dccf 0,transparent 38%)}
    .top{display:flex;align-items:center;gap:18px;font-size:30px;font-weight:700}.top svg{width:56px;height:56px}
    .eyebrow{font:500 22px 'JetBrains Mono';letter-spacing:.08em;text-transform:uppercase;color:#3c40b8;display:flex;align-items:center;gap:14px}
    .eyebrow:before{content:'';width:40px;height:3px;background:#d9643a}
    h1{margin:18px 0 0;font-size:68px;line-height:1.05;letter-spacing:-.04em;max-width:950px}
    .stack{font:500 22px 'JetBrains Mono';color:#6b707a}
  </style></head><body>
  <div class="top">${mark}Júlia Mendes</div>
  <div><div class="eyebrow">Desenvolvedora Full Stack</div><h1>Produtos web completos, do banco de dados à interface.</h1></div>
  <div class="stack">TypeScript · Python · Go · Rust · Java · Kotlin</div></body></html>`;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(__dirname, '../assets/og.png') });
  await browser.close();
})();
