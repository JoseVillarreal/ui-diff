const puppeteer = require('puppeteer');
const PNG = require('pngjs');
const pixelmatch = require('pixelmatch');
const fs = require('fs');

async function screenshot(url, options) {
    console.log('screenshot options:', options);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport(options);
    await page.goto(url);
    console.log("writing file to ", options.saveLocation, options)
    let image = await page.screenshot({path: options.saveLocation});
    return image;
};

function imageDiff (imageASrc, imageBSrc, diffFilePath) {
    const imageA = imageASrc;
    const imageB = imageBSrc;
    const {width, height} = imageA;
    const diff = new PNG({width, height});

    pixelmatch(imageA, imageB, diff.data, width, height, {threshold: 0.1});

    fs.writeFileSync(diffFilePath, PNG.sync.write(diff));
};

module.exports = {
    screenshot: screenshot,
    imageDiff: imageDiff,
}