const puppeteer = require('puppeteer');
const PNG = require('pngjs');
const pixelmatch = require('pixelmatch');

const screenshot = (url, options) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: options.viewport_width,
        height: options.viewport_height,
        deviceScaleFactor: 1,
    })
    await page.goto(url);
    await page.screenshot({path: options.saveLocation});
};

const imageDiff = (imageASrc, imageBSrc, diffFilePath, options) => {
    const imageA = PNG.sync.read(fs.readFileSync(imageASrc))
    const imageB = PNG.sync.read(fs.readFileSync(imageBSrc))
    const diff = new PNG({options.viewport_width, options.viewport_height});

    pixelmatch(imageA.data, imageB.data, diff.data, viewport_width, viewport_height, {threshold: 0.1});

    fs.writeFileSync(diffFilePath, PNG.sync.write(diff));
}

return {
    screenshot: screenshot,
    imageDiff: imageDiff,
}