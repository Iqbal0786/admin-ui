import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function AdminUi() {
    function paginate(array, page_size, page_number) {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        return array.slice((page_number - 1) * page_size, page_number * page_size);
      }
    //   let res= paginate([1,2,3,4,5,6,7],2,2);
    //   console.log(res)
  return (
   <>
   
   <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          Admin UI
        </Toolbar>
      </AppBar>
    </Box>

    <Box sx={{width:"90%" , height:"800px" , margin:"auto" , marginTop:"100px"}}>
         {/* search box */}
        <Box sx={{width:"400px", margin:"auto" , display:"flex", justifyContent:"space-between"}}>
        <TextField variant='outlined' label="Search by name,email or role" sx={{width:"290px"}}/>
        <Button variant='outlined'>Search</Button>
        </Box>

        
        
    </Box>
   
   </>
  )
}
