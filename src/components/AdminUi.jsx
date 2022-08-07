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
    const [searchedData,setSearchedData]=useState([]);
    const [searchText,setSerachText]= useState("");
    const [toDeleteData,setTodeleteData]=useState([])
    const pageSize=  searchedData.length>0?Math.ceil(searchedData.length/10):Math.ceil(userData.length/10);
     let filterData= paginatedData.length>0?paginatedData:paginate(userData,10,2);
    
    function paginate(array, page_size, page_number) {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        return array.slice((page_number - 1) * page_size, page_number * page_size);
      }
    //   let res= paginate([1,2,3,4,5,6,7],2,2);
    //   console.log(res)
     
    const paginationHandler=(e,value)=>{
              //  default paginated data 
              if(value>=1 && value<=pageSize){
                 if(searchedData.length>0){
                    let res=paginate(searchedData,10,value);
                console.log(res)
                 setPaginatedData(res)
                 }
                 else{
                    let res=paginate(userData,10,value);
                   console.log(res)
                 setPaginatedData(res)
                 }
                
              }
        
           
              
         console.log(value);
    }

    const getSearchInput=(e)=>{
        setSerachText(e.target.value)
    }
    const searchHandler=()=>{
      let searchResult= userData.filter((item)=>{
         if(item.name==searchText){return item}
         else if(item.email==searchText){return item}
         else if(item.role==searchText){return item}
      })
      setPaginatedData(paginate(searchResult,10,1)) // setting default paginated data to show on the table
      setSearchedData(searchResult) // setting searched state for further pagination processs

    }

    const deleteSingle=(data)=>{
         setPaginatedData( paginatedData.filter((item)=>item.id!=data.id))
    }
    const deleteMultiple=(data)=>{
              setTodeleteData(data)
     
       // setPaginatedData(data)
        
    }

    function deleteMultipleHandler(){
      
        let newData;
         if(toDeleteData.length>0){
            for(let i=0;i<toDeleteData.length;i++){
               if(i==0){
                 newData=paginatedData.filter((elem)=>elem.id!=toDeleteData[i].id)
               }
               else{
                newData=newData.filter((elem)=>elem.id!=toDeleteData[i].id)
               }
            }
            // newData=paginatedData.filter((e)=>e.id!=toDeleteData.map((elem)=>elem.id))
            setPaginatedData(newData)
         }
         console.log(newData)
        
    }

    useEffect(()=>{
        console.log("first useEffect")
         axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json").then((res)=>{console.log(res.data)
          setUserData([...res.data])
          setPaginatedData(paginate(res.data,10,1))
        }).catch((err)=>{
            console.log(err)
         });

    },[])
    
    // calling paginate function to load default paginated data
    useEffect(()=>{
        // console.log("second useEffect")
        //  let res=   paginate(userData,10,1);
        // //  console.log('function result',res)
        //   setPaginatedData([...res])
    },[])
    // console.log( "pagination data",paginatedData)
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
        <TextField variant='outlined' label="Search by name,email or role" sx={{width:"290px"}}  onChange={getSearchInput}/>
        <Button variant='outlined' onClick={searchHandler}>Search</Button>
        </Box>

        <ProductTable data={filterData} deleteSingle={deleteSingle} deleteMultiple={deleteMultiple}/>
        <Box sx={{width:"90%" , margin:"auto", display:"flex",justifyContent:"space-between"}}>
         <Box>
            <Button variant='contained' onClick={deleteMultipleHandler}>Delete Selected</Button>
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
