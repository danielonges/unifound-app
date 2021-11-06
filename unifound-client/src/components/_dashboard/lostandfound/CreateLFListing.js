/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import {
    Stack,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    Autocomplete,
    Button
} from '@mui/material';
import nuslocation from '../../../_mocks_/nuslocation';
import UserContext from '../../../context/user/userContext';
import LostAndFoundContext from '../../../context/lostAndFound/lostAndFoundContext';
// ----------------------------------------------------------------------

export default function CreateLostFoundForm({ handleClose }) {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const { user } = userContext;
    const lostAndFoundContext = useContext(LostAndFoundContext);

    const { createLostFoundListing } = lostAndFoundContext;

    //   const RegisterSchema = Yup.object().shape({
    //     gender: Yup.string().required('Gender is required'),
    //     groupsize: Yup.number().integer().required('Group Size is required')
    //   });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            location: '',
            comments: '',
            type: ''
        },
        // validationSchema: RegisterSchema,
        onSubmit: (value) => {
            console.log(value);
            createLostFoundListing(value, user);
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
                        label="Name"
                        {...getFieldProps('name')}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                    />

                    <TextField
                        fullWidth
                        label="Description"
                        {...getFieldProps('description')}
                        error={Boolean(touched.description && errors.description)}
                        helperText={touched.description && errors.description}
                    />

                    <Autocomplete
                        {...getFieldProps}
                        disablePortal
                        id="location"
                        options={nuslocation}
                        sx={{ width: 300 }}
                        required
                        onChange={(e, value) => setFieldValue('location', value)}
                        renderInput={(params) => <TextField {...params} required label="Location" />}
                    />

                    <TextField
                        fullWidth
                        label="Comments"
                        {...getFieldProps('comments')}
                        error={Boolean(touched.comments && errors.comments)}
                        helperText={touched.comments && errors.comments}
                    />

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Type</FormLabel>
                        <RadioGroup row aria-label="type" name="type" required {...getFieldProps('type')}>
                            <FormControlLabel value="lost" control={<Radio />} label="Lost" />
                            <FormControlLabel value="found" control={<Radio />} label="Found" />
                        </RadioGroup>
                    </FormControl>

                    <Button fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                        Create Lost And Found Listing
                    </Button>
                </Stack>
            </Form>
        </FormikProvider>
    );
}