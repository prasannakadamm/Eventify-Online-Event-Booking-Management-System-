const supportTicketService = require('../services/supportTicket.service');

const getTickets = async (req, res, next) => {
    try {
        const filter = req.user.role === 'admin' ? {} : { user: req.user.id };
        const tickets = await supportTicketService.getAllTickets(filter);
        res.status(200).json(tickets);
    } catch (error) { next(error); }
};

const createTicket = async (req, res, next) => {
    try {
        req.body.user = req.user.id;
        const ticket = await supportTicketService.createTicket(req.body);
        res.status(201).json(ticket);
    } catch (error) { res.status(400); next(error); }
};

const addReply = async (req, res, next) => {
    try {
        const reply = { user: req.user.id, message: req.body.message, status: req.body.status };
        const ticket = await supportTicketService.addReply(req.params.id, reply);
        res.status(200).json(ticket);
    } catch (error) { next(error); }
};

module.exports = { getTickets, createTicket, addReply };
