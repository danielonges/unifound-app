/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  DialogActions,
  DialogTitle,
  Card,
  Link,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  CardContent
} from '@mui/material';
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trashFill from '@iconify/icons-eva/trash-2-fill';
import { styled } from '@mui/material/styles';
import lostAndFoundContext from '../../../context/lostAndFound/lostAndFoundContext';
import userContext from '../../../context/user/userContext';
import EditLostFoundForm from './EditLFListing';
import ChatContext from '../../../context/chat/chatContext';

LostFoundCard.propTypes = {
  lostFoundItem: PropTypes.object
};

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%'
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.error.main
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 5)'
});

export default function LostFoundCard({ lostFoundItem }) {
  const lostFoundContext = useContext(lostAndFoundContext);
  const { deleteLostFoundListing } = lostFoundContext;
  const { currentUser } = useContext(userContext);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [createChatOpen, setCreateChatOpen] = useState(false);
  const handleClickOpenEdit = () => setEditOpen(true);
  const handleCloseEdit = () => setEditOpen(false);
  const handleCancel = () => setDeleteOpen(false);

  const chatContext = useContext(ChatContext);
  const { createChatForLostFound } = chatContext;

  const { id, name, description, location, comments, type, user, category } = lostFoundItem;
  const onCreateChat = () => {
    const chat = {
      name: 'item: #' + id + ' ' + name
    };
    createChatForLostFound(chat, user.id, JSON.parse(localStorage.getItem('user')).id);
  };
  
  return (
    <SectionStyle>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle>
          {category === 'Phone' && (
            <CoverImgStyle src="https://guide-images.cdn.ifixit.com/igi/o4OjCNmNeOhvsS1P.large" />
          )}
          {category === 'Wallet' && (
            <CoverImgStyle src="https://bellroy-product-images.imgix.net/bellroy_dot_com_gallery_image/USD/WSSB-BLACK/0?w=345&h=220&fit=clip&auto=format" />
          )}
          {category === 'Keys' && (
            <CoverImgStyle src="https://m.media-amazon.com/images/I/71h8ATGZZpL._AC_SY355_.jpg" />
          )}
          {category === 'Water Bottle' && (
            <CoverImgStyle src="https://nalgene.com/wp-content/uploads/2020/12/Gray_WM-1-282x423.png" />
          )}
          {category === 'Laptop' && (
            <CoverImgStyle src="https://media.wired.com/photos/607de3f5a4b6a04f9b0280ce/master/w_2024,h_1518,c_limit/Gear-Surface-Laptop-4-angle-SOURCE-Microsoft.jpg" />
          )}
          {category === 'Earphones' && (
            <CoverImgStyle src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F60ca4903b52bedfa9ad71929%2FApple-AirPods-Pro%2F960x0.jpg%3Ffit%3Dscale" />
          )}
          {category === 'Bag' && (
            <CoverImgStyle src="https://bellroy-product-images.imgix.net/bellroy_dot_com_gallery_image/SGD/BTBA-LUN-213/0?w=345&h=220&fit=clip&dpr=2&q=37&auto=format" />
          )}
          {category === 'Charging Cable' && (
            <CoverImgStyle src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MD818?wid=4000&hei=3072&fmt=jpeg&qlt=95&.v=1600799997000" />
          )}
          {category === 'Spectacles' && (
            <CoverImgStyle src="https://cf.shopee.sg/file/2dab14a2a09b66bf95d071f7a063aab2" />
          )}
          {category === 'Others' && (
            <CoverImgStyle src="https://st.depositphotos.com/1742172/2007/v/950/depositphotos_20078073-stock-illustration-lost-and-found-sticker-luggage.jpg" />
          )}
        </CardMediaStyle>
        <CardContent sx={{ color: 'text.primary', fontSize: 12 }}>
          <Typography variant="subtitle2" noWrap>
            {name} <br />
          </Typography>
          {description} <br />
          Location: {location} <br />
          Category: {category} <br />
          {comments} <br />
          Posted by: {lostFoundItem.user.name} <br />
          <InfoStyle> {type.toUpperCase()}</InfoStyle>
          {lostFoundItem.user.id !== JSON.parse(localStorage.getItem('user')).id ? (
            <Button variant="contained" component={RouterLink} to="#" onClick={onCreateChat}>
              Chat Now
            </Button>
          ) : (
            ''
          )}
        </CardContent>
      </Card>

      {lostFoundItem.user.id === JSON.parse(localStorage.getItem('user')).id ? (
        <Stack>
          <Button
            variant="contained"
            component={Link}
            to="#"
            startIcon={<Icon icon={editFill} />}
            onClick={handleClickOpenEdit}
          >
            Edit Listing
          </Button>
          <Dialog open={editOpen} onClose={handleCloseEdit} fullWidth>
            <DialogTitle>Edit a Lost And Found Listing</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {' '}
                Please provide more details on the item that you have lost or found.{' '}
              </DialogContentText>
              <EditLostFoundForm listing={lostFoundItem} handleClose={handleCloseEdit} />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCloseEdit}>Close</Button>
            </DialogActions>
          </Dialog>
        </Stack>
      ) : (
        ''
      )}

      {lostFoundItem.user.id === JSON.parse(localStorage.getItem('user')).id ? (
        <Stack>
          <Button
            variant="contained"
            startIcon={<Icon icon={trashFill} />}
            style={{ backgroundColor: '#FF0000', color: '#FFFFFF' }}
            onClick={() => {
              setDeleteOpen(true);
            }}
          >
            Delete
          </Button>
          {/* : ''} */}
          {/* </Stack> */}
          <Dialog open={deleteOpen} onClose={handleCancel}>
            <DialogTitle>Confirm Delete?</DialogTitle>

            <DialogActions>
              {' '}
              <Button
                onClick={() => {
                  deleteLostFoundListing(lostFoundItem.id);
                  setDeleteOpen(false);
                }}
              >
                Yes
              </Button>
              <Button onClick={handleCancel}>No</Button>
            </DialogActions>
          </Dialog>{' '}
        </Stack>
      ) : (
        ''
      )}
    </SectionStyle>
  );
}
