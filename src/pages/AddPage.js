import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { Dialog, IconButton, Button, Input } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { CloseIcon, MandatoryFieldsLogo } from '../assets';
import { Fragment } from 'react';

const useStyles = makeStyles((theme) => console.log(theme) || ({
    dialogPaper: {
        minHeight: '60vh', 
        maxHeight: '60vh',
        minWidth: '60vw',
        maxWidth: '60vw',
        background: '#000000',
    },
    errorbox: {
        minHeight: '8vh', 
        maxHeight: '8vh',
        minWidth: '25vw',
        maxWidth: '25vw',
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: '#000000',
    },
    WindowHeader: {
        background: '#2A3E4C',
        borderRadius: '10px 10px 0px 0px',
        position: 'static',
    },
    Title: {
        color: '#FFFFFF',   
        font: 'Ubuntu',
        fontWeight: 'normal',
    },
    TopRightMenu: {
        position: 'fixed',
        top: '160px',
        right: '330px',
    },
    Body: {
        fontSize: '15px',
        color: '#97A1A9',
        background: '#2A3E4C',
        paddingBlock: '40px',
    },
    Column1: {
        width: '30vw',
        height: '30vh',
        paddingLeft: '40px'
    },
    Column2: {
        width: '30vw',
        height: '30vh',
        paddingLeft: '50px'
    },
    Column3: {
        width: '30vw',
        height: '30vh',
        paddingLeft: '40px'
    },
    Column4: {
        width: '30vw',
        height: '30vh',
        paddingLeft: '40px'
    },
    InputBox: {
        color: '#30081d',
        width: '205px',
        border: '1px solid #356680',
        background: '#f0d4d3',
        
        borderRadius: 10,
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    ErrorInputBox: {
        color: '#FFFFFF',
        width: '205px',
        border: '1px solid #FF5B5B',
        background: '#283A46',
        borderRadius: 10,
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    ClearButton: {
        color: '#FFF',
        textTransform: 'none',
        border: '1px solid #14AFF1',
        borderRadius: 1,
        height: '25px',
        width: '40px',
        padding: '15px'
    },
    AddButton: {
        color: '#FFF',
        textTransform: 'none',
        border: '1px solid #14AFF1',
        borderRadius: 1,
        height: '25px',
        width: '40px',
        padding: '15px'
    },
}))

const MandatoryFieldsPopUp = ({ open, setOpen }) => {
    const classes = useStyles();
    const [ maxWidth ] = React.useState('lg');
    const [ fullWidth ] = React.useState(false);
    

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog 
            onClose={handleClose} 
            open={open}
            maxWidth={maxWidth} 
            fullWidth={fullWidth} 
            classes={{ paper: classes.errorbox }}
        >
            <MuiDialogContent 
                className={classes.Body}
                style={{
                    overflow: 'hidden',
                    borderLeft: '5px solid #FF5B5B',
                    borderRadius: 10,
                    color: '#FFFFFF',
                    display: 'flex',
                }}
            >
                <div style={{ paddingRight: '10px' }}>
                    <MandatoryFieldsLogo/>
                </div>
                <div>
                    Mandatory fields can't be empty
                </div>
                <div style={{ position: 'absolute', right: '10px', top: '8px' }}>
                    <IconButton onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </MuiDialogContent>
        </Dialog>
    );
}









const AddMenu = ({ 
    businessCode, setbusinessCode,
    docId,setdocId,
    invoiceCurrency,setinvoiceCurrency,
    baselinecreatedate,setbaselinecreatedate,
    
    customerNumber, setCustomerNumber,
    postingdate,setpostingdate,
    doctype,setdoctype,
    customerpayterms,setcustomerpayterms,

    cleardate,setcleardate,
   // docdate,setdocdate,
  //  postingid,setpostingid,
    invoiceNumber, setInvoiceNumber,

    businessyear,setbusinessyear,
    totalopenamt, settotalopenamt,
    dueDate, setDueDate,
   
    addButtonClicked, setAddButtonClicked,
 }) => {

    const classes = useStyles();


    

    const handlebusinessCode = (event) => {
        setAddButtonClicked(false);
        setbusinessCode(event.target.value);
    }
    const handledocId = (event) => {
        setAddButtonClicked(false);
        setdocId(event.target.value);
    }
    const handleinvoiceCurrency = (event) => {
        setAddButtonClicked(false);
        setinvoiceCurrency(event.target.value);
    }

   
    const handleCustomerNumber = (event) => {
        setAddButtonClicked(false);
        setCustomerNumber(event.target.value);
    }
    const handledoctype = (event) => {
        setAddButtonClicked(false);
        setdoctype(event.target.value);
    }
    const handlecustomerpayterms = (event) => {
        setAddButtonClicked(false);
        setcustomerpayterms(event.target.value);
    }
  
    const handleInvoiceNumber = (event) => {
        setAddButtonClicked(false);
        setInvoiceNumber(event.target.value);
    }
    const handlebusinessyear = (event) => {
        setAddButtonClicked(false);
        setbusinessyear(event.target.value);
    }

    const handletotalopenamt = (event) => {
        setAddButtonClicked(false);
        settotalopenamt(event.target.value);
    }

    

   
    const isErrorbusinessCode = (businessCode === '' && addButtonClicked);
    const isErrordocId = (docId === '' && addButtonClicked);
    const isErrorinvoiceCurrency = (invoiceCurrency === '' && addButtonClicked); 
    const isErrorbaselinecreatedate = (baselinecreatedate === '' && addButtonClicked); 
    const isErrorpostingdate = (postingdate === '' && addButtonClicked);
    const isErrorCustomerNumber = (customerNumber === '' && addButtonClicked);
    const isErrordoctype = (doctype === '' && addButtonClicked);
    const isErrorcustomerpayterms = (customerpayterms === '' && addButtonClicked);
    const isErrorcleardate = (cleardate === '' && addButtonClicked);
   // const isErrordocdate = (docdate === '' && addButtonClicked);
   // const isErrorpostingid = (postingid === '' && addButtonClicked);
    
    const isErrorInvoiceNumber = (invoiceNumber === '' && addButtonClicked);
    const isErrorbusinessyear = (businessyear === '' && addButtonClicked);
    const isErrortotalopenamt = (totalopenamt === '' && addButtonClicked);
    const isErrorDueDate = (dueDate === '' && addButtonClicked);

    return (
        <div style={{ display: 'flex' }}>
            <div className={classes.Column1}>
               
                        <div style={{ paddingBottom: '30px' }}>
                            <Input 
                                
                                className={isErrorbusinessCode ? classes.ErrorInputBox : classes.InputBox}
                                disableUnderline={true}
                                placeholder='business code'
                                required={true}
                                defaultValue={businessCode}
                                onChange={(event) => handlebusinessCode(event)}
                                error={isErrorbusinessCode}
                            >
                            </Input>
                        </div>
                        <div style={{ paddingBottom: '30px' }}>
                            <Input 
                                
                                className={isErrordocId ? classes.ErrorInputBox : classes.InputBox}
                                disableUnderline={true}
                                placeholder='Document Id'
                                required={true}
                                defaultValue={docId}
                                onChange={(event) => handledocId(event)}
                                error={isErrordocId}
                            >
                            </Input>
                        </div>
                        <div style={{ paddingBottom: '30px' }}>
                            <Input 
                                
                                className={isErrorinvoiceCurrency ? classes.ErrorInputBox : classes.InputBox}
                                disableUnderline={true}
                                placeholder='Invoice Currency'
                                required={true}
                                defaultValue={invoiceCurrency}
                                onChange={(event) => handleinvoiceCurrency(event)}
                                error={isErrorinvoiceCurrency}
                            >
                            </Input>
                        </div> 
                    
                    </div>

        </div>
    )
}

const AddPage = ({ open, setOpen, setDataPageCount, setData }) => {
    const classes = useStyles();
    const [ maxWidth ] = React.useState('lg');
    const [ fullWidth ] = React.useState(false);

    const[businessCode,setbusinessCode]=React.useState('');
    const[docId,setdocId]=React.useState('');
    const[invoiceCurrency,setinvoiceCurrency]=React.useState('');
    const [ baselinecreatedate, setbaselinecreatedate ] = React.useState('');
    
    
    const [ customerNumber, setCustomerNumber ] = React.useState('');
    const [ postingdate, setpostingdate ] = React.useState('');
    const [ doctype, setdoctype ] = React.useState('');
    const [ customerpayterms, setcustomerpayterms ] = React.useState('');

    const [ cleardate, setcleardate ] = React.useState('');
    //const [ docdate, setdocdate ] = React.useState('');
    //const [ postingid, setpostingid] = React.useState('');
    const [ invoiceNumber, setInvoiceNumber ] = React.useState('');
    
    
    const [ businessyear, setbusinessyear] = React.useState('');
    const [ dueDate, setDueDate ] = React.useState('');
    const [ totalopenamt, settotalopenamt ] = React.useState('');
    

    const [ addButtonClicked, setAddButtonClicked ] = React.useState(false);
    const [ openMandatoryFieldsPopUp, setOpenMandatoryFieldsPopUp ] = React.useState(false);

    const handleAddButton = () => {
        setAddButtonClicked(true);
        if(
            businessCode !== '' &&
            docId !== '' &&
            invoiceCurrency !== ''
          
        ) {
            axios.post(
                'http://localhost:8081/Order/testadd', 
                {   
                    businessCode,
                    docId,
                    invoiceCurrency,
                  
                
                }
            )
            .then((response) => {
                console.log(response);
                 setData([])
                 setDataPageCount(1);
            })
            .catch((error) => {
                console.log(error);
            });

            handleClose();
        }
        else {
            setOpenMandatoryFieldsPopUp(true);
        }
    }

    const handleClearButton = () => {
        setAddButtonClicked(false);
        setbusinessCode('');
        setdocId('');
      
    
    }

    const handleClose = () => {
        handleClearButton();
        setOpen(false);
    }

    return (
        <Fragment>
            <Fragment>
                <Dialog onClose={handleClose} open={open} maxWidth={maxWidth} fullWidth={fullWidth} classes={{ paper: classes.dialogPaper }}>
                    <MuiDialogTitle className={classes.WindowHeader} >
                        <div style={{ display: 'flex' }}>
                            <div className={classes.Title}>
                                Add 
                            </div>
                            <div className={classes.TopRightMenu}>
                                <IconButton onClick={handleClose}>
                                    <CloseIcon/>
                                </IconButton>
                            </div>
                        </div>
                    </MuiDialogTitle>
                    <MuiDialogContent className={classes.Body}>
                        <AddMenu
                            businessCode={businessCode} setbusinessCode={setbusinessCode}
                            docId={docId} setdocId={setdocId}
                            invoiceCurrency={invoiceCurrency} setinvoiceCurrency={setinvoiceCurrency}
                          
                           
                        
                            addButtonClicked={addButtonClicked} setAddButtonClicked={setAddButtonClicked}
                        />
                    </MuiDialogContent>
                    <MuiDialogActions style={{ background: '#2A3E4C', borderRadius: '0px 0px 10px 10px' }}>
                        <div onClick={handleClose} style={{ position: 'fixed', left: '350px', paddingBottom: '10px' }}>
                            <Button autofocus className={classes.AddButton}>Cancel</Button>
                        </div>
                        
                        <div style={{ paddingRight: '20px', paddingBottom: '10px' }}>
                            <Button autofocus className={classes.AddButton} onClick={handleAddButton}>Add</Button>
                        </div>
                    </MuiDialogActions>
                </Dialog>
            </Fragment>
            <Fragment>
                <MandatoryFieldsPopUp
                    open={openMandatoryFieldsPopUp}
                    setOpen={setOpenMandatoryFieldsPopUp}
                />
            </Fragment>
        </Fragment>
    )
}

export default AddPage;