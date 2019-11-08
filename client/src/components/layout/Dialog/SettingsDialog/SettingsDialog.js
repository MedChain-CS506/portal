import React, { useState } from 'react';

import PropTypes from 'prop-types';

import SwipeableViews from 'react-swipeable-views';

//* MUI
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Hidden from '@material-ui/core/Hidden';
import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SecurityIcon from '@material-ui/icons/Security';

//* tabs
import AccountTab from './tabs/AccountTab';
import SecurityTab from './tabs/SecurityTab';

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  tabs: {
    display: 'initial',
  },
}));

const tabs = [
  {
    key: 'account',
    icon: <AccountCircleIcon />,
    label: 'Account',
  },

  {
    key: 'security',
    icon: <SecurityIcon />,
    label: 'Security',
  },
];

const SettingsDialog = ({
  dialogProps,
  user,
  userData,
  openSnackbar,
  onDeleteAccountClick,
}) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Dialog {...dialogProps}>
      <DialogTitle disableTypography>
        <Typography variant="h6">Settings</Typography>

        <Tooltip title="Close">
          <IconButton
            className={classes.closeButton}
            onClick={dialogProps.onClose}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </DialogTitle>

      <Hidden xsDown>
        <Tabs
          classes={{ root: classes.tabs }}
          style={{ overflow: 'initial', minHeight: 'initial' }}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={(event, value) => setSelectedTab(value)}
        >
          {tabs.map(tab => (
            <Tab key={tab.key} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Hidden>

      <Hidden smUp>
        <Tabs
          classes={{ root: classes.tabs }}
          style={{ overflow: 'initial', minHeight: 'initial' }}
          indicatorColor="primary"
          scrollButtons="off"
          textColor="primary"
          variant="scrollable"
          onChange={(event, value) => setSelectedTab(value)}
        >
          {tabs.map(tab => (
            <Tab key={tab.key} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Hidden>

      <SwipeableViews
        index={selectedTab}
        onChangeIndex={index => setSelectedTab(index)}
      >
        <AccountTab
          user={user}
          userData={userData}
          openSnackbar={openSnackbar}
        />

        <SecurityTab
          user={user}
          userData={userData}
          openSnackbar={openSnackbar}
          onDeleteAccountClick={onDeleteAccountClick}
        />
      </SwipeableViews>
    </Dialog>
  );
};

SettingsDialog.propTypes = {
  dialogProps: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  onDeleteAccountClick: PropTypes.func.isRequired,
};

export default SettingsDialog;
