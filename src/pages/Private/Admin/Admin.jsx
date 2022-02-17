import React from 'react'
import TokensCreated from '../../../models/TokensCreated/TokensCreated';
import SetFee from '../../../components/SetFee/SetFee'
import { Divider } from '@mui/material'

const Admin = () => {
    return (
        <div id="create-token">
            <TokensCreated />
            <Divider sx={{ height: '5px', width: '100%', marginBottom: '3rem' }} />
            <SetFee />
        </div>
    )
}

export default Admin