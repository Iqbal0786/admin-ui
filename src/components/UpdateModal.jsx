import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  p: 4,
};

export default function UpdateModal({state}) {
  const [open, setOpen] = React.useState(state);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
   const [name,setName]=React.useState("")
  const updateHandler=()=>{
      alert(name)
      setOpen(false)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField label="name" onChange={(e)=>{setName(e.target.value)}}/>
          </Typography>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button variant='outlined' onClick={updateHandler}>Update</Button>
        </Box>
      </Modal>
    </div>
  );
}
