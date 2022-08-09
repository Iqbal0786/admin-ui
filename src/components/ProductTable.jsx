import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

export default function ProductTable({
  data,
  deleteSingle,
  deleteMultiple,
  getUpdatedData,
}) {
  const [checkedData, setcheckedData] = React.useState([]);
  const [checkedRowIndex,setCheckedRowIndex]=React.useState([])
  const [userData, setUserData] = React.useState({});
  const [open, setOpen] = React.useState({
    open: false,
    singleUser: "",
  });
  const [updatedUsersData, setUpdatedUsersData] = React.useState([]);
  const [isDefaultChecked,setIsDefaultChecked]=React.useState(false)
  const getUserData = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };
  const handleOpen = (clickedUserData) => {
    setUserData(clickedUserData);
    setOpen({ open: true, singleUser: clickedUserData });
  };
  const handleClose = () => setOpen({ open: false, singleUser: "" });

  const updateHandler = () => {
    let updatedList = data.map((elem) => {
      return elem.id == userData.id ? (elem = userData) : elem;
    });
    setUpdatedUsersData(updatedList);
     getUpdatedData(updatedList)
    console.log(updatedList);

    setOpen({ open: false, singleUser: "" });
  };

  const checkBoxHandler = (e, item , index) => {
    if (e.target.checked) {
       let selectedRow= checkedRowIndex;
      let temp = checkedData;
      temp.push(item);
      selectedRow.push(item.id)
      // setIsDefaultChecked(true)
      setCheckedRowIndex([...selectedRow])
      setcheckedData([...temp]);
     
    } else {
      // setIsDefaultChecked(false)
      setCheckedRowIndex([...checkedRowIndex.filter((elem)=>elem!=item.id)])
      setcheckedData([...checkedData.filter((val) => val.id != item.id)]);
   
    }
  };

   function defaultCheckHandler(e){
       if(e.target.checked){
        setIsDefaultChecked(true)
       }
       else {
        setIsDefaultChecked(false)
       }
   }
  console.log(userData);
  console.log("selected row index arr",checkedRowIndex);

  React.useEffect(() => {
    deleteMultiple(checkedData);
  }, [checkedData]);
  React.useState(() => {
     console.log("table comp",updatedUsersData)
    getUpdatedData(updatedUsersData);
  }, [updatedUsersData]);
  //console.log("checked data",checkedData)

  // setBackgroundColor function to set row background color
     function setBackgroundColor(arr,id){
           if(arr.length==0){
            return {backgroundColor:"white"}
           }
           
           if(arr.includes(id)){
            return {backgroundColor:"gray"}
           }
           else{
            return {backgroundColor:"white"}
           }
        

     }  

  return (
    <Paper
      sx={{
        width: "90%",
        overflow: "hidden",
        margin: "auto",
        marginTop: "40px",
        marginBottom: "50px",
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                {" "}
                <Checkbox  onChange={defaultCheckHandler} />
              </TableCell>
              <TableCell sx={{ fontWeight: "bolder" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bolder" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bolder" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bolder" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item , i) => {
              let style= setBackgroundColor(checkedRowIndex,item.id)
              console.log("getBackgoundcolor is called",style)
               
              return (
                <TableRow key={item.id} sx={style}>
                <TableCell >
                       {" "}
                    <Checkbox
                      onChange={(e) => {
                        checkBoxHandler(e, item ,i);
                      }}
                      //  checked={isDefaultChecked}
                      // defaultChecked= {`${isDefaultChecked}`}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>
                    <EditIcon
                      sx={{ color: "green", cursor: "pointer" }}
                      onClick={() => {
                        handleOpen(item);
                      }}
                    />{" "}
                    <DeleteIcon
                      sx={{ color: "red", cursor: "pointer" }}
                      onClick={() => {
                        deleteSingle(item);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* dialog modal */}
      <Modal
        open={open.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "none",
            borderRadius:"10px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update User Record
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              gap: "10px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <TextField
              value={userData.name}
              label="name"
              id="name"
              onChange={getUserData}
            />
            <TextField
              value={userData.email}
              label="email"
              id="email"
              onChange={getUserData}
            />
            <TextField
              value={userData.role}
              label="role"
              id="role"
              onChange={getUserData}
            />
          </Box>
          <Button variant="contained" onClick={handleClose} sx={{backgroundColor:"red",color:"white"}}>
            Cancel
          </Button>
          <Button variant="contained" onClick={updateHandler} sx={{marginLeft:"10px" , backgroundColor:"green" ,color:"white"}}>
            Update
          </Button>
        </Box>
      </Modal>
    </Paper>
  );
}
