import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Loader } from './Loader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class ViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formName: null,
            submissions: null,
        };
    }
    
    fetchData() {
        this.setState({
            formName: null,
            submissions: null,
        });
        fetch('/submission-data/' + this.props.formID).then(r => r.json()).then(submissions => {
            this.setState({
                formName: this.props.formID,
                submissions,
            });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.formID !== this.props.formID && this.state.formName !== null) {
            this.fetchData();
        }
    }

    componentDidMount() {
        this.fetchData();        
    }

    render() { 
        const form = this.props.formData.find(x => x.id === this.props.formID);
        const submissions = this.state.submissions;

        if (!form) {
            return <div>
                <h1>404 Not Found!</h1>
                <p>
                    Cannot find the form with id "<span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{this.props.formID}</span>", try checking the forms folder.
                </p>
            </div>;
        }

        if(submissions) {
            const headers = form.items.filter(x => x.type !== 'header').map(x => x.label);
            return <div>
                <h1>{form.name}</h1>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    headers.map(label => <TableCell align="right">{label}</TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {
                                submissions.map(submission => <tr>
                                    {
                                        submission.map(label => <TableCell align="right">{label}</TableCell>)
                                    }
                                </tr>)
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </div>;
        } else {
            return <div>
                <p>No data found! Go out and get some data!</p>
            </div>;
        }
    }
}
 
export default hot(ViewPage);