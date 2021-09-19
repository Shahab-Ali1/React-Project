import React, { useState, useRef, useEffect } from 'react';
import HomeFormGrid from '../JqxGrid/HomeGrid'
import { jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select
} from '../ShareModule/ShareModule'

const INITIAL_STATE = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    add: ""
}

function HomeComponent() {
    const dropdown = [
        { value: "0", text: "Please Select Column Field" },
        { value: "fname", text: "First Name" },
        { value: "lname", text: "Last Name" },
        { value: "email", text: "Email" },
        { value: "phone", text: "Phone" },
        { value: "add", text: "Address" },
    ]

    const localdata =  [
        {
            "fname": "Shahab",
            "lname": "Ali",
            "email": "shahabali@gmail.com",
            "phone": "03072910067",
            "add": "Nort Karachi",
        },
        {
            "fname": "Shahroz",
            "lname": "Riaz",
            "email": "shahroz@gmail.com",
            "phone": "03001234561",
            "add": "Malir",
        },
        {
            "fname": "Najam",
            "lname": "Us-Saqib",
            "email": "Najam@gmail.com",
            "phone": "090078601",
            "add": "Johar",
        },
        {
            "fname": "Faizan ",
            "lname": "Khan",
            "email": "Faizan@gmail.com",
            "phone": "03329876543",
            "add": "Qaidabad",
        },
    ];
    const GridRef = useRef(null);
    const [formData, setsformData] = useState({ ...INITIAL_STATE })
    const [DataField, setDataField] = useState();

    const filter = (e) => {
        // debugger;
        // var Index = GridRef.current.myGrid.current.getselectedrowindex();
        let filtergroup = new jqx.filter();
        let filter_or_operator = 1;
        let filtervalue = e.target.value;
        let filtercondition = 'contains';
        let filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
        filtergroup.addfilter(filter_or_operator, filter);
        GridRef.current.myGrid.current.addfilter(DataField,filtergroup);
        GridRef.current.myGrid.current.applyfilters();
    }

    const clickClearButton = () => {
        setsformData({ ...INITIAL_STATE });
    }

    const clickSaveButton = () => {

    }
    useEffect(() => {
        GridRef.current.myGrid.current.selectrow(0)
        setsformData(GridRef.current.myGrid.current.getrowdata(0))
    }, [])
    return (
        <>
            <h1>Homee Form</h1>
            <div className="row">
                <div className="col-lg-6">
                    <div className="row mt-3">
                        <FormControl variant="outlined" size="small" >
                            <InputLabel htmlFor="outlined-age-native-simple">DataField</InputLabel>
                            <Select
                                onChange={(event) => setDataField(event.target.value)}
                                value={DataField}
                                native
                                label="DataField"
                                inputProps={{
                                    name: 'DataField',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                {
                                    dropdown.map((Val, index) => {
                                        return (<option key={index} value={Val.value}>{Val.text}</option>)
                                    })
                                }

                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="col-lg-6">
                    <TextField
                        id="outlined-dense"
                        label="Filter"
                        className="textfields"
                        margin="dense"
                        variant="outlined"
                        name="Filter"
                        autoComplete="off"
                        onChange={filter}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <HomeFormGrid
                        ref={GridRef}
                        setsformData={setsformData}
                        data={localdata}
                    />
                </div>
            </div>

            <div className="row ">
                <div className="col-lg-5">
                    <TextField
                        id="outlined-dense"
                        label="First Name"
                        className="textfields"
                        margin="dense"
                        variant="outlined"
                        name="fname"
                        autoComplete="off"
                        value={(formData && formData.fname) || ""}

                    />
                </div>
                <div className="col-lg-5 offset"></div>
            </div>

            <div className="row">
                <div className="col-lg-9">
                    <TextField
                        autoComplete="off"
                        id="outlined-dense"
                        label="Last Name"
                        className="textfields"
                        margin="dense"
                        variant="outlined"
                        name="lname"
                        value={(formData && formData.lname) || ""}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-lg-4">
                    <TextField
                        id="outlined-dense"
                        label="Email"
                        className="textfields"
                        type="text"
                        name="email"
                        margin="dense"
                        variant="outlined"
                        autoComplete="off"
                        value={(formData && formData.email) || ""}
                    />
                </div>
                <div className="col-lg-5">
                    <TextField
                        id="outlined-dense"
                        label="Phone"
                        className="textfields"
                        margin="dense"
                        variant="outlined"
                        autoComplete="off"
                        name="phone"
                        value={(formData && formData.phone) || ""}

                    />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <TextField
                        id="outlined-dense"
                        label="Address"
                        className="textfields"
                        margin="dense"
                        variant="outlined"
                        autoComplete="off"
                        name="add"
                        value={(formData && formData.add) || ""}

                    />
                </div>
            </div>

            <div className="row mt-5">
                <div className=" pr-0">
                    <Button className="ml-1 StBlueButton">
                        New
                    </Button>
                    <Button className="ml-1 close-btn text-capitalize">
                        Delete
                    </Button>
                    <Button className="ml-1 StBlueButton" onClick={clickSaveButton}>
                        Save
                    </Button>
                    <Button className="ml-1 close-btn text-capitalize ">
                        Cancel
                    </Button>
                    <Button className="ml-1 close-btn text-capitalize" onClick={clickClearButton}>Clear</Button>
                </div>
            </div>

        </>
    );
}

export default HomeComponent;