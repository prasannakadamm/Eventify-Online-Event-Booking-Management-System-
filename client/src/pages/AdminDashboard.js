import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import EventContext from '../context/EventContext';
import MainLayout from '../layouts/MainLayout';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import {
    BiPlus, BiTrash, BiCalendar, BiMap, BiTime, BiChair, BiUser, BiReceipt,
    BiStar, BiBell, BiCreditCard, BiCategory, BiBuilding, BiHeart, BiTag,
    BiSupport, BiHistory, BiCog, BiDotsVerticalRounded
} from 'react-icons/bi';
import apiClient from '../services/apiClient';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const { events, fetchEvents, createEvent, deleteEvent } = useContext(EventContext);

    const [activeTab, setActiveTab] = useState('events');
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [payments, setPayments] = useState([]);
    const [categories, setCategories] = useState([]);
    const [venues, setVenues] = useState([]);
    const [wishlists, setWishlists] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [logs, setLogs] = useState([]);
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [formLoading, setFormLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Movies',
        date: '',
        venue: '',
        image: '',
        showTime: ''
    });

    // Ticket Categories State
    const [ticketCategories, setTicketCategories] = useState([
        { name: 'Standard', price: '', totalSeats: '' }
    ]);

    useEffect(() => {
        fetchEvents();
        fetchUsers();
        fetchBookings();
        fetchReviews();
        fetchPayments();
        fetchCategories();
        fetchVenues();
        fetchWishlists();
        fetchCoupons();
        fetchTickets();
        fetchLogs();
        fetchSettings();
        // eslint-disable-next-line
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await apiClient.get('/users');
            setUsers(res.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]); // Fallback to empty array
        }
    };

    const fetchBookings = async () => {
        try {
            const res = await apiClient.get('/bookings');
            setBookings(res.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setBookings([]);
        }
    };

    const fetchReviews = async () => {
        try {
            const res = await apiClient.get('/reviews');
            setReviews(res.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setReviews([]);
        }
    };

    const fetchPayments = async () => {
        try {
            const res = await apiClient.get('/payments');
            setPayments(res.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
            setPayments([]);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await apiClient.get('/categories');
            setCategories(res.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]);
        }
    };

    const fetchVenues = async () => {
        try {
            const res = await apiClient.get('/venues');
            setVenues(res.data);
        } catch (error) {
            console.error('Error fetching venues:', error);
            setVenues([]);
        }
    };

    const fetchWishlists = async () => {
        try {
            const res = await apiClient.get('/wishlist');
            setWishlists(res.data);
        } catch (error) {
            console.error('Error fetching wishlists:', error);
            setWishlists([]);
        }
    };

    const fetchCoupons = async () => {
        try {
            const res = await apiClient.get('/coupons');
            setCoupons(res.data);
        } catch (error) {
            console.error('Error fetching coupons:', error);
            setCoupons([]);
        }
    };

    const fetchTickets = async () => {
        try {
            const res = await apiClient.get('/tickets');
            setTickets(res.data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
            setTickets([]);
        }
    };

    const fetchLogs = async () => {
        try {
            const res = await apiClient.get('/logs');
            setLogs(res.data);
        } catch (error) {
            console.error('Error fetching logs:', error);
            setLogs([]);
        }
    };

    const fetchSettings = async () => {
        try {
            const res = await apiClient.get('/settings');
            setSettings(res.data);
        } catch (error) {
            console.error('Error fetching settings:', error);
            setSettings([]);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Category Changes
    const handleCategoryChange = (index, field, value) => {
        const updatedCategories = [...ticketCategories];
        updatedCategories[index][field] = value;
        setTicketCategories(updatedCategories);
    };

    const addCategory = () => {
        setTicketCategories([...ticketCategories, { name: '', price: '', totalSeats: '' }]);
    };

    const removeCategory = (index) => {
        if (ticketCategories.length > 1) {
            const updatedCategories = ticketCategories.filter((_, i) => i !== index);
            setTicketCategories(updatedCategories);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);

        const validCategories = ticketCategories.map(cat => ({
            name: cat.name,
            price: Number(cat.price),
            totalSeats: Number(cat.totalSeats)
        }));

        if (validCategories.some(c => !c.name || !c.price || !c.totalSeats)) {
            alert('Please fill out all ticket category fields.');
            setFormLoading(false);
            return;
        }

        const payload = { ...formData, ticketCategories: validCategories };

        try {
            await createEvent(payload, user.token);
            setShowModal(false);
            setFormData({ title: '', description: '', category: 'Movies', date: '', venue: '', image: '', showTime: '' });
            setTicketCategories([{ name: 'Standard', price: '', totalSeats: '' }]);
            alert('Event created successfully!');
        } catch (error) {
            alert(error.response?.data?.message || 'Error creating event');
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
            try {
                await deleteEvent(id, user.token);
            } catch (error) {
                console.error(error);
                alert('Failed to delete event');
            }
        }
    };

    const getTotalCapacity = (event) => event.ticketCategories?.reduce((acc, cat) => acc + cat.totalSeats, 0) || event.totalSeats || 0;
    const getStartPrice = (event) => event.ticketCategories?.length > 0 ? Math.min(...event.ticketCategories.map(c => c.price)) : (event.price || 0);

    return (
        <MainLayout>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    <p className="text-secondary-400 mt-1">Manage events, users, and bookings</p>
                </div>
                {activeTab === 'events' && (
                    <Button variant="primary" className="flex items-center gap-2" onClick={() => setShowModal(true)}>
                        <BiPlus size={20} /> Create New Event
                    </Button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-secondary-800 pb-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {[
                    { id: 'events', label: 'Events', icon: <BiCalendar /> },
                    { id: 'users', label: 'Users', icon: <BiUser /> },
                    { id: 'bookings', label: 'Bookings', icon: <BiReceipt /> },
                    { id: 'reviews', label: 'Reviews', icon: <BiStar /> },
                    { id: 'payments', label: 'Payments', icon: <BiCreditCard /> },
                    { id: 'categories', label: 'Categories', icon: <BiCategory /> },
                    { id: 'venues', label: 'Venues', icon: <BiBuilding /> },
                    { id: 'coupons', label: 'Coupons', icon: <BiTag /> },
                    { id: 'tickets', label: 'Tickets', icon: <BiSupport /> },
                    { id: 'logs', label: 'Logs', icon: <BiHistory /> },
                    { id: 'wishlist', label: 'Wishlist', icon: <BiHeart /> },
                    { id: 'notifications', label: 'Notifications', icon: <BiBell /> },
                    { id: 'settings', label: 'Settings', icon: <BiCog /> }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 ${activeTab === tab.id ? 'border-primary-500 text-primary-500' : 'border-transparent text-secondary-500 hover:text-white'}`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            <div className="bg-secondary-900 border border-secondary-800 rounded-xl overflow-hidden shadow-xl">

                {/* EVENTS TABLE */}
                {activeTab === 'events' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-secondary-800">
                            <thead className="bg-secondary-950">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Event Details</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Date & Venue</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Capacity</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-secondary-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary-800">
                                {events && events.length > 0 ? (
                                    events.map(event => (
                                        <tr key={event._id} className="hover:bg-secondary-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="h-12 w-10 flex-shrink-0 rounded bg-secondary-800 overflow-hidden">
                                                        <img className="h-full w-full object-cover" src={event.image || 'https://via.placeholder.com/150'} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-white">{event.title}</div>
                                                        <div className="text-xs text-secondary-500">{event.category}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-secondary-300 flex items-center gap-1"><BiCalendar /> {new Date(event.date).toLocaleDateString()}</div>
                                                <div className="text-xs text-secondary-500 flex items-center gap-1 mt-1"><BiMap /> {event.venue?.split(':')[0]}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-secondary-300">
                                                <div className="flex items-center gap-1"><BiChair /> {getTotalCapacity(event)} Seats</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-primary-400 font-bold">₹{getStartPrice(event)}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleDelete(event._id)} className="text-red-500 hover:text-red-400 bg-red-500/10 p-2 rounded-lg transition">
                                                    <BiTrash size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-secondary-500">
                                            No events found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* USERS TABLE */}
                {activeTab === 'users' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-secondary-800">
                            <thead className="bg-secondary-950">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary-800">
                                {users && users.length > 0 ? (
                                    users.map(u => (
                                        <tr key={u._id} className="hover:bg-secondary-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-secondary-800 flex items-center justify-center text-primary-500 font-bold">
                                                        {u.name ? u.name.charAt(0).toUpperCase() : <BiUser />}
                                                    </div>
                                                    <span className="text-sm font-medium text-white">{u.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-secondary-300">{u.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs font-bold rounded ${u.role === 'admin' ? 'bg-primary-900/50 text-primary-400 border border-primary-500/30' : 'bg-secondary-800 text-secondary-400'}`}>
                                                    {u.role === 'admin' ? 'Admin' : 'User'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-secondary-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-secondary-500">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* BOOKINGS TABLE */}
                {activeTab === 'bookings' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-secondary-800">
                            <thead className="bg-secondary-950">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Booking ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Event</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary-800">
                                {bookings && bookings.length > 0 ? (
                                    bookings.map(b => (
                                        <tr key={b._id} className="hover:bg-secondary-800/50 transition-colors">
                                            <td className="px-6 py-4 text-xs font-mono text-secondary-500">#{b._id.slice(-6).toUpperCase()}</td>
                                            <td className="px-6 py-4 text-sm text-white">{b.user?.name || 'Unknown'}</td>
                                            <td className="px-6 py-4 text-sm text-secondary-300">{b.event?.title || 'Deleted Event'}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-green-400">₹{b.totalAmount}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 text-xs font-bold rounded bg-green-900/30 text-green-400 border border-green-500/30">Confirmed</span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="5" className="px-6 py-8 text-center text-secondary-500">No bookings found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* REVIEWS TABLE */}
                {activeTab === 'reviews' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-secondary-800">
                            <thead className="bg-secondary-950">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Event</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Rating</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Comment</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary-800">
                                {reviews.map(r => (
                                    <tr key={r._id} className="hover:bg-secondary-800/50">
                                        <td className="px-6 py-4 text-sm text-white">{r.user?.name}</td>
                                        <td className="px-6 py-4 text-sm text-secondary-300">{r.event?.title}</td>
                                        <td className="px-6 py-4 text-sm text-yellow-500 font-bold">{r.rating}/5</td>
                                        <td className="px-6 py-4 text-sm text-secondary-400 italic">"{r.comment}"</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* PAYMENTS TABLE */}
                {activeTab === 'payments' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-secondary-800">
                            <thead className="bg-secondary-950">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Txn ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary-800">
                                {payments.map(p => (
                                    <tr key={p._id} className="hover:bg-secondary-800/50">
                                        <td className="px-6 py-4 text-xs font-mono text-secondary-500">{p.transactionId}</td>
                                        <td className="px-6 py-4 text-sm text-white">{p.user?.name}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-green-400">₹{p.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-bold rounded ${p.status === 'completed' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                                                {p.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* CATEGORIES TABLE */}
                {activeTab === 'categories' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-secondary-800">
                            <thead className="bg-secondary-950">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Category Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Icon</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary-800">
                                {categories.map(c => (
                                    <tr key={c._id} className="hover:bg-secondary-800/50">
                                        <td className="px-6 py-4 text-sm font-bold text-white">{c.name}</td>
                                        <td className="px-6 py-4 text-sm text-secondary-500"><BiCategory className="inline mr-2" /> {c.icon}</td>
                                        <td className="px-6 py-4 text-sm text-secondary-400">{c.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* VENUES TABLE */}
                {activeTab === 'venues' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-secondary-800">
                            <thead className="bg-secondary-950">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Venue Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">City</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Capacity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary-800">
                                {venues.map(v => (
                                    <tr key={v._id} className="hover:bg-secondary-800/50">
                                        <td className="px-6 py-4 text-sm font-bold text-white">{v.name}</td>
                                        <td className="px-6 py-4 text-sm text-secondary-300">{v.city}</td>
                                        <td className="px-6 py-4 text-sm text-secondary-400">{v.capacity} Seats</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* LOGS TABLE */}
                {activeTab === 'logs' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-secondary-800">
                            <thead className="bg-secondary-950">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Timestamp</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Action</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Module</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">User</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary-800">
                                {logs.map(l => (
                                    <tr key={l._id} className="hover:bg-secondary-800/50">
                                        <td className="px-6 py-4 text-xs text-secondary-500">{new Date(l.createdAt).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm font-mono text-primary-400">{l.action}</td>
                                        <td className="px-6 py-4 text-sm text-secondary-300">{l.module}</td>
                                        <td className="px-6 py-4 text-sm text-white">{l.user?.name || 'System'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* COUPONS TABLE */}
                {activeTab === 'coupons' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-secondary-800">
                            <thead className="bg-secondary-950">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Code</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Discount</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Expiry</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary-800">
                                {coupons.map(cp => (
                                    <tr key={cp._id} className="hover:bg-secondary-800/50">
                                        <td className="px-6 py-4 text-sm font-bold text-primary-400">{cp.code}</td>
                                        <td className="px-6 py-4 text-sm text-white">
                                            {cp.discountType === 'percentage' ? `${cp.discountValue}%` : `₹${cp.discountValue}`} Off
                                        </td>
                                        <td className="px-6 py-4 text-sm text-secondary-400">{new Date(cp.expiryDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-bold rounded ${cp.isActive ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                                                {cp.isActive ? 'Active' : 'Expired'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* TICKETS TABLE */}
                {activeTab === 'tickets' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-secondary-800">
                            <thead className="bg-secondary-950">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Subject</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Priority</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary-800">
                                {tickets.map(t => (
                                    <tr key={t._id} className="hover:bg-secondary-800/50">
                                        <td className="px-6 py-4 text-sm font-bold text-white">{t.subject}</td>
                                        <td className="px-6 py-4 text-sm text-secondary-300">{t.user?.name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-bold rounded ${t.status === 'resolved' ? 'bg-green-900/30 text-green-400' : 'bg-blue-900/30 text-blue-400'}`}>
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-bold uppercase text-secondary-500">{t.priority}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* SETTINGS TABLE */}
                {activeTab === 'settings' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-secondary-800">
                            <thead className="bg-secondary-950">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Key</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Value</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary-800">
                                {settings.map(s => (
                                    <tr key={s._id} className="hover:bg-secondary-800/50">
                                        <td className="px-6 py-4 text-sm font-mono text-primary-400">{s.key}</td>
                                        <td className="px-6 py-4 text-sm text-white font-bold">{String(s.value)}</td>
                                        <td className="px-6 py-4 text-sm text-secondary-400 italic">{s.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* WISHLIST TABLE */}
                {activeTab === 'wishlist' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-secondary-800">
                            <thead className="bg-secondary-950">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Event Saved</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Saved On</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary-800">
                                {wishlists.map(w => (
                                    <tr key={w._id} className="hover:bg-secondary-800/50">
                                        <td className="px-6 py-4 text-sm text-white">{w.user?.name || 'User'}</td>
                                        <td className="px-6 py-4 text-sm text-secondary-300">{w.event?.title || 'Event'}</td>
                                        <td className="px-6 py-4 text-sm text-secondary-500">{new Date(w.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* NOTIFICATIONS TABLE */}
                {activeTab === 'notifications' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-secondary-800">
                            <thead className="bg-secondary-950">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Message</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary-400 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary-800">
                                {notifications.map(n => (
                                    <tr key={n._id} className="hover:bg-secondary-800/50">
                                        <td className="px-6 py-4 text-sm text-white">{n.user?.name || 'Recipients'}</td>
                                        <td className="px-6 py-4 text-sm text-secondary-300">{n.message}</td>
                                        <td className="px-6 py-4 text-sm text-secondary-500">{new Date(n.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-bold rounded ${n.read ? 'bg-secondary-800 text-secondary-500' : 'bg-primary-900/30 text-primary-400'}`}>
                                                {n.read ? 'Read' : 'Unread'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Create Event Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Event" size="lg">
                <form onSubmit={handleSubmit} className="space-y-4 text-secondary-900">
                    <Input label="Event Title" name="title" value={formData.title} onChange={handleChange} required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-1">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="input-field">
                                <option value="Movies">Movies</option>
                                <option value="Concerts">Concerts</option>
                                <option value="Sports">Sports</option>
                                <option value="Plays">Plays</option>
                                <option value="Activities">Activities</option>
                                <option value="Stream">Stream</option>
                            </select>
                        </div>
                        <Input label="Show Time" type="time" name="showTime" value={formData.showTime} onChange={handleChange} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Event Date" type="date" name="date" value={formData.date} onChange={handleChange} required />
                        <Input label="Venue Location" name="venue" value={formData.venue} onChange={handleChange} required />
                    </div>

                    <div className="bg-secondary-50 p-4 rounded-lg border border-secondary-200">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-secondary-900">Ticket Categories</label>
                            <button type="button" onClick={addCategory} className="text-xs text-primary-600 font-bold hover:underline">+ Add Category</button>
                        </div>
                        {ticketCategories.map((cat, index) => (
                            <div key={index} className="flex gap-2 mb-2 items-end">
                                <div className="flex-1"><input type="text" placeholder="Name" className="input-field text-sm py-1" value={cat.name} onChange={(e) => handleCategoryChange(index, 'name', e.target.value)} required /></div>
                                <div className="w-24"><input type="number" placeholder="Price" className="input-field text-sm py-1" value={cat.price} onChange={(e) => handleCategoryChange(index, 'price', e.target.value)} required /></div>
                                <div className="w-24"><input type="number" placeholder="Seats" className="input-field text-sm py-1" value={cat.totalSeats} onChange={(e) => handleCategoryChange(index, 'totalSeats', e.target.value)} required /></div>
                                {ticketCategories.length > 1 && <button type="button" onClick={() => removeCategory(index)} className="text-red-500 p-2"><BiTrash /></button>}
                            </div>
                        ))}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">Description</label>
                        <textarea name="description" rows="4" value={formData.description} onChange={handleChange} className="input-field" required></textarea>
                    </div>
                    <Input label="Cover Image URL" name="image" value={formData.image} onChange={handleChange} />
                    <div className="flex justify-end gap-3 pt-4 border-t border-secondary-100 mt-4">
                        <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button type="submit" variant="primary" isLoading={formLoading}>Create Event</Button>
                    </div>
                </form>
            </Modal>
        </MainLayout>
    );
};

export default AdminDashboard;
