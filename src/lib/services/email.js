import { render } from '@react-email/components';
import OrderConfirmationEmail from '@/emails/OrderConfirmation';
import TicketAssignmentEmail from '@/emails/TicketAssignment';
import PaymentLinkEmail from '@/emails/PaymentLink';

async function sendBrevoEmail({ to, subject, htmlContent }) {
    if (!process.env.BREVO_API_KEY) {
        console.error("BREVO_API_KEY is not set");
        return false;
    }

    const payload = {
        sender: {
            name: "The Access Group",
            email: "info@theaccessgroup.co.za" // Existing sender email
        },
        to: [
            {
                email: to.email,
                name: to.name || "Customer"
            }
        ],
        subject: subject,
        htmlContent: htmlContent
    };

    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY,
                "accept": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const err = await response.json();
            console.error("BREVO EMAIL ERROR:", err);
            return false;
        }

        return true;
    } catch (error) {
        console.error("BREVO FETCH ERROR:", error);
        return false;
    }
}

export async function sendOrderConfirmation(orderData) {
    try {
        const html = await render(<OrderConfirmationEmail {...orderData} />);
        return await sendBrevoEmail({
            to: { email: orderData.buyerEmail, name: orderData.buyerName },
            subject: `Order Confirmation #${orderData.orderNumber}`,
            htmlContent: html
        });
    } catch (err) {
        console.error("Error sending order confirmation:", err);
        return false;
    }
}

export async function sendTicketAssignment(ticketData) {
    try {
        const html = await render(<TicketAssignmentEmail {...ticketData} />);
        return await sendBrevoEmail({
            to: { email: ticketData.attendeeEmail, name: ticketData.attendeeName },
            subject: `Your Ticket: ${ticketData.productName}`,
            htmlContent: html
        });
    } catch (err) {
        console.error("Error sending ticket assignment:", err);
        return false;
    }
}
export async function sendPaymentLinkEmail(orderData) {
    try {
        const html = await render(<PaymentLinkEmail {...orderData} />);
        return await sendBrevoEmail({
            to: { email: orderData.buyerEmail, name: orderData.buyerName },
            subject: `Action Required: Pending Payment for Order #${orderData.orderNumber}`,
            htmlContent: html
        });
    } catch (err) {
        console.error("Error sending payment link email:", err);
        return false;
    }
}
