import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

//date format
function dateFormat(date) {
  let newDate = new Date(date).toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })

  return newDate
}

const OrderCard = ({ content, onDelete, onEdit }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [editMessage, setEditMessage] = useState(content.message)

  function handleEditCard() {
    onEdit({ message: editMessage, orderId: content._id })
    setIsEdit(false)
  }

  const EditInput = () => {
    return (
      <>
        <TextareaAutosize
          style={{ fontSize: '16px', display: 'block', width: '100%', marginBottom: '.75rem' }}
          aria-label="edit new doctor's order"
          minRows={3}
          maxRows={7}
          value={editMessage}
          onChange={(e) => setEditMessage(e.target.value)}
        />
        <Stack direction="row" justifyContent="flex-end">
          <Button sx={{ marginLeft: 'auto' }} onClick={handleEditCard} variant="contained">送出</Button>
        </Stack>
      </>
    )
  }

  return (
    <Card sx={{ marginBottom: '1rem', backgroundColor: 'card', position: 'relative' }}>
      <IconButton onClick={() => onDelete(content._id)} sx={{ position: 'absolute', top: '3%', right: '1%' }} aria-label="delete" color="error">
        <DeleteIcon />
      </IconButton>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          創建日期: {dateFormat(content.createAt)}
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          更新日期: {dateFormat(content.updateAt)}
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ fontSize: 16 }} variant="body2">
            醫囑:
          </Typography>
          <IconButton onClick={() => setIsEdit(isEdit => !isEdit)} color='primary'>
            <EditIcon sx={{ fontSize: 16 }}/>
          </IconButton>
        </Stack>
        <Typography sx={{ fontSize: 14 }} component="div">
          {!isEdit
            ? content.message
            : <EditInput />
          }
          
        </Typography>
      </CardContent>
    </Card>
  )
}

const OrderDialog = ({ open, setOpen, title, cardList, addOrder, deleteOrder, editOrder }) => {
  const [message, setMessage] = useState("")

  function handleClose() {
    setOpen(false);
  };

  function handleAddOrder() {
    addOrder(message.trim())
    setMessage("")
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
          <TextareaAutosize
            style={{ display: 'block', width: '100%', margin: '0.5rem 1rem' }}
            aria-label="add new doctor's order"
            minRows={3}
            maxRows={7}
            placeholder="新增醫囑"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={handleAddOrder} variant="contained">新增</Button>
        </DialogContent>
        <DialogContent>
          {cardList.length > 0 &&
           cardList.map(item => <OrderCard content={item} key={item._id} onDelete={handleDeleteOrder} onEdit={editOrder}/>)
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