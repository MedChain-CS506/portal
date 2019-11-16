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
    aadhar: yup
        .string()
        .required()
        .min(12)
        .max(12),
    medicine: yup.array().of(
        yup.object({
            name: yup.string().required()
        })
    )
})

const AddPrescription = ({ signedIn = false, contract }) => {
    const classes = useStyles();
    const patientContext = useContext(PatientContext);

    const onSubmit = (data) => {
        let medicine = "";
        for (var med in data.medicine) {
            medicine = medicine + "-" + med ;
            for(var values in data.medicine[med]){
                if(values !== 'id'){
                   medicine = medicine + "-" + data.medicine[med][values];
                }
            }
        }
        medicine = medicine.substr(1);
        console.log(medicine);
        let dt = new Date();
        let utcDate = dt.toUTCString();
        console.log(utcDate);
        patientContext.addPrescription(contract, data.d_id, data.aadhar, data.disease, data.symptoms, medicine, utcDate);
    }

    if (!signedIn) return <Redirect to='/not-found' />

    return (
        <>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h3" align='center' gutterBottom> New Prescription </Typography>
                    <Divider className={classes.divider} />
                    <Formik
                        initialValues={{ aadhar: '', d_id: '', symptoms: '', disease: '', medicine: [{  name: "", quantity: "", id: "" + Math.random() }] }}
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
                                    <Grid id="aadhar" item xs={12}>
                                        <MyTextField placeholder='Aadhar' name='aadhar' type='input' as={TextField} />
                                    </Grid>
                                    <Grid id="d_id" item xs={12}>
                                        <MyTextField placeholder='Doctor ID' name='d_id' type='input' as={TextField} />
                                    </Grid>
                                    <Grid id="symptoms" item xs={12}>
                                        <MyTextField placeholder='Symptoms' name='symptoms' type='input' as={TextField} />
                                    </Grid>
                                    <Grid id="disease" item xs={12}>
                                        <MyTextField placeholder='Disease' name='disease' type='input' as={TextField} />
                                    </Grid>
                                    <Grid id="medicine" item xs={12}>
                                        <FieldArray name="medicine">
                                            {arrayHelpers => (
                                                <div>
                                                    <Button
                                                        onClick={() =>
                                                            arrayHelpers.push({
                                                                name: "",
                                                                quantity: "",
                                                                id: "" + Math.random()
                                                            })
                                                        }
                                                        variant="contained"
                                                    >
                                                        add medicine
                                                    </Button>
                                                    {values.medicine.map((note, index) => {
                                                        return (
                                                            <div key={note.id}>
                                                                <MyTextField placeholder="Medicine Name" name={`medicine.${index}.name`} />
                                                                <MyTextField placeholder="Medicine Quantity" name={`medicine.${index}.quantity`} />
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

export default AddPrescription