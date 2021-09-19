import React from "react";
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css';
import JqxGrid, { jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';

export default class HomeFormGrid extends React.PureComponent {

    constructor(props) {
        super(props);
        const source = {
            // localdata: [
            //     {
            //         "fname": "Shahab",
            //         "lname": "Ali",
            //         "email": "shahabali@gmail.com",
            //         "phone": "03072910067",
            //         "add": "Nort Karachi",
            //     },
            //     {
            //         "fname": "Shahroz",
            //         "lname": "Riaz",
            //         "email": "shahroz@gmail.com",
            //         "phone": "03001234561",
            //         "add": "Malir",
            //     },
            //     {
            //         "fname": "Najam",
            //         "lname": "Us-Saqib",
            //         "email": "Najam@gmail.com",
            //         "phone": "090078601",
            //         "add": "Johar",
            //     },
            //     {
            //         "fname": "Faizan ",
            //         "lname": "Khan",
            //         "email": "Faizan@gmail.com",
            //         "phone": "03329876543",
            //         "add": "Qaidabad",
            //     },
            // ],
            localdata : this.props.data,
            datatype: "json",
            datafields: [
                { name: "fname", type: "string", },
                { name: "lname", type: "string" },
                { name: "email", type: "string" },
                { name: "phone", type: "string" },
                { name: "add", type: "string" },
            ],
        };

        this.state = {
            columns: [
                { text: "First Name", datafield: "fname", width: "20%", },
                { text: "Last Name", datafield: "lname", width: "20%", },
                { text: "Email", datafield: "email", width: "20%", },
                { text: "Phone", datafield: "phone", width: "20%", },
                { text: "Address", datafield: "add", width: "20%", },

            ],
            source: new jqx.dataAdapter(source)
        }
        this.onRowclick = this.onRowclick.bind(this);
        this.onBindingComplete = this.onBindingComplete.bind(this);
        this.myGrid = React.createRef(JqxGrid);
    }

    // componentDidUpdate(prevState) {
    //     if (prevState.data !== this.props.data) {
    //       const source = {
    //         localdata: this.props.data,
    //         datatype: "json",
    //       };
    //       this.setState({ source: new jqx.dataAdapter(source) });
    //     }
    //   }

    onRowclick(event) {
        const row = event.args.row.bounddata        
        this.props.setsformData(row)
    }
    onBindingComplete(event) {
        debugger;
        if (event !== null && event !== undefined) {
            this.myGrid.current.selectrow(0)
        }
    }
    render() {
        return (
            <>
                <JqxGrid
                    ref={this.myGrid}
                    source={this.state.source}
                    columns={this.state.columns}
                    onRowclick={this.onRowclick}
                    height={250}
                    width={"100%"}
                    // enabletooltips={true}
                    columnsheight={25}
                    rowsheight={25}
                    columnsreorder={true}
                    // autoloadstate={true} 
                    // autosavestate={true}
                    autoheight={true}
                    columnsresize={true}
                    // selectionmode={'multiplerowsextended'}
                    filterable={true}
                    // showfilterrow={true}
                    onBindingcomplete={this.onBindingComplete}
                />
            </>
        );
    }
}