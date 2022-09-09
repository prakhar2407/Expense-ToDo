import { useState } from "react";
import axios from "axios";
import Expense from "../../dtos/ExpenseClass";
import TextField from '@mui/material/TextField'
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import ExpenseList from "../ExpenseList/ExpenseList";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SnackbarEnum } from "../../enum/SnackbarEnum";


export default function ExpenseForm() {
    const [updateSubmitButton, setUpdateSubmitButton] = useState<string>("Submit")
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
    const [severity, setSeverity] = useState<SnackbarEnum>(SnackbarEnum.WARNING);
    const [date, setDate] = useState<Date | null>(
        new Date(),
    );
    const [message, setMessage] = useState<string>("");
    const [id, setId] = useState<number | null>(null);
    const [name, setName] = useState<string>("");
    const [cost, setCost] = useState<number>(0);
    const [remarks, setRemarks] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };
    const handleCostChange = (event: any) => {
        setCost(event.target.value);
    };
    const handleRemarksChange = (event: any) => {
        setRemarks(event.target.value);
    };
    const handleUrlChange = (event: any) => {
        setUrl(event.target.value);
    };
    const handleDateChange = (newValue: Date | null) => {
        setDate(newValue);
    };

    const handleSubmit = () => {
        const expenseData: Expense = {
            id: id,
            name: name,
            cost: cost,
            url: url,
            remarks: remarks,
            date: date
        }
        axios.post("expenses", expenseData).then((res) => {
            setSeverity(SnackbarEnum.SUCCESS);
            setMessage("Expense Updated Successfully")
            setOpenSnackBar(true)
            setId(null);
            setUpdateSubmitButton("Submit")
            handleReset()
        })
            .catch((error) => {
                setSeverity(SnackbarEnum.ERROR);
                setMessage("Some Error Occured")
                setOpenSnackBar(true)
                setId(null);
                setUpdateSubmitButton("Submit")
                handleReset();
            })
    }

    const handleReset = () => {
        setName("");
        setCost(0);
        setRemarks("");
        setUrl("");
        setDate(new Date());
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    return (
        <div>
            <ExpenseList
                setExpenses={setExpenses}
                expenses={expenses}
                setOpenSnackBar={setOpenSnackBar}
                setMessage={setMessage}
                setSeverity={setSeverity}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                setId={setId}
                setName={setName}
                setCost={setCost}
                setRemarks={setRemarks}
                setUrl={setUrl}
                setDate={setDate}
                setUpdateSubmitButton={setUpdateSubmitButton}
            />
            <Grid
                container
                justifyContent="center"
                style={{ minHeight: '80vh' }}
            >
                <Box sx={{ width: '30%' }}>
                    <Stack spacing={2}>
                        <TextField onChange={handleNameChange} value={name} id="outlined-basic" label="Name" variant="outlined" />
                        <label>Cost</label>
                        <Slider value={cost} onChange={handleCostChange} aria-label="Default" valueLabelDisplay="auto" />
                        <TextField onChange={handleRemarksChange} value={remarks} id="outlined-basic" label="Remarks" variant="outlined" />
                        <TextField onChange={handleUrlChange} value={url} id="outlined-basic" label="URL" variant="outlined" />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Date"
                                inputFormat="MM/DD/YYYY"
                                value={date}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Stack>
                    <Button style={{ marginTop: "20px", marginRight: "10px" }} onClick={handleSubmit} variant="contained">{updateSubmitButton}</Button>
                    <Button style={{ marginTop: "20px", backgroundColor: "red", marginRight: "10px" }} onClick={handleReset} variant="contained">Reset</Button>
                    <Button style={{ marginTop: "20px", backgroundColor: "orange" }} onClick={() => {
                        axios.get("expenses").then((res) => {
                            setExpenses(res.data);
                            setOpenDialog(true);
                        }).catch(() => {
                            setSeverity(SnackbarEnum.ERROR);
                            setMessage("Some Error Occured")
                            setOpenSnackBar(true)
                        })
                    }} variant="contained">Get All Expenses</Button>
                </Box>
            </Grid>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}
