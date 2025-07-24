// @flow
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loading } from './loading/Loading';

const loading = () => <div className="fw-bold text-muted fs-4"><Loading /></div>;
const DefaultLayout = (props) => {

    return (
        <Suspense fallback={loading()}>
            <Outlet />
        </Suspense>
    );
};
export default DefaultLayout;
