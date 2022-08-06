import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import ProductTable from './ProductTable';
import axios from 'axios';
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"

export default function AdminUi() {
    const [userData,setUserData]=useState([]);
    const [paginatedData,setPaginatedData]=useState([]);
    const [pageNumber,setPageNumber]=useState(1)
    const pageSize= Math.ceil(userData.length/10)
    let filterData= paginatedData || userData;
    function paginate(array, page_size, page_number) {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        return array.slice((page_number - 1) * page_size, page_number * page_size);
      }
    //   let res= paginate([1,2,3,4,5,6,7],2,2);
    //   console.log(res)
     
    const paginationHandler=(e,value)=>{
              //  default paginated data 
              if(value>=1 && value<=pageSize){
                let res=paginate(userData,10,value);
                console.log(res)
                 setPaginatedData([...res])
              }
              
              
         console.log(value);
    }

    useEffect(()=>{
         axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json").then((res)=>{console.log(res.data)
          setUserData([...res.data])
        }).catch((err)=>{
            console.log(err)
         })
    },[])
    
    // calling paginate function to load default paginated data
    useEffect(()=>{
         let res=   paginate(userData,10,1);
         console.log(res)
          setPaginatedData([...res])
    },[])
    console.log(paginatedData)
  return (
   <>
   
   <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          Admin UI
        </Toolbar>
      </AppBar>
    </Box>

    <Box sx={{width:"90%" , height:"800px" , margin:"auto" , marginTop:"50px"}}>
         {/* search box */}
        <Box sx={{width:"400px", margin:"auto" , display:"flex", justifyContent:"space-between"}}>
        <TextField variant='outlined' label="Search by name,email or role" sx={{width:"290px"}}/>
        <Button variant='outlined'>Search</Button>
        </Box>

        <ProductTable data={filterData}/>
        <Box sx={{width:"90%" , margin:"auto", display:"flex",justifyContent:"space-between"}}>
         <Box>
            <Button variant='contained'>Delete Selected</Button>
         </Box>
         <Box>
     <Stack spacing={2}>
      <Pagination count={pageSize} color="primary" showFirstButton showLastButton onChange={paginationHandler}/>
       </Stack>
    </Box>
        </Box>
        
    </Box>
   
   </>
  )
}
