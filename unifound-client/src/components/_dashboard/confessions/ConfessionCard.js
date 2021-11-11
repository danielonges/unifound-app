/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { useContext, useState } from 'react'
import { DialogActions, DialogTitle, Card, Link, Typography, Stack, Button, Dialog, DialogContent, DialogContentText } from '@mui/material';
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trashFill from '@iconify/icons-eva/trash-2-fill';
import { styled } from '@mui/material/styles';
import AnnouncementContext from '../../../context/announcement/announcementContext';
import userContext from '../../../context/user/userContext';

ConfessionCard.propTypes = {
    post: PropTypes.object
};

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    color: theme.palette.primary.darker,
    backgroundColor: theme.palette.primary.lighter
}));

export default function ConfessionCard({ post }) {

    const { announcementTitle, announcementBody } = post;
    return (
        <RootStyle>
            <Stack spacing={2} sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    {announcementBody}
                    <Typography variant="subtitle1">
                        &nbsp;
                    </Typography>
                </Stack>
            </Stack>
        </RootStyle>
    );
}