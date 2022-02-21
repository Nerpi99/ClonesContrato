import * as React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { useNetwork } from '../../../context/NetworkContext';
import { Skeleton } from '@mui/material';

const RequireAdminAuth = () => {
    const [loading, setLoading] = React.useState(true)
    const { currentAccount } = useUser();
    const { adminAddress } = useNetwork();
    const location = useLocation();
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, [300])
    }, [])
    if (loading) {
        return <div id="loading">
            <Skeleton animation="wave" width={'70%'} height={35} />
            <Skeleton animation="wave" width={'70%'} height={35} />
            <Skeleton animation="wave" width={'70%'} height={35} />
        </div>
    } else {
        if (currentAccount.toLowerCase() === adminAddress.toLowerCase()) {
            return <Outlet />
        } else {
            return <Navigate to="/" state={{ from: location }} replace />
        }
    }
}

export default RequireAdminAuth