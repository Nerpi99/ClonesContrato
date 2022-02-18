import React from 'react'
import TokensCreated from '../../../models/TokensCreated/TokensCreated';
import SetFee from '../../../components/SetFee/SetFee'
import { Divider } from '@mui/material'
import SetCollector from '../../../components/SetCollector/SetCollector';

const Admin = () => {
    return (
        <div id="create-token">
            <TokensCreated />
            <Divider sx={{ height: '5px', width: '100%', marginBottom: '3rem' }} />
            <SetFee />
            <Divider sx={{ height: '5px', width: '100%', marginBottom: '3rem' }} />
            <SetCollector />
        </div>
    )
}
export default Admin