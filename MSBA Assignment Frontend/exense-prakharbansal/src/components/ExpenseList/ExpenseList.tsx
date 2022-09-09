import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid'
import axios from 'axios';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { SnackbarEnum } from '../../enum/SnackbarEnum';

export default function ExpenseList(props: any) {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'cost',
            headerName: 'Cost',
            width: 150,
            editable: true,
        },
        {
            field: 'date',
            headerName: 'Date',
            type: 'number',
            width: 150,
            editable: true,
        },
        {
            field: 'url',
            headerName: 'URL',
            type: 'number',
            width: 150,
            editable: true,
        },
        {
            field: 'remarks',
            headerName: 'Remarks',
            type: 'number',
            width: 150,
            editable: true,
        },
        {
            field: "Action",
            renderCell: (cellValues) => {
                return (
                    <div>
                        <Button
                            style={{ marginRight: "10px" }}
                            variant="contained"
                            color="warning"
                            onClick={(event) => {
                                event.stopPropagation();
                                props.setId(cellValues.row.id);
                                props.setName(cellValues.row.name);
                                props.setCost(cellValues.row.cost);
                                props.setDate(cellValues.row.date);
                                props.setRemarks(cellValues.row.remarks);
                                props.setUrl(cellValues.row.url);
                                props.setOpenDialog(false);
                                props.setUpdateSubmitButton("Update")
                            }}
                        >
                            Update
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={(event) => {
                                event.stopPropagation();
                                axios.delete(`expenses/${cellValues.row.id}`).then((res) => {
                                    props.setMessage("Expense Deleted Successfully")
                                    props.setSeverity(SnackbarEnum.SUCCESS);
                                    props.setOpenSnackBar(true)
                                    props.setExpenses(res.data);
                                }).catch(() => {
                                    props.setMessage("Something Wrong Happend")
                                    props.setSeverity(SnackbarEnum.ERROR);
                                    props.setOpenSnackBar(true)
                                })
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                );
            },
            width: 210
        }
    ]

    return (
        <Dialog scroll={"paper"} maxWidth="xl" open={props.openDialog}>
            <Grid style={{ padding: "20px" }} width={1000}>
                <DataGrid
                    rows={props.expenses}
                    columns={columns}
                    rowsPerPageOptions={[5]}
                    autoHeight
                    pageSize={5}
                />
            </Grid>
            <DialogActions style={{ marginTop: "12px" }}>
                <Button
                    variant="contained"
                    color={"error"}
                    onClick={() => {
                        props.setOpenDialog(false);
                    }}
                    size={"large"}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>


    )
}
