import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { SearchIcon, EditIcon } from '../assets'
import { pxToRem } from '../utils/theme';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@material-ui/core';
import { AppBar, Toolbar, Button, Input, InputAdornment, Checkbox } from '@material-ui/core';
import EditPage from './EditPage.js';
import AddPage from './AddPage.js';

const useStyles = makeStyles((theme) => ({
    Landing: {
        display: 'flex',
        flexDirection: 'column',
    },
    Header: {
        display: 'flex',
        paddingBlock: '5px',
        width: 1553.620,
    },
   
    InvoiceList: {
        font: 'Ubuntu',
        fontSize: '20px',
        color: '#FFFFFF',
        paddingTop: '10px',
        paddingBottom: '20px',
        paddingLeft: '20px',
        width: '200px',
    },
    ToolBar: {
        display: 'flex',
        width: window.innerWidth - 40,
        position: 'static',
        background: '#273D49CC',
        boxShadow: 'none', 
        borderBottom: 'none',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    TableBox: {
        width: window.innerWidth - 40,
        background: '#273D49CC',
        paddinLeft: '20px',
        paddingBottom: '20px',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    DataTable: {
        width: window.innerWidth - 80,
        paddingLeft: '20px',
        paddingBottom: '20px',
        opacity: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    tableHeading: {
        backgroundColor: '#273D49CC',
        color: '#97A1A9',
        fontSize: '15px',
        borderBottom: 'none',
        opacity: '100%',
        
    },
    tableBody: {
        "&:nth-of-type(odd)": {
            backgroundColor: '#273D49CC',
        },
        "&:nth-of-type(even)": {
            backgroundColor: "#283A46"
        },
        color: '#FFFFFF',
        fontSize: '16px',
        "&$selected, &$selected:hover": {
            backgroundColor: '#2A5368'
        },
        borderRadius: 10,
    },
    hover: {},
    selected: {},
    tableRow: {
        color: '#FFFFFF',
        borderBottom: 'none',
        height: '10px',
    },
    searchByInvoiceNumber: {
        
        color: '#97A1A9',
        borderBottom: 'none',
        border: '1px solid #356680',
        background: '#283A46',
        borderRadius: 10,
        paddingLeft: '10px',
        paddingRight: '10px',
        disableUnderline: true,
        height: '45px',
        borderBottom: '1px solid #356680',
        width: '340px',
    },
    Button: {
        color: '#FFFFFF',
        border: '1px solid #14AFF1',
        borderRadius: 10,
        textTransform: 'none',
        height: '45px',
        padding: '15px',
    },
    DisabledButton: {
        color: '#97A1A9',
        border: '1px solid #97A1A9',
        borderRadius: 10,
        textTransform: 'none',
        height: '45px',
        padding: '15px',
    },
    checkbox: {
        root: {
            color: '#14AFF1',
            '&$checked': {
                color: '#14AFF1',
            },
        },
    },
}));


const DataTable = ({
    data, setData,
    selected, setSelected,
    searchKeyword, searchResults,
    searchPageCount, setSearchPageCount,
    dataPageCount, setDataPageCount
}) => {
    const classes = useStyles();
    const [ isNext, setNext ] = React.useState(false);

    

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = data.map(n => n['Sl_no']);
            setSelected(newSelecteds);
        }
        else {
            setSelected([]);
        }
    };

    const handleClick = (event, Sl_no) => {
        const selectedIndex = selected.indexOf(Sl_no);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, Sl_no);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
          );
        }
        setSelected(newSelected);
    };

    React.useEffect(() => {
        if(dataPageCount !== -1) {
            setNext(true);
            axios.get(`http://localhost:8081/Order/Food`)
            .then((response) => {
                setData((prev) => [...prev, ...response.data]);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [ dataPageCount ]);

    const isSelected = (Sl_no) => selected.indexOf(Sl_no) !== -1;
    const dataLength = data === undefined ? 0 : data.length;
    const selectedLength = selected === undefined ? 0 : selected.length;
    const searchResultsLength = searchResults === undefined ? 0 : searchResults.length;
    const viewSearchResults = searchKeyword !== '';

    return (
        <div style={{ paddingLeft: '20px' }}>
            <div className={classes.TableBox}>
                <TableContainer id="data-table" style={{ height: (window.innerHeight - 230), width: (window.innerWidth - 60), overflow: 'scroll', overflowX: 'hidden' }}>
                   
                        <Table className={classes.DataTable} stickyHeader aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            indeterminate={selectedLength > 0 && selectedLength < dataLength}
                                            checked={dataLength > 0 && selectedLength === dataLength}
                                            onChange={handleSelectAllClick}
                                            inputProps={{ 'aria-label': 'select all desserts' }}
                                            className={classes.checkbox}
                                            disableRipple={true}
                                            size='small'
                                        />
                                    </TableCell>
                                    <TableCell key={'Sl_no'} className={classes.tableHeading}>Sl No</TableCell>
                                    <TableCell key={'food_item'} className={classes.tableHeading}>Food Item</TableCell>
                                    <TableCell key={'table_no'} className={classes.tableHeading}>Table_no</TableCell>
                                    <TableCell key={'serving'} className={classes.tableHeading}>Serving</TableCell> 
                                    <TableCell key={'notes'} className={classes.tableHeading}>Notes</TableCell> 
                                    
                                </TableRow>
                            </TableHead>
                            <TableBody component="th" scope="row">
                                {(searchKeyword === '' ? data : searchResults).map((row) => {
                                    const isItemSelected = isSelected(row['Sl_no']);
                                    return (
                                        <TableRow 
                                            className={classes.tableBody} 
                                            classes={{ hover: classes.hover, selected: classes.selected }}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    onClick={(event) => handleClick(event, row['Sl_no'])}
                                                    className={classes.tableRow}
                                                    className1={classes.checkbox}
                                                    disableRipple={true}
                                                    size='small'
                                                />
                                            </TableCell>
                                            <TableCell className={classes.tableRow}>{row['Sl_no']}</TableCell>
                                            <TableCell className={classes.tableRow}>{row['food_item']}</TableCell>
                                            <TableCell className={classes.tableRow}>{row['table_no']}</TableCell>
                                            <TableCell className={classes.tableRow}>{row['serving']}</TableCell>
                                            <TableCell className={classes.tableRow}>{row['notes']}</TableCell>
                                            
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    
                </TableContainer>
            </div>
        </div>
    )
}

const Bar = ({ 
    data, setData,
    selected, setSelected,
    searchKeyword, setSearchKeyword,
    searchResults, setSearchResults,
    searchPageCount, setSearchPageCount,
    setDataPageCount
 }) => {
    const classes = useStyles();
    const [ openAddInvoice, setOpenAddInvoice ] = React.useState(false);
    const [ openDeleteInvoice, setOpenDeleteInvoice ] = React.useState(false);
    const [ openEditInvoice, setOpenEditInvoice ] = React.useState(false);
    const [ openViewCorrespondence, setOpenViewCorrespondence ] = React.useState(false);

    const [ selectedInvoiceDetails, setSelectedInvoiceDetails ] = React.useState([]);

    const handleAddInvoice = () => {
        setOpenAddInvoice(true);
    }

    const handleDeleteInvoice = () => {
        setOpenDeleteInvoice(true);
    }

    const handleEditInvoice = () => {
        setOpenEditInvoice(true);
    }

    const handleViewCorrespondence = () => {
        setOpenViewCorrespondence(true);
    }

    const handleSearch = (event) => {
        setSearchKeyword(event.target.value);
        setSearchPageCount(0);
        setSearchResults([]);
    }
    function refreshPage(){ 
        window.location.reload(); 
    }


    React.useEffect(() => {
        axios.get(`http://localhost:8081/Order/SearchSalesOrder?searchKeyword=${searchKeyword}&page=${searchPageCount}`)
        .then((response) => {
            setSearchResults([...searchResults, ...response.data]);
        })
        .catch((error) => {
            console.log(error)
        })
        console.log(searchKeyword)
    }, [ searchKeyword, searchPageCount ])

    React.useEffect(() => {
        setSelectedInvoiceDetails(data.filter(row => selected.indexOf(row['Sl_no']) != -1));
    }, [ selected ])

    const isDisabledEditButton = (selected.length !== 1);
    const isDisabledViewCorrespondenceButton = (selected.length === 0);
    const isDisabledDeleteButton = (selected.length === 0);
    const isDisabledPredictButton = (selected.length === 0);

    return (
        <AppBar className={classes.ToolBar}>
            <Toolbar style={{ display: 'flex' }}>
                
                <div style={{ paddingRight: '10px', paddingTop: '10px', display: 'flex' }}>
                <div style={{ paddingRight: '0.1px', paddingTop: '10px', }}>
                    <Button 
                        className={classes.Button} 
                        onClick={handleAddInvoice}
                    >
                         ADD
                    </Button>
                    <AddPage 
                        open={openAddInvoice} setOpen={setOpenAddInvoice}
                        setDataPageCount={setDataPageCount} setData={setData}
                    />
                </div>
                <div style={{ paddingRight: '20px', paddingTop: '10px', }}>
                        <Button 
                            className={isDisabledDeleteButton ? classes.DisabledButton : classes.Button} 
                            onClick={handleEditInvoice}
                            disabled={isDisabledDeleteButton}
                           
                        >
                            <EditIcon style={{ paddingRight: '1px' }}/>
                            <div style={{paddingLeft: '4px'}}>
                              Edit
                            </div>
                        </Button>
                        <EditPage 
                            open={openEditInvoice} setOpen={setOpenEditInvoice}
                            selectedInvoiceDetails={selectedInvoiceDetails}
                            setDataPageCount={setDataPageCount} setData={setData}
                        />
                    </div>
                    <div style={{ paddingRight: '0.1px', paddingTop: '10px', }}>
                            <Button 
                                className={classes.Button} 
                                onClick={refreshPage}
                            >
                                Refresh
                            </Button>
                            
                        </div>
                    <div style={{ paddingTop: '10px',paddingLeft: '280px',paddingBottom: '10px' }}>
                        <Input
                            className={classes.searchByInvoiceNumber}
                            placeholder='Search by Food item'
                            disableUnderline={true}
                            value={searchKeyword}
                            onChange={(event) => handleSearch(event)}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <SearchIcon/>
                                </InputAdornment>
                            }
                        ></Input>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    )
}

const Landing = () => {
    const classes = useStyles();
    const [ data, setData ] = React.useState([]);
    const [ dataPageCount, setDataPageCount ] = React.useState(0);
    const [ selected, setSelected ] = React.useState([]);

    const [ searchKeyword, setSearchKeyword ] = React.useState('');
    const [ searchResults, setSearchResults ] = React.useState([]);
    const [ searchPageCount, setSearchPageCount ] = React.useState(0);

    return (
        <div className={classes.Landing}>
           
            <div className={classes.InvoiceList}>
                Order List
            </div>
            <div className={classes.InvoiceTable}>
                <div style={{ paddingLeft: '19px' }}>
                    <Bar
                        data={data} setData={setData}
                        selected={selected} setSelected={setSelected}
                        searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}
                        searchResults={searchResults} setSearchResults={setSearchResults}
                        searchPageCount={searchPageCount} setSearchPageCount={setSearchPageCount}
                        setDataPageCount={setDataPageCount}
                    />
                </div>
                <div>
                    <DataTable
                        data={data} setData={setData}
                        selected={selected} setSelected={setSelected}
                        searchKeyword={searchKeyword} searchResults={searchResults}
                        searchPageCount={searchPageCount} setSearchPageCount={setSearchPageCount}
                        dataPageCount={dataPageCount} setDataPageCount={setDataPageCount}
                    />
                </div>
            </div>
        </div>
    )
}

export default Landing;