/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import trashFill from '@iconify/icons-eva/trash-2-fill';
import lostAndFoundContext from '../../../context/lostAndFound/lostAndFoundContext';
// import ColorPreview from '../../ColorPreview';

// ----------------------------------------------------------------------

// const ProductImgStyle = styled('img')({
//   top: 0,
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   position: 'absolute'
// });

// ----------------------------------------------------------------------

// ShopProductCard.propTypes = {
//   product: PropTypes.object
// };

export default function LostFoundCard({ lostFoundItem }) {
  const lostFoundContext = useContext(lostAndFoundContext);
  const { deleteLostFoundListing } = lostFoundContext;

  const { id, name, description } = lostFoundItem;
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* <Label
          variant="filled"
          color="info"
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: 'absolute',
            textTransform: 'uppercase'
          }}
        /> */}
        IMAGE
        {/* <ProductImgStyle alt={name} src={cover} /> */}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          to={{ pathname: '/dashboard/viewlostfound/' + id }}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography variant="subtitle2" noWrap>
            {name}
            {/* </Link> */}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          {description}
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
              {/* {priceSale && fCurrency(priceSale)} */}
            </Typography>
            &nbsp;
            {/* {fCurrency(price)} */}
          </Typography>
        </Stack>
        <Stack>
          <Button
            variant="contained"
            color="error"
            startIcon={<Icon icon={trashFill} />}
            onClick={() => deleteLostFoundListing(lostFoundItem.id)}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
