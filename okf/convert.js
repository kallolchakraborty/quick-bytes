const fs = require('fs');
const path = require('path');

// Load content.js by executing it to get QUICK_BYTES
const contentPath = path.join(__dirname, '..', 'js', 'content.js');
const content = fs.readFileSync(contentPath, 'utf8');

// Extract QUICK_BYTES object using eval (safe since it's our own file)
const match = content.match(/const QUICK_BYTES = ({[\s\S]*?});/);
if (!match) {
  console.error('Could not extract QUICK_BYTES');
  process.exit(1);
}

// Evaluate to get the object
const QUICK_BYTES = eval('(' + match[1] + ')');

const okfRoot = path.join(__dirname, 'ai-llms');

function sanitizeId(id) {
  return id.replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('Created:', path.relative(__dirname, filePath));
}

function createMarkdown(type, title, description, tags, contentBody, extra = {}) {
  const timestamp = new Date().toISOString();
  const frontmatter = `---\ntype: ${type}\ntitle: ${title}\ndescription: ${description || ''}\ntags: [${tags}]\ntimestamp: ${timestamp}\n${Object.entries(extra).map(([k, v]) => `${k}: ${v}`).join('\n')}---\n\n`;
  return frontmatter + contentBody;
}

// Process each phase
QUICK_BYTES.phases.forEach(phase => {
  const phaseDir = path.join(okfRoot, sanitizeId(phase.id));
  
  // Phase index
  const phaseIndex = createMarkdown(
    'Phase',
    phase.title,
    phase.description,
    [phase.id, phase.level],
    `# ${phase.title}\n\n**Level:** ${phase.level}\n\n${phase.description}\n\n## Guides\n\n`,
    { phase: phase.id, level: phase.level }
  );
  writeFile(path.join(phaseDir, 'index.md'), phaseIndex);

  // Process each guide
  phase.guides.forEach(guide => {
    const guideDir = path.join(phaseDir, sanitizeId(guide.id));
    const guideTags = [guide.id, phase.id];
    
    // Guide index
    const guideIndex = createMarkdown(
      'Guide',
      guide.title,
      guide.description || '',
      guideTags,
      `# ${guide.title}\n\n${guide.description || ''}\n\n## Sections\n\n`,
      { guide: guide.id, phase: phase.id, icon: guide.icon }
    );
    writeFile(path.join(guideDir, 'index.md'), guideIndex);

    // Process each section
    guide.sections.forEach(section => {
      const sectionFile = path.join(guideDir, sanitizeId(section.id) + '.md');
      const sectionTags = [section.id, guide.id, phase.id];
      let contentBody = `# ${section.title}\n\n`;
      
      if (section.icon) {
        contentBody += `**Icon:** ${section.icon}\n\n`;
      }
      
      // Add content
      if (section.content) {
        contentBody += section.content + '\n\n';
      }
      
      // Add pipeline data as JSON in a code block
      if (section.pipeline) {
        contentBody += `## Pipeline Diagram\n\n\`\`\`json\n${JSON.stringify(section.pipeline, null, 2)}\n\`\`\`\n\n`;
      }
      
      // Add KV data
      if (section.kv) {
        contentBody += `## KV Diagram\n\n\`\`\`json\n${JSON.stringify(section.kv, null, 2)}\n\`\`\`\n\n`;
      }
      
      // Add tree data
      if (section.tree) {
        contentBody += `## Tree Data\n\n\`\`\`json\n${JSON.stringify(section.tree, null, 2)}\n\`\`\`\n\n`;
      }
      
      const md = createMarkdown(
        'Section',
        section.title,
        guide.title + ' - ' + section.title,
        sectionTags,
        contentBody,
        { 
          section: section.id, 
          guide: guide.id, 
          phase: phase.id,
          icon: section.icon 
        }
      );
      
      writeFile(sectionFile, md);
    });
  });
});

console.log('\nOKF bundle generated successfully!');
