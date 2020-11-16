const puppeteer = require('puppeteer');
const PNG = require('pngjs');
const pixelmatch = require('pixelmatch');
const fs = require('fs');
// Instructions:
// run: node ui-diff.js <project_name> <live_url> <test_url> <width> <height>
// takes screenshots of both urls, and stores them in the results directory

//startup puppeteer
(async () => {
    let project_name = process.argv[2];
    let a = process.argv[3];
    let b = process.argv[4];
    let viewport_width = process.argv[5] || 1920;
    let viewport_height = process.argv[6] || 1080;

    if (!fs.existsSync(`./results/${project_name}`)){
        fs.mkdirSync(`./results/${project_name}`);
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: viewport_width,
        height: viewport_height,
        deviceScaleFactor: 1,
    })
    await page.goto(a);
    await page.screenshot({path: `./results/${project_name}/a.png`});
    await page.goto(b);
    await page.screenshot({path: `./results/${project_name}/b.png`});

    const imageA = PNG.sync.read(fs.readFileSync(`./results/${project_name}/a.png`))
    const imageB = PNG.sync.read(fs.readFileSync(`./results/${project_name}/b.png`))
    const diff = new PNG({viewport_width, viewport_height});

    pixelmatch(imageA.data, imageB.data, diff.data, viewport_width, viewport_height, {threshold: 0.1});

    fs.writeFileSync(`./results/${project_name}/diff.png`, PNG.sync.write(diff));

})();