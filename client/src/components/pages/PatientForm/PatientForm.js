import React, { useState } from 'react'
import { Formik, Field, Form, useField, FieldAttributes, FieldArray } from 'formik'
import {
    makeStyles,
    Paper, Divider, Grid,
    Typography, FormLabel,
    TextField, Button, Radio,
    FormControlLabel,
    Select, MenuItem,
    InputAdornment,
    FormGroup
} from '@material-ui/core'

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import * as yup from "yup";

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
    },
}));

const MyTextField = ({ placeholder, ...props }) => {
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''
    return (
        <TextField fullWidth placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} />
    )
}

const SexRadio = ({ label, ...props }) => {
    const [field] = useField(props); //props could be the name we want associated. clicking cmd + useField will tell us what props expects, either fieldattributes or a string
    return (
        <FormControlLabel {...field} control={< Radio color="primary" />} label={label} labelPlacement="bottom" />
        // ^{...field} formik handles all functions need to update fields
    )
}

const validationSchema = yup.object({
    aadhar: yup
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

const PatientForm = () => {
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
    const handleDateChange = (date) => setSelectedDate(date);

    return (
        <>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h3" align='center' gutterBottom> New Patient </Typography>
                    <Divider className={classes.divider} />
                    <Formik
                        initialValues={{ aadhar: '', firstName: '', lastName: '', sex: '', weight: '', dob: '', notes: [{ type: "allergy", name: "hay fever", id: "" + Math.random() }] }}
                        validationSchema={validationSchema}
                        onSubmit={(data, { setSubmitting }) => {
                            setSubmitting(true);
                            //^ then, make an async call
                            console.log("submit: ", data)
                            setSubmitting(false);
                            //may want to reset form here
                        }}>
                        {({ values, errors, isSubmitting }) => (
                            <Form>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <MyTextField placeholder='Aadhar' name='aadhar' type='input' as={TextField} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field placeholder='First name' name='firstName' type='input' fullWidth as={TextField} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field placeholder='Last name' name='lastName' type='input' fullWidth as={TextField} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormLabel fullWidth>Sex</FormLabel>
                                        <FormGroup row='true'>
                                            <SexRadio name="sex" type="radio" value="male" label="male" />
                                            <SexRadio name="sex" type="radio" value="female" label="female" />
                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Field name='weight' margin="normal" label="Weight" type="number"
                                            InputProps={{ startAdornment: <InputAdornment position="start">Kg</InputAdornment> }}
                                            InputLabelProps={{ shrink: true }}
                                            as={TextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Field name="dob" margin="normal" label="Birthday" type="date" defaultValue="2000-01-01" InputLabelProps={{ shrink: true }} as={TextField} />
                                    </Grid>
                                    <Grid item xs={12}>
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