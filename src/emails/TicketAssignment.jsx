import * as React from 'react';
import { Html, Body, Head, Heading, Container, Preview, Section, Text, Img, Hr } from '@react-email/components';

export const TicketAssignmentEmail = ({
    attendeeName,
    ticketNumber,
    productName,
    events,
    qrUrl,
}) => {
    return (
        <Html>
            <Head />
            <Preview>Your Ticket - {productName}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Heading style={heading}>The Access Group</Heading>
                        <Text style={subheading}>Your Event Ticket</Text>
                    </Section>
                    
                    <Section style={content}>
                        <Text style={text}>Hi {attendeeName},</Text>
                        <Text style={text}>
                            Here is your ticket for <strong>{productName}</strong>.
                        </Text>
                        
                        <Section style={ticketBox}>
                            <Text style={ticketTitle}>Ticket #{ticketNumber}</Text>
                            <Img src={qrUrl} alt={`QR Code for ${ticketNumber}`} width="200" height="200" style={qrImage} />
                            <Text style={instructions}>
                                Please present this QR code at the entrance for scanning.
                            </Text>
                        </Section>

                        <Section style={eventsSection}>
                            <Text style={eventsTitle}>Access Rights</Text>
                            {events.map((event, i) => (
                                <div key={i} style={eventCard}>
                                    <Text style={eventName}>{event.name}</Text>
                                    <Text style={eventDetail}>
                                        {new Date(event.event_date).toLocaleString()}
                                    </Text>
                                    <Text style={eventDetail}>{event.venue}</Text>
                                </div>
                            ))}
                        </Section>
                    </Section>
                    
                    <Hr style={hr} />
                    <Section style={footer}>
                        <Text style={footerText}>
                            &copy; {new Date().getFullYear()} The Access Group. All rights reserved.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

// Styles
const main = {
    backgroundColor: '#f9fafb',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    width: '580px',
};

const header = {
    backgroundColor: '#304945',
    padding: '24px',
    textAlign: 'center',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    borderBottom: '4px solid #C2A66B',
};

const heading = {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0',
    textTransform: 'uppercase',
};

const subheading = {
    color: '#C2A66B',
    fontSize: '14px',
    margin: '8px 0 0 0',
    textTransform: 'uppercase',
};

const content = {
    backgroundColor: '#ffffff',
    padding: '32px 24px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    border: '1px solid #e5e7eb',
};

const text = {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#374151',
    margin: '0 0 16px 0',
};

const ticketBox = {
    backgroundColor: '#f9fafb',
    padding: '24px',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '24px',
    border: '1px dashed #d1d5db',
};

const ticketTitle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#111827',
    margin: '0 0 16px 0',
};

const qrImage = {
    margin: '0 auto',
    display: 'block',
};

const instructions = {
    fontSize: '12px',
    color: '#6b7280',
    margin: '16px 0 0 0',
};

const eventsSection = {
    marginTop: '24px',
};

const eventsTitle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#374151',
    margin: '0 0 12px 0',
};

const eventCard = {
    backgroundColor: '#f9fafb',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '8px',
};

const eventName = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#111827',
    margin: '0 0 4px 0',
};

const eventDetail = {
    fontSize: '12px',
    color: '#4b5563',
    margin: '0',
};

const hr = {
    borderColor: '#e5e7eb',
    margin: '24px 0',
};

const footer = {
    textAlign: 'center',
};

const footerText = {
    fontSize: '12px',
    color: '#9ca3af',
};

export default TicketAssignmentEmail;
