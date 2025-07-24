import React from 'react';
import { Spinner } from 'react-bootstrap';
import { InfinitySpin, RotatingLines, ThreeDots } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <InfinitySpin
                visible={true}
                width="200"
                color="#4fa94d"
                ariaLabel="infinity-spin-loading"
            />
        </div>
    );
};

const Chatloading = () => {
    return (
        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <InfinitySpin
                visible={true}
                width="200"
                color="#4fa94d"
                ariaLabel="infinity-spin-loading"
            />
        </div>
    );
};

const TableLoading = () => {
    return (
        <div style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="4"
                animationDuration="0.75"
                width="92"
                visible={true}
            />
        </div>
    );
};

const ButtonLoading = () => {
    return (
        <div className=" d-flex justify-content-center align-items-center mx-auto">
            <Spinner animation="border" role="status" style={{ height: '1.3rem', width: '1.3rem' }}>
            </Spinner>
        </div>
    );
};

const NotificationLoading = () => {
    return (
        <div style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ThreeDots
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

const PaymentLoading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ThreeDots
                visible={true}
                height="100"
                width="100"
                color="rgba(74, 118, 82, 1)"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

const BidHistoryLoading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'start' }}>
            <ThreeDots
                visible={true}
                height="50"
                width="50"
                color="rgba(74, 118, 82, 1)"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

const AllChatLoadings = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'start' }}>
            <ThreeDots
                visible={true}
                height="50"
                width="50"
                color="rgba(74, 118, 82, 1)"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export { Loading,BidHistoryLoading,AllChatLoadings, Chatloading,ButtonLoading, TableLoading, NotificationLoading, PaymentLoading };
