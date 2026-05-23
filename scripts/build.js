#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { minify: minifyHTML } = require('html-minifier-terser');
const { minify: minifyJS } = require('terser');
const CleanCSS = require('clean-css');
const zlib = require('zlib');

const SRC_DIR = path.resolve(__dirname, '..', 'guide');
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

const CRITICAL_CSS_MARKERS = [
  ':root',
  'body',
  '.container',
  '.header',
  '.subtitle',
  '.steps-indicator',
  '.step-item',
  '.step-number',
  '.step-label',
  '.step-section',
  '.step-desc',
  '.platform-grid',
  '.platform-card',
  '@keyframes fadeIn',
];

function extractCriticalCSS(cssContent) {
  const rules = [];
  let remaining = [];
  const lines = cssContent.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const isCritical = CRITICAL_CSS_MARKERS.some(marker => {
      if (marker.startsWith('@keyframes')) {
        return line.includes(marker.replace('@keyframes ', ''));
      }
      if (marker === ':root' || marker === 'body') {
        return line.trimStart().startsWith(marker);
      }
      return line.includes(marker);
    });

    if (line.trim().startsWith('* {') || line.trim() === '* {') {
      let block = collectBlock(lines, i);
      rules.push(block.text);
      i = block.endIndex + 1;
      continue;
    }

    if (isCritical) {
      let block = collectBlock(lines, i);
      rules.push(block.text);
      i = block.endIndex + 1;
    } else {
      remaining.push(line);
      i++;
    }
  }

  return {
    critical: rules.join('\n'),
    remaining: remaining.join('\n'),
  };
}

function collectBlock(lines, startIndex) {
  let depth = 0;
  let started = false;
  let result = [];

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    result.push(line);

    for (const ch of line) {
      if (ch === '{') { depth++; started = true; }
      if (ch === '}') { depth--; }
    }

    if (started && depth <= 0) {
      return { text: result.join('\n'), endIndex: i };
    }
  }

  return { text: result.join('\n'), endIndex: lines.length - 1 };
}

function gzipSync(buffer) {
  return zlib.gzipSync(buffer, { level: 9 });
}

function brotliSync(buffer) {
  return zlib.brotliCompressSync(buffer, {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
    },
  });
}

function writeCompressed(filePath, content) {
  const buf = Buffer.from(content, 'utf-8');
  fs.writeFileSync(filePath, buf);
  fs.writeFileSync(filePath + '.gz', gzipSync(buf));
  fs.writeFileSync(filePath + '.br', brotliSync(buf));
  return buf.length;
}

async function build() {
  console.log('Building mlive guide...');

  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true });
  }
  fs.mkdirSync(DIST_DIR, { recursive: true });

  const cssContent = fs.readFileSync(path.join(SRC_DIR, 'styles.css'), 'utf-8');
  const jsContent = fs.readFileSync(path.join(SRC_DIR, 'script.js'), 'utf-8');
  let htmlContent = fs.readFileSync(path.join(SRC_DIR, 'index.html'), 'utf-8');

  const { critical, remaining } = extractCriticalCSS(cssContent);

  const cleanCSS = new CleanCSS({ level: 2 });
  const criticalMinified = cleanCSS.minify(critical).styles;
  const remainingMinified = cleanCSS.minify(remaining).styles;

  const jsMinified = (await minifyJS(jsContent, {
    compress: { drop_console: false, passes: 2 },
    mangle: true,
  })).code;

  htmlContent = htmlContent.replace(
    '<link rel="stylesheet" href="styles.css">',
    `<style>${criticalMinified}</style>\n    <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">\n    <noscript><link rel="stylesheet" href="styles.css"></noscript>`
  );

  htmlContent = htmlContent.replace(
    '<script src="script.js"></script>',
    '<script src="script.js" defer></script>'
  );

  const htmlMinified = await minifyHTML(htmlContent, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    minifyCSS: true,
    minifyJS: true,
  });

  const sizes = {};
  sizes['index.html'] = writeCompressed(path.join(DIST_DIR, 'index.html'), htmlMinified);
  sizes['styles.css'] = writeCompressed(path.join(DIST_DIR, 'styles.css'), remainingMinified);
  sizes['script.js'] = writeCompressed(path.join(DIST_DIR, 'script.js'), jsMinified);

  console.log('\nBuild complete! Output in dist/');
  console.log('─'.repeat(50));

  const originalCSS = Buffer.byteLength(cssContent);
  const originalJS = Buffer.byteLength(jsContent);
  const originalHTML = Buffer.byteLength(fs.readFileSync(path.join(SRC_DIR, 'index.html'), 'utf-8'));
  const totalOriginal = originalCSS + originalJS + originalHTML;
  const totalMinified = sizes['index.html'] + sizes['styles.css'] + sizes['script.js'];

  console.log(`\n  File            Original    Minified    Savings`);
  console.log(`  index.html      ${fmt(originalHTML)}     ${fmt(sizes['index.html'])}     ${pct(originalHTML, sizes['index.html'])}`);
  console.log(`  styles.css      ${fmt(originalCSS)}     ${fmt(sizes['styles.css'])}     ${pct(originalCSS, sizes['styles.css'])}`);
  console.log(`  script.js       ${fmt(originalJS)}     ${fmt(sizes['script.js'])}     ${pct(originalJS, sizes['script.js'])}`);
  console.log(`  ─────────────────────────────────────────────`);
  console.log(`  Total           ${fmt(totalOriginal)}     ${fmt(totalMinified)}     ${pct(totalOriginal, totalMinified)}`);

  const gzHTML = fs.statSync(path.join(DIST_DIR, 'index.html.gz')).size;
  const gzCSS = fs.statSync(path.join(DIST_DIR, 'styles.css.gz')).size;
  const gzJS = fs.statSync(path.join(DIST_DIR, 'script.js.gz')).size;
  const brHTML = fs.statSync(path.join(DIST_DIR, 'index.html.br')).size;
  const brCSS = fs.statSync(path.join(DIST_DIR, 'styles.css.br')).size;
  const brJS = fs.statSync(path.join(DIST_DIR, 'script.js.br')).size;

  console.log(`\n  Compressed sizes (transfer size over wire):`);
  console.log(`  File            Gzip        Brotli`);
  console.log(`  index.html      ${fmt(gzHTML)}     ${fmt(brHTML)}`);
  console.log(`  styles.css      ${fmt(gzCSS)}     ${fmt(brCSS)}`);
  console.log(`  script.js       ${fmt(gzJS)}     ${fmt(brJS)}`);
  console.log(`  ─────────────────────────────────────────────`);
  console.log(`  Total           ${fmt(gzHTML + gzCSS + gzJS)}     ${fmt(brHTML + brCSS + brJS)}`);
  console.log(`\n  Critical CSS inlined: ${fmt(Buffer.byteLength(criticalMinified))}`);
  console.log(`  First paint requires: ${fmt(gzHTML)} (gzip) / ${fmt(brHTML)} (brotli)`);
}

function fmt(bytes) {
  if (bytes < 1024) return `${bytes} B`.padStart(8);
  return `${(bytes / 1024).toFixed(1)} KB`.padStart(8);
}

function pct(original, minified) {
  return `-${Math.round((1 - minified / original) * 100)}%`;
}

build().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
