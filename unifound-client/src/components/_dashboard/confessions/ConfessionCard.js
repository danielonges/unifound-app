/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { useContext, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Card, Typography, Stack, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import heartFill from '@iconify/icons-eva/heart-fill';
import { styled } from '@mui/material/styles';
import AnnouncementContext from '../../../context/announcement/announcementContext';
import userContext from '../../../context/user/userContext';

ConfessionCard.propTypes = {
    post: PropTypes.object
};

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(0, 0),
    color: theme.palette.primary.darker,
    backgroundColor: theme.palette.primary.lighter
}));

export default function ConfessionCard({ post }) {

    // const announcementContext = useContext(AnnouncementContext);
    // const { likeAnnouncement, getAnnouncement } = announcementContext;
    const { announcementBody, likesCount } = post;

    // const handleLike = () => {
    //     likeAnnouncement(announcementContext.announcement.id, localStorage.getItem('user'));
    //     // getAnnouncement(post.id);
    // };

    return (
        <RootStyle>
            <Stack spacing={2} sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    {announcementBody}
                    <Typography variant="subtitle1">
                        &nbsp;
                    </Typography>
                </Stack>
                {/* <Stack>
                    <Button variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Icon icon={heartFill} />}
                        onClick={handleLike}>
                        Like
                    </Button>
                </Stack>
                <Stack>
                    {likesCount} like(s)
                </Stack> */}
            </Stack>
        </RootStyle>
    );
}