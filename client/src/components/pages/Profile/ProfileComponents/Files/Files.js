import React, { useState, useEffect } from 'react';
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

const ipfsClient = require('ipfs-http-client');

const ipfs = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
}); // leaving out the arguments will default to these values

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

function createData(files, ipfsHash, timestamp, tags) {
  return { files, ipfsHash, timestamp, tags };
}

const rows = [
  createData('File 1', 12345, '13:00', 'Some tag'),
  createData('File 2', 12346, '15:30', 'Some tag'),
];

export default function Files({ onNewFileClick }) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [fileHash, setFileHash] = useState(
    'QmWUCkDdcgEVYDntYP6kDGeMvgiQtjuyKJWjHAzJowMXuv'
  );
  const [contract, setContract] = useState(null);
  const [buffer, setBuffer] = useState(null);
  const [fileHashUpdated, setFileHashUpdated] = useState(true);
  const [ready, setReady] = useState(false);

  const captureFile = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    //! ^ This line above will allow us to convert the file into a buffer
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
      console.log('buffer', buffer);
    };
  };

  useEffect(() => {}, [fileHash]);

  // example hash: QmWUCkDdcgEVYDntYP6kDGeMvgiQtjuyKJWjHAzJowMXuv
  // example url: https://ipfs.infura.io/ipfs/QmWUCkDdcgEVYDntYP6kDGeMvgiQtjuyKJWjHAzJowMXuv
  const onSubmit = event => {
    event.preventDefault();
    console.log('Submitting file to ipfs...');

    ipfs.add(buffer, (error, result) => {
      console.log('Ipfs result', result);
      const _fileHash = result[0].hash;

      if (error) {
        console.error(error);
        return;
      }
      //! Now store it (uploads filehash into contract)
      setFileHash(_fileHash);
      console.log(fileHash);
    });
  };

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

      {/* <div className={classes.root}>
        <main className={classes.content}>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src={`https://ipfs.infura.io/ipfs/${fileHash}`} />
          </a>
          <form onSubmit={onSubmit}>
            <input type="file" onChange={captureFile} />
            <input type="submit" />
          </form>
        </main>
      </div> */}
      <Table stickyHeader className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>File(s)</TableCell>
            <TableCell align="right">IPFS Hash</TableCell>
            <TableCell align="right">Timestamp</TableCell>
            <TableCell align="right">Tag(s)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.files}>
              <TableCell component="th" scope="row">
                {row.files}
              </TableCell>
              <TableCell align="right">{row.ipfsHash}</TableCell>
              <TableCell align="right">{row.timestamp}</TableCell>
              <TableCell align="right">{row.tags}</TableCell>
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
