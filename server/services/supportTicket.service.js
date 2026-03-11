const auditLogService = require('../services/auditLog.service'); // placeholder if needed

const SupportTicket = require('../models/SupportTicket');

const getAllTickets = async (filter = {}) => {
    return await SupportTicket.find(filter).populate('user', 'name email').sort({ updatedAt: -1 });
};

const getTicketById = async (id) => {
    const ticket = await SupportTicket.findById(id).populate('user', 'name email').populate('replies.user', 'name');
    if (!ticket) throw new Error('Ticket not found');
    return ticket;
};

const createTicket = async (data) => {
    return await SupportTicket.create(data);
};

const addReply = async (ticketId, replyData) => {
    const ticket = await SupportTicket.findById(ticketId);
    if (!ticket) throw new Error('Ticket not found');
    ticket.replies.push(replyData);
    ticket.updatedAt = Date.now();
    if (replyData.status) ticket.status = replyData.status;
    await ticket.save();
    return ticket;
};

module.exports = { getAllTickets, getTicketById, createTicket, addReply };
