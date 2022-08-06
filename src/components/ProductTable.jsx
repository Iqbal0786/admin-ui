import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';


export default function ProductTable({data}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  return (
    <Paper sx={{ width: '90%', overflow: 'hidden'  ,margin:"auto", marginTop:"40px", marginBottom:"50px"}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow >
              <TableCell > <Checkbox  disabled /></TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Name</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Email</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Role</TableCell>
              <TableCell sx={{fontWeight:"bolder"}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item)=>{
              return (
                <TableRow  key={item.id}>
              <TableCell > <Checkbox   /></TableCell>
              <TableCell >{item.name}</TableCell>
              <TableCell >{item.email}</TableCell>
              <TableCell >{item.role}</TableCell>
              <TableCell >
                <EditIcon sx={{color:"green" , cursor:"pointer"}}/>     <DeleteIcon sx={{color:"red" , cursor:"pointer"}}/>
              </TableCell>
            </TableRow>
              )
            })}
               
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
