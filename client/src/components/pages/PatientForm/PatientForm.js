/* eslint-disable */
import React, { useContext } from 'react';
import { Formik, Field, Form, useField, FieldArray } from 'formik';
import {
    makeStyles, Paper, Divider, Grid, Typography, FormLabel, TextField,
    Button, Radio, FormControlLabel, Select, MenuItem, InputAdornment, FormGroup
} from '@material-ui/core';

import { Redirect } from 'react-router-dom';

import 'date-fns';
import * as yup from "yup";
import PatientContext from '../../../context/patient/PatientContext';

const useStyles = makeStyles(theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },

    divider: {
        marginBottom: theme.spacing(3)
    },

    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    }
}));

const MyTextField = ({ placeholder, ...props }) => {
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''
    return (
        <TextField fullWidth placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} />
    )
}

const SexRadio = ({ label, ...props }) => {
    const [field] = useField(props)
    return (
        <FormControlLabel {...field} control={< Radio color="primary" />} label={label} labelPlacement="bottom" />
    )
}

const validationSchema = yup.object({
    aadhaar: yup
        .string()
        .required()
        .min(12)
        .max(12),
    firstName: yup
        .string()
        .required(),
    lastName: yup
        .string()
        .required(),
    notes: yup.array().of(
        yup.object({
            name: yup.string().required()
        })
    )
})

const PatientForm = ({ signedIn = false, contract }) => {
    const classes = useStyles();
    const patientContext = useContext(PatientContext);

    const onSubmit = (data) => {
        let fullName = data.firstName + " " + data.lastName;
        patientContext.addPatient(contract, data.aadhaar, fullName, data.dob, data.weight, data.sex, "a");
    }

    return (
        <>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h3" align='center' gutterBottom> New Patient </Typography>
                    <Divider className={classes.divider} />
                    <Formik
                        initialValues={{ aadhaar: '', firstName: '', lastName: '', sex: '', weight: '', dob: '', notes: [{ type: "allergy", name: "hay fever", id: "" + Math.random() }] }}
                        validationSchema={validationSchema}
                        onSubmit={(data, { setSubmitting }) => {
                            setSubmitting(true);

                            console.log("submit: ", data);
                            onSubmit(data);
                            setSubmitting(false);
                            //may want to reset form here
                        }}>
                        {({ values, errors, isSubmitting }) => (
                            <Form id="patient-form">
                                <Grid container spacing={3}>
                                    <Grid id="aadhaar" item xs={12}>
                                        <MyTextField placeholder='Aadhaar' name='aadhaar' type='input' as={TextField} />
                                    </Grid>
                                    <Grid id="first-name" item xs={12} sm={6}>
                                        <Field placeholder='First name' name='firstName' type='input' fullWidth as={TextField} />
                                    </Grid>
                                    <Grid id="last-name" item xs={12} sm={6}>
                                        <Field placeholder='Last name' name='lastName' type='input' fullWidth as={TextField} />
                                    </Grid>
                                    <Grid id="sex" item xs={12} md={4}>
                                        <FormLabel fullWidth>Sex</FormLabel>
                                        <FormGroup id="sex-choices" row='true'>
                                            <SexRadio name="sex" type="radio" value="male" label="male" />
                                            <SexRadio name="sex" type="radio" value="female" label="female" />
                                        </FormGroup>
                                    </Grid>
                                    <Grid id="weight" item xs={12} md={4}>
                                        <Field name='weight' margin="normal" label="Weight" type="number"
                                            InputProps={{ startAdornment: <InputAdornment position="start">Kg</InputAdornment> }}
                                            InputLabelProps={{ shrink: true }}
                                            as={TextField}
                                        />
                                    </Grid>
                                    <Grid id="date-of-birth" item xs={12} md={4}>
                                        <Field name="dob" margin="normal" label="Birthday" type="date" defaultValue="2000-01-01" InputLabelProps={{ shrink: true }} as={TextField} />
                                    </Grid>
                                    <Grid id="notes" item xs={12}>
                                        <FieldArray name="notes">
                                            {arrayHelpers => (
                                                <div>
                                                    <Button
                                                        onClick={() =>
                                                            arrayHelpers.push({
                                                                type: "allergy",
                                                                name: "",
                                                                id: "" + Math.random()
                                                            })
                                                        }
                                                        variant="contained"
                                                    >
                                                        add note
                                                    </Button>
                                                    {values.notes.map((note, index) => {
                                                        return (
                                                            <div key={note.id}>
                                                                <MyTextField placeholder="New Note" name={`notes.${index}.name`} />
                                                                <Field name={`notes.${index}.type`} type="select" as={Select} >
                                                                    <MenuItem value="allergy">Allergy</MenuItem>
                                                                    <MenuItem value="disease">Disease</MenuItem>
                                                                </Field>
                                                                <Button className={classes.button} onClick={() => arrayHelpers.remove(index)}> x </Button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </FieldArray>
                                    </Grid>
                                    <>
                                        <Button className={classes.button} disabled={isSubmitting} type="submit" variant="contained">Submit</Button>
                                    </>
                                </Grid>
                                <pre>{JSON.stringify(values, null, 2)}</pre>
                                <pre>{JSON.stringify(errors, null, 2)}</pre>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </main>
        </>
    )
}

export default PatientForm