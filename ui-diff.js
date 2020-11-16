const fs = require('fs');
const ui_tools = require('./ui-library.js');
// Instructions:
// run: node ui-diff.js <project_name> <live_url> <test_url> <width> <height>
// takes screenshots of both urls, and stores them in the results directory

(async () => {
    let project_name = process.argv[2];
    let a = process.argv[3];
    let b = process.argv[4];
    let options = {};
    options.width = process.argv[5] || 1920;
    options.height = process.argv[6] || 1080;
    options.deviceScaleFactor = 1;

    if (!fs.existsSync(`./results/${project_name}`)){
        fs.mkdirSync(`./results/${project_name}`);
    }

    console.log(ui_tools);
    imageA = await ui_tools.screenshot(a, { saveLocation: `./results/${project_name}/a.png`, ...options });
    imageB = await ui_tools.screenshot(b, { saveLocation: `./results/${project_name}/b.png`, ...options });
    console.log('image data:', imageA, imageB);
    ui_tools.imageDiff(imageA, imageB, `./results/${project_name}/diff.png`);

})();