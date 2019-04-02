const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: 'reports',
    reportPath: 'reports/html-reports',
    reportName: 'You can adjust this report name',
    customMetadata: false,
    displayDuration: true,
    durationInMS: true
});
