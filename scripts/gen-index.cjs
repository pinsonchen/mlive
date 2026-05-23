#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TROUBLESHOOTING_DIR = path.join(ROOT, 'docs', 'troubleshooting');
const FAQ_DOC = path.join(ROOT, '支付宝直播操作文档.md');
const GUIDE_README = path.join(ROOT, 'guide', 'README.md');
const OUTPUT = path.join(ROOT, 'docs', 'INDEX.md');

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const yaml = match[1];
  const meta = {};
  let currentKey = null;
  for (const line of yaml.split('\n')) {
    const keyMatch = line.match(/^(\w+):\s*(.*)/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      const val = keyMatch[2].trim();
      if (val === '[]') {
        meta[currentKey] = [];
      } else if (val === '' || val === undefined) {
        meta[currentKey] = [];
      } else {
        meta[currentKey] = [val];
      }
    } else if (currentKey && line.match(/^\s+-\s+/)) {
      const item = line.replace(/^\s+-\s+/, '').replace(/^["']|["']$/g, '');
      meta[currentKey].push(item);
    }
  }
  return meta;
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)/m);
  return match ? match[1] : '';
}

function loadTroubleshootingScenarios() {
  const files = fs.readdirSync(TROUBLESHOOTING_DIR)
    .filter(f => /^\d{2}-.+\.md$/.test(f))
    .sort();
  const scenarios = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(TROUBLESHOOTING_DIR, file), 'utf8');
    const meta = parseFrontmatter(content);
    const title = extractTitle(content);
    const relPath = `troubleshooting/${file}`;
    scenarios.push({ file, title, relPath, meta });
  }
  return scenarios;
}

function extractFaqFromDoc() {
  const content = fs.readFileSync(FAQ_DOC, 'utf8');
  const faqs = [];
  const regex = /\*\*Q(\d+)：(.+?)\*\*/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    faqs.push({
      id: `Q${match[1]}`,
      question: match[2],
      link: `../支付宝直播操作文档.md`,
      anchor: null
    });
  }
  return faqs;
}

function extractFaqFromGuide() {
  const content = fs.readFileSync(GUIDE_README, 'utf8');
  const faqs = [];
  const regex = /\*\*Q:\s*(.+?)\*\*/g;
  let match;
  let idx = 1;
  while ((match = regex.exec(content)) !== null) {
    faqs.push({
      id: `Guide-Q${idx}`,
      question: match[1],
      link: `../guide/README.md`
    });
    idx++;
  }
  return faqs;
}

function categorizeFaqByPlatform(faq) {
  const q = faq.question;
  if (/OBS|推流|RTMP|码率|编码/.test(q)) return ['OBS/推流'];
  if (/支付宝|商家/.test(q)) return ['支付宝'];
  if (/虚拟摄像头/.test(q)) return ['OBS/推流'];
  if (/平台/.test(q)) return ['通用'];
  return ['通用'];
}

function categorizeFaqBySymptom(faq) {
  const q = faq.question;
  if (/失败|错误/.test(q)) return ['推流失败'];
  if (/卡顿/.test(q)) return ['画面卡顿'];
  if (/声音|音量/.test(q)) return ['音频问题'];
  if (/流量/.test(q)) return ['流量运营'];
  if (/账号|营业执照/.test(q)) return ['账号问题'];
  return [];
}

function generateIndex() {
  const scenarios = loadTroubleshootingScenarios();
  const docFaqs = extractFaqFromDoc();
  const guideFaqs = extractFaqFromGuide();

  const symptomIndex = new Map();
  const errorCodeIndex = new Map();
  const platformIndex = new Map();

  for (const s of scenarios) {
    if (!s.meta) continue;
    const link = `[${s.title}](${s.relPath})`;
    for (const sym of (s.meta.symptoms || [])) {
      if (!symptomIndex.has(sym)) symptomIndex.set(sym, []);
      symptomIndex.get(sym).push(link);
    }
    for (const code of (s.meta.error_codes || [])) {
      if (!errorCodeIndex.has(code)) errorCodeIndex.set(code, []);
      errorCodeIndex.get(code).push(link);
    }
    for (const plat of (s.meta.platforms || [])) {
      if (!platformIndex.has(plat)) platformIndex.set(plat, []);
      platformIndex.get(plat).push(link);
    }
  }

  for (const faq of docFaqs) {
    const link = `[${faq.id}：${faq.question}](${faq.link})`;
    for (const sym of categorizeFaqBySymptom(faq)) {
      if (!symptomIndex.has(sym)) symptomIndex.set(sym, []);
      symptomIndex.get(sym).push(link);
    }
    for (const plat of categorizeFaqByPlatform(faq)) {
      if (!platformIndex.has(plat)) platformIndex.set(plat, []);
      platformIndex.get(plat).push(link);
    }
  }

  for (const faq of guideFaqs) {
    const link = `[${faq.id}：${faq.question}](${faq.link})`;
    for (const plat of categorizeFaqByPlatform(faq)) {
      if (!platformIndex.has(plat)) platformIndex.set(plat, []);
      platformIndex.get(plat).push(link);
    }
  }

  let md = '# FAQ 与故障手册检索索引\n\n';
  md += '> 本文件由 `scripts/gen-index.js` 自动生成，请勿手动编辑。\n\n';

  md += '## 按症状索引\n\n';
  md += '| 症状 / 现象 | 相关文档 |\n';
  md += '|---|---|\n';
  for (const [sym, links] of symptomIndex) {
    md += `| ${sym} | ${links.join('、')} |\n`;
  }

  md += '\n## 按错误码索引\n\n';
  md += '| 错误码 / 错误信息 | 相关文档 |\n';
  md += '|---|---|\n';
  for (const [code, links] of errorCodeIndex) {
    md += `| \`${code}\` | ${links.join('、')} |\n`;
  }

  md += '\n## 按平台索引\n\n';
  md += '| 平台 | 相关文档 |\n';
  md += '|---|---|\n';
  for (const [plat, links] of platformIndex) {
    md += `| ${plat} | ${links.join('、')} |\n`;
  }

  md += '\n---\n\n';
  md += '## FAQ 快速导航\n\n';
  md += '### 支付宝直播操作文档 FAQ\n\n';
  for (const faq of docFaqs) {
    md += `- [${faq.id}：${faq.question}](${faq.link})\n`;
  }
  md += '\n### 多平台同步开播指南 FAQ\n\n';
  for (const faq of guideFaqs) {
    md += `- [${faq.id}：${faq.question}](${faq.link})\n`;
  }

  fs.writeFileSync(OUTPUT, md, 'utf8');
  console.log(`Generated ${OUTPUT}`);
  console.log(`  Scenarios indexed: ${scenarios.length}`);
  console.log(`  FAQ entries (支付宝文档): ${docFaqs.length}`);
  console.log(`  FAQ entries (指南): ${guideFaqs.length}`);
  console.log(`  Symptom entries: ${symptomIndex.size}`);
  console.log(`  Error code entries: ${errorCodeIndex.size}`);
  console.log(`  Platform entries: ${platformIndex.size}`);
}

generateIndex();
