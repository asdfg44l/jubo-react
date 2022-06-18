import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const PatientList = ({ patientList, handleListClick }) => {

    function itemClick(patientInfo) {
        handleListClick(patientInfo)
    }

    return (
        <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center' }}>患者列表</h2>
            <Box sx={{ width: '100%', bgcolor: 'list', borderRadius: '5px' }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        {patientList.length > 0
                          ? patientList.map(item => (
                            <ListItem disablePadding key={item._id}>
                                <ListItemButton onClick={() => itemClick({ patientId: item._id, name: item.name })}>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                          ))
                          : "No Patient Data, Please run Seeder"
                        }
                    </List>
                </nav>
            </Box>
        </Box>
    )
}

export default PatientList