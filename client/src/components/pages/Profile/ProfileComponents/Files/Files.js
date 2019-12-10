import React, { useState, useEffect,useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import AddIcon from '@material-ui/icons/Add';
import PatientContext from '../../../../../context/patient/PatientContext';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  rootNav: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  fixedHeight: {
    height: 240,
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
  table: {
    maxHeight: 440,
    overflow: 'auto',
  },
}));

function createData(fileLinkHash, timestamp) {
  return { fileLinkHash, timestamp };
}

const rows = [createData('File 1', '13:00'), createData('File 2', '15:30')];

export default function Files({ onNewFileClick, aadhaar }) {
  const classes = useStyles();
  const patientContext = useContext(PatientContext);
  patientContext.setAadhaarState(aadhaar);

  return (
    <>
      <Toolbar>
        <Typography component="h2" variant="h5" color="primary" gutterBottom>
          Files
        </Typography>
        <span className={classes.toolbarButtons}>
          <Tooltip title="Add">
            <IconButton onClick={onNewFileClick}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </span>
      </Toolbar>

      <Table stickyHeader className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>File Link Hash</TableCell>
            <TableCell align="right">Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.fileLinkHash}>
              <TableCell component="th" scope="row">
                {row.fileLinkHash}
              </TableCell>
              <TableCell align="right">{row.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

Files.propTypes = {
  onNewFileClick: PropTypes.func.isRequired,
};
