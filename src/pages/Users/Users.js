import React, { useState } from "react";
import UsersForm from "./UsersForm";

import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Grid,
} from "@material-ui/core";
import useTable from "../../components/useTable";
import * as userService from "../../services/userService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteForever from "@material-ui/icons/DeleteForever";
import Popup from "../../components/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "fullName", label: "User Name" },
  { id: "email", label: "Email Address" },
  { id: "age", label: "Age" },
  // { id: 'department', label: 'Department' },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function Users() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(userService.getAllUsers());
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = (user, resetForm) => {
    if (user.id == 0) userService.insertUser(user);
    else userService.updateUser(user);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(userService.getAllUsers());
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const insertRandomUser=()=>{
    userService.insertUser(userService.randomUserFields())
    setRecords(userService.getAllUsers())
  }

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Users"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text="Add user form"
            variant="outlined"
            startIcon={<PersonAddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
            size="small"
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.age}</TableCell>

                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setRecords(userService.deleteUser(item));
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
       
       
        <div>
        <Controls.Button
            text="Add random user"
            variant="outlined"
            startIcon={<PersonAddIcon />}
            // className={classes.newButton}
            onClick={() => {
              insertRandomUser()
            }}
            size="small"
          />
        <Controls.Button
            text="Delete all users"
            variant="outlined"
            startIcon={<DeleteForever />}
            // className={classes.newButton}
            // onClick={() => {
            //   console.log('click en Delete All shit')
            // }}
            onClick={() => {
              setRecords(userService.deleteAllUsers());
            }}
            size="small"
          />
        </div>
         <TblPagination />
      </Paper>
      <Popup
        title="Users Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UsersForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </>
  );
}

{/* <Controls.Button
text="DeleteAll"
variant="outlined"
startIcon={<DeleteForever />}
className={classes.newButton}
onClick={() => {
  setRecords(userService.deleteAllUsers());
}}
size="small"
/> */}

