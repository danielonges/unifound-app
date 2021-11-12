/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
    Stack,
    TextField,
    Button
} from '@mui/material';
import * as Yup from 'yup';
import AnnouncementContext from '../../../context/announcement/announcementContext';

export default function CreateAnnouncementForm({ handleClose }) {
    const navigate = useNavigate();
    const announcementContext = useContext(AnnouncementContext);
    const { createAnnouncement } = announcementContext;

    const createWhisperSchema = Yup.object().shape({
        announcementBody: Yup.string().required('Text is required')
    });

    const formik = useFormik({
        initialValues: {
            announcementBody: ''
        },
        validationSchema: createWhisperSchema,
        onSubmit: (value) => {
            createAnnouncement(value);
            handleClose();
        }
    });

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        required
                        label="Tell us something"
                        {...getFieldProps('announcementBody')}
                        error={Boolean(touched.announcementBody && errors.announcementBody)}
                        helperText={touched.announcementBody && errors.announcementBody}
                    />

                    <Button fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                        Post it!
                    </Button>
                </Stack>
            </Form>
        </FormikProvider>
    );
}