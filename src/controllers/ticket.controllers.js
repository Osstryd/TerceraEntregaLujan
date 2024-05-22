import Controllers from "./class.controller.js";
import TicketService from "../services/ticket.services.js";
import { createResponse } from "../utils.js";

const ticketService = new TicketService();

export default class TicketController extends Controllers {
    constructor() {
        super(ticketService);
    }

    async generateTicket(req, res, next) {
        try {
            const { _id } = req.user;
            const { cid } = req.params;
            const ticket = await ticketService.generateTicket(_id, cid);
            if (!ticket) createResponse(res, 404, 'Error generating ticket');
            createResponse(res, 200, ticket);
        } catch (error) {
            next(error.message);
        }
    }
}