//const propertyId = '328163801';
const {BetaAnalyticsDataClient} = require('@google-analytics/data');

const analyticsDataClient = new BetaAnalyticsDataClient({
    keyFilename: './key1.json'
});

async function runReport(propertyId) {

    try {
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [
                {
                    startDate: getStartDateString(7),
                    endDate: 'today',
                },
            ],
            metrics: [
                {
                    name: 'activeUsers',
                },
            ],
        });
    

        let activeUsers = response.rows[0].metricValues[0];
        return activeUsers;
    } catch(e) {
        return {
            "value": "1",
            "oneValue": "value"
        }
    }
    // console.log(activeUsers);
    //
    // // response.rows.forEach(row => {
    // //     console.log(row.dimensionValues[0], row.metricValues[0]);
    // // });
}

function getStartDateString(daysToSubtract) {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - daysToSubtract);

    let formattedDate = currentDate.toISOString().split('T')[0];
    return formattedDate;
}


module.exports = {
    runReport
}
