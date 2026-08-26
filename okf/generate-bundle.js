const fs = require('fs');
const path = require('path');

const contentPath = path.join(__dirname, '..', 'js', 'content.js');
const content = fs.readFileSync(contentPath, 'utf8');
const match = content.match(/const QUICK_BYTES = ({[\s\S]*?});/);
if (!match) {
  console.error('Could not extract QUICK_BYTES');
  process.exit(1);
}

const QUICK_BYTES = eval('(' + match[1] + ')');

// Add OKF metadata to each item
function addOkfMeta(item, type, parentPath) {
  item._okf = {
    type: type,
    path: parentPath + '/' + item.id,
    timestamp: new Date().toISOString()
  };
  return item;
}

// Process phases
QUICK_BYTES.phases.forEach(phase => {
  addOkfMeta(phase, 'Phase', '/okf/ai-llms');
  phase.guides.forEach(guide => {
    addOkfMeta(guide, 'Guide', '/okf/ai-llms/' + guide.id);
    guide.sections.forEach(section => {
      addOkfMeta(section, 'Section', '/okf/ai-llms/' + guide.id + '/' + section.id);
    });
  });
});

const bundlePath = path.join(__dirname, 'bundle.json');
fs.writeFileSync(bundlePath, JSON.stringify(QUICK_BYTES, null, 2), 'utf8');
console.log('Generated:', bundlePath);
console.log('Total guides:', QUICK_BYTES.stats.guides);
