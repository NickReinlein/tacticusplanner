﻿import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import LegendIcon from '@mui/icons-material/LegendToggle';
import TargetIcon from '@mui/icons-material/TrackChanges';

import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Home } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { getUserData } from './hooks/get-user-data';

const MobileApp = () => {
    const [value, setValue] = React.useState(1);

    getUserData();

    return (
        <Box sx={{ margin: 'auto', padding: 1, paddingBottom: 7, }}>
            <Outlet/>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, margin: 'auto' }}
                elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction component={Link} to={'./wyo'} label="Characters"
                        icon={<ListIcon/>}/>
                    <BottomNavigationAction component={Link} to={'./'} label="Home" icon={<Home/>}/>
                    <BottomNavigationAction component={Link} to={'./goals'} label="Goals"
                        icon={<TargetIcon />}/>
                    <BottomNavigationAction component={Link} to={'./le'} label="Events"
                        icon={<LegendIcon />}/>
                </BottomNavigation>
            </Paper>
        </Box>
    );
};

export default MobileApp;