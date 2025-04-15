import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button } from '../ui/Button';
import s from "./TransitionModal.module.scss"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  bgcolor: '#161616',
  outline: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

interface TransitionsModalProps {
  desc?: string,
  info: string,
  isOpen: boolean,
  onClose: () => void
}

export default function TransitionsModal({desc, info, isOpen, onClose}: TransitionsModalProps) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backdropFilter: 'blur(2px)', 
              backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            },
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {desc}
            </Typography>
            <div className={s.modal__info}>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {info}
              </Typography>
              <Button onClick={onClose}>Close Description</Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}