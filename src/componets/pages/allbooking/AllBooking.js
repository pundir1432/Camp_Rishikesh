import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs, Table, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getEventBooking } from '../../redux/event/thunk';
import { getGroundBooking } from '../../redux/ground/thunk';
import { getUserFromSession } from '../../helper/api/apiCore';
import { DataLoading } from '../../helper/loading/Loaders';

const AllBooking = () => {
    const [activeTab, setActiveTab] = useState('ground');
    const { ground, loading, error } = useSelector((state) => state.ground)
    const event = useSelector((state) => state.event)
    const eventLoading = useSelector((state) => state.event?.loading)
    const dispatch = useDispatch();
    const user = getUserFromSession()
    useEffect(() => {
        dispatch(getEventBooking(user?.id))
        dispatch(getGroundBooking(user?.id))
    }, [dispatch, activeTab])
    return (
        <div className="pt-5 mt-4">
            <Container>
                <Row>
                    <Col>
                        <h2 className="fw-bold mb-4">My Bookings</h2>

                        <Tabs
                            activeKey={activeTab}
                            onSelect={(k) => setActiveTab(k)}
                            className="mb-4"
                        >
                            <Tab eventKey="ground" title="Ground Bookings">
                                <Table responsive striped hover>
                                    <thead className="table-success">
                                        <tr>
                                            <th>ID</th>
                                            <th>Ground Name</th>
                                            <th>Check-in</th>
                                            <th>Check-out</th>
                                            <th>Guests</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="7" className="text-center py-4">
                                                    <DataLoading />
                                                </td>
                                            </tr>
                                        ) : ground?.data?.length > 0 ? ground?.data?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.groundName}</td>
                                                <td>{item?.checkIn}</td>
                                                <td>{item?.checkOut}</td>
                                                <td>{item?.guests}</td>
                                                <td>₹ {item?.totalAmount}</td>
                                                <td>
                                                    {item.status === 'confirmed' ? (
                                                        <Badge bg="success">Confirmed</Badge>
                                                    ) : item.status === 'pending' ? (
                                                        <Badge bg="warning text-dark">Pending</Badge>
                                                    ) : (
                                                        <Badge bg="danger">Cancelled</Badge>
                                                    )}
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="7" className="text-center text-muted py-4">
                                                    No ground bookings found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Tab>

                            <Tab eventKey="event" title="Event Bookings">
                                <Table responsive striped hover>
                                    <thead className="table-success">
                                        <tr>
                                            <th>ID</th>
                                            <th>Event Name</th>
                                            <th>Date</th>
                                            <th>Type</th>
                                            <th>Persons</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eventLoading ? (
                                            <tr>
                                                <td colSpan="7" className="text-center py-4">
                                                    <DataLoading />
                                                </td>
                                            </tr>
                                        ) : event?.event?.data?.length > 0 ? event?.event?.data?.map((item, index) => (
                                            <tr key={index}
                                                className={item.status === 'cancelled' ? 'bg-danger text-white' : ''}
                                                style={{ opacity: item.status === 'cancelled' ? 0.6 : 1, pointerEvents: item.status === 'cancelled' ? 'none' : 'auto' }}
                                            >
                                                <td>{index + 1}</td>
                                                <td>{item.eventName}</td>
                                                <td>{new Date(item?.eventDate).toLocaleDateString()}</td>
                                                <td>{item?.personType}</td>
                                                <td>{item?.person}</td>
                                                <td>₹ {item?.eventPrice}</td>
                                                <td disabled={item.status === 'cancelled'} className={`item.status === 'cancelled' ? 'bg-danger' : ''`}>
                                                    {item.status === 'confirmed' ? (
                                                        <Badge bg="success">Confirmed</Badge>
                                                    ) : item.status === 'pending' ? (
                                                        <Badge bg="warning text-dark">Pending</Badge>
                                                    ) : (
                                                        <Badge bg="danger">Cancelled</Badge>
                                                    )}
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="7" className="text-center text-muted py-4">
                                                    No event bookings found
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </Table>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default AllBooking