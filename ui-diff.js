const fs = require('fs');
const ui_tools = require('./ui-diff.js');
// Instructions:
// run: node ui-diff.js <project_name> <live_url> <test_url> <width> <height>
// takes screenshots of both urls, and stores them in the results directory

(async () => {
    let project_name = process.argv[2];
    let a = process.argv[3];
    let b = process.argv[4];
    let viewport_width = process.argv[5] || 1920;
    let viewport_height = process.argv[6] || 1080;

    if (!fs.existsSync(`./results/${project_name}`)){
        fs.mkdirSync(`./results/${project_name}`);
    }

    ui_tools.screenshot(a, `./results/${project_name}/a.png`);
    ui_tools.screenshot(b, `./results/${project_name}/b.png`);
    
    ui_tools.imageDiff(`./results/${project_name}/a.png`, `./results/${project_name}/b.png`, `./results/${project_name}/diff.png`);

})();