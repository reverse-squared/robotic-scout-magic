import React from 'react';
import { hot } from 'react-hot-loader/root';
import ChartistGraph from 'react-chartist';

class Bar extends React.Component {
    render() {
        var data = {
            labels: [],
            series: []
        };
       
        var type = 'Bar';

        var itemsToTrack = [];

        // Get the data to display.
        var formComponentsExcludingHeaders = this.props.data.items.filter(x => x.type !== 'header');
        var headers = formComponentsExcludingHeaders.map(x => x.exportLabel || x.label);

        formComponentsExcludingHeaders.map((item, i) => {
            const type = formComponentsExcludingHeaders[i].type;
            
            if(type === 'counter' || type === 'counter' || type === 'number') {
                // FIXME: This disallows the display of the team number, since it is high sometimes!
                if(i !== 0) {
                    data.labels.push(headers[i]);
                    itemsToTrack.push(i);
                }
            }
        });

        // Add data to data object.
        this.props.submissions.map((submission, i) => {
            // Add a series array if it doesn't exist.
            if(data.series[i] === undefined) {
                data.series.push([]);
            }

            submission.map((label, j) => {
                if(itemsToTrack.includes(j)) {
                    data.series[i].push(Number(label));
                }
            });
        });

        // Display!
        return (
            <ChartistGraph data={data} type={type} />
        );
    }
}

export default hot(Bar);
