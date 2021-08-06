const fs = require('fs')

function getImageBlock(dir) {
  const images = fs.readdirSync(`images/${dir}`);
  let result = ''

  images.forEach((image) => {
    const imagePage = `images/${dir}/${image}`
    const thumb = `thumbs/${dir}/${image}_thumb.jpg`

    if (!image.match(/.*\.(jpg|jpeg)/i)) return
    if (image.includes('_thumb')) return

    result += `
<div class="col">
  <a href="${imagePage}" target="_blank">
    <img src="${thumb}" class="img-fluid">
  </a>
</div>
    `
  })

  return result
}

function main() {
  let data = fs.readFileSync('index_tpl.html', 'utf-8')
  
  data = data.replace('<!-- lifestyle -->', getImageBlock('lifestyle'))
  data = data.replace('<!-- exterior -->', getImageBlock('exterior'))
  data = data.replace('<!-- interior -->', getImageBlock('interior'))
  data = data.replace('<!-- engine -->', getImageBlock('engine'))
  data = data.replace('<!-- under -->', getImageBlock('under'))

  fs.writeFileSync('index.html', data)
}

main()