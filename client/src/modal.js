import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

export default function ModalComponent(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = props.style

  return (
    <>
      <Button style={props.buttonStyle} onClick={handleOpen}>{props.text}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted={props.keepMounted? props.keepMounted : undefined}
      >
        <Box sx={style}>
          {props.component} 
        </Box>
      </Modal>
    </>
  );
}

