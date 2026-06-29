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

export async function sendMerchantOrderNotification(orderData) {
    try {
        const itemsHtml = (orderData.items || []).map(i => `<li>${i.quantity}x ${i.productName || 'Item'}</li>`).join('');
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #ffffff;">
                <h2 style="color: #111827; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Order Received!</h2>
                <p style="font-size: 16px;"><strong>Order Number:</strong> ${orderData.orderNumber}</p>
                <p style="font-size: 16px;"><strong>Total Amount:</strong> R ${orderData.totalAmount ? Number(orderData.totalAmount).toLocaleString() : '0'}</p>
                
                <h3 style="color: #374151; margin-top: 24px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px;">Person Ordering</h3>
                <p style="margin: 6px 0;"><strong>Name:</strong> ${orderData.buyerName || 'N/A'}</p>
                <p style="margin: 6px 0;"><strong>Email:</strong> ${orderData.buyerEmail || 'N/A'}</p>
                ${orderData.buyerPhone ? `<p style="margin: 6px 0;"><strong>Phone:</strong> ${orderData.buyerPhone}</p>` : ''}
                ${orderData.buyerCompany ? `<p style="margin: 6px 0;"><strong>Company:</strong> ${orderData.buyerCompany}</p>` : ''}

                <h3 style="color: #374151; margin-top: 24px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px;">Order Details</h3>
                <ul style="line-height: 1.6;">
                    ${itemsHtml}
                </ul>
            </div>
        `;

        return await sendBrevoEmail({
            to: { email: 'jacobmohomutsi@gmail.com', name: 'Jacob Mohomutsi' },
            subject: `[New Order] #${orderData.orderNumber} - R ${orderData.totalAmount || 0}`,
            htmlContent: html
        });
    } catch (err) {
        console.error("Error sending merchant order notification:", err);
        return false;
    }
}

export async function sendOrderConfirmation(orderData) {
    try {
        // Asynchronously notify merchant (do not block or fail customer email if merchant email fails)
        sendMerchantOrderNotification(orderData).catch(err => console.error("Merchant email failed:", err));

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

export async function sendAccessBoxMerchantEmail(metadata, paymentRef) {
    try {
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #ffffff;">
                <h2 style="color: #304945; border-bottom: 2px solid #C2A66B; padding-bottom: 10px;">New Access Box Paid!</h2>
                <p style="font-size: 16px;"><strong>Package:</strong> ${metadata.productName || 'Access Box'} - ${metadata.tierName || ''}</p>
                <p style="font-size: 16px;"><strong>Amount Paid:</strong> ${metadata.priceDisplay || 'N/A'}</p>
                <p style="font-size: 14px; color: #666;"><strong>Payment Ref:</strong> ${paymentRef || 'N/A'}</p>
                
                <h3 style="color: #374151; margin-top: 24px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px;">Client Details</h3>
                <p style="margin: 6px 0;"><strong>Name:</strong> ${metadata.fullName || 'N/A'}</p>
                <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${metadata.email}">${metadata.email || 'N/A'}</a></p>
                ${metadata.phone ? `<p style="margin: 6px 0;"><strong>Phone:</strong> ${metadata.phone}</p>` : ''}
                ${metadata.company ? `<p style="margin: 6px 0;"><strong>Company:</strong> ${metadata.company}</p>` : ''}

                <h3 style="color: #374151; margin-top: 24px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px;">Box Requirements</h3>
                <div style="background-color: #f9fafb; padding: 12px; border-radius: 6px; white-space: pre-wrap; font-family: monospace; color: #374151;">
${metadata.boxRequirements || 'None specified'}
                </div>
            </div>
        `;

        await sendBrevoEmail({
            to: { email: 'jacobmohomutsi@gmail.com', name: 'Jacob Mohomutsi' },
            subject: `[PAID BOX] ${metadata.productName || 'Access Box'} (${metadata.tierName || ''}) - ${metadata.fullName || ''}`,
            htmlContent: html
        }).catch(err => console.error("Error notifying jacob:", err));

        await sendBrevoEmail({
            to: { email: 'theaccessgroupsa@gmail.com', name: 'The Access Group SA' },
            subject: `[PAID BOX] ${metadata.productName || 'Access Box'} (${metadata.tierName || ''}) - ${metadata.fullName || ''}`,
            htmlContent: html
        }).catch(err => console.error("Error notifying theaccessgroupsa:", err));

        return true;
    } catch (err) {
        console.error("Error in sendAccessBoxMerchantEmail:", err);
        return false;
    }
}
