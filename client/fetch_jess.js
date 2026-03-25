const fs = require('fs');
fetch('https://dev.to/api/articles?username=jess')
  .then(r => r.json())
  .then(data => {
    const article = data.find(a => a.title.includes('Stopped Me'));
    if(article) {
      fetch('https://dev.to/api/articles/'+article.id).then(r=>r.json()).then(d=>{
        fs.writeFileSync('dev_body.html', d.body_html || "");
        console.log("Done");
      });
    } else {
      console.log("Not found");
    }
  }).catch(e => console.log(e));
