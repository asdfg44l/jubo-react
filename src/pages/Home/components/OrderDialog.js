import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const OrderCard = ({ content, onDelete }) => {
  return (
    <Card sx={{ marginBottom: '1rem', backgroundColor: 'card', position: 'relative' }}>
      <IconButton onClick={() => onDelete(content._id)} sx={{ position: 'absolute', top: '3%', right: '1%' }} aria-label="delete" color="error">
        <DeleteIcon />
      </IconButton>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          創建日期: {content.createAt}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          更新日期: {content.updateAt}
        </Typography>
        <Typography variant="body2">
          醫囑:
          <br />
          {content.message}
        </Typography>
      </CardContent>
    </Card>
  )
}

const OrderDialog = ({ open, setOpen, title, cardList, addOrder, deleteOrder }) => {
  const [message, setMessage] = useState("")

  function handleClose() {
    setOpen(false);
  };

  function handleAddOrder() {
    addOrder(message)
  }

  function handleDeleteOrder(orderId) {
    deleteOrder(orderId)
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth sx={{ maxWidth: 900, margin: '0 auto' }}>
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            sx={{ margin: '0.5rem 1rem' }}
            autoFocus
            id="name"
            label="新增醫囑"
            type="text"
            fullWidth
            variant="standard"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={handleAddOrder} variant="contained">新增</Button>
        </DialogContent>
        <DialogContent>
          {cardList.length > 0 &&
           cardList.map(item => <OrderCard content={item} key={item._id} onDelete={handleDeleteOrder}/>)
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>離開</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default OrderDialog