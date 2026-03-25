import fs from 'fs';
const r1 = await fetch('https://dev.to/api/articles?username=jess');
const d1 = await r1.json();
const id = d1.find(a => a.title.includes('Stopped Me')).id;
const r2 = await fetch('https://dev.to/api/articles/' + id);
const d2 = await r2.json();
fs.writeFileSync('/Users/kollicharanadithya/Desktop/Ideapulse/client/jess_body.html', d2.body_html || "");
console.log("Written!");
