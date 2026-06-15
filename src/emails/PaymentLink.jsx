import * as React from 'react';
import { Html, Body, Head, Heading, Container, Preview, Section, Text, Button, Hr } from '@react-email/components';

export const PaymentLinkEmail = ({
    orderNumber,
    buyerName,
    totalAmount,
    paymentUrl,
    items
}) => {
    return (
        <Html>
            <Head />
            <Preview>Complete Your Summit Payment - {orderNumber}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Heading style={heading}>The Access Group</Heading>
                        <Text style={subheading}>Pending Payment</Text>
                    </Section>
                    
                    <Section style={content}>
                        <Text style={text}>Hi {buyerName},</Text>
                        <Text style={text}>
                            Your order <strong>{orderNumber}</strong> is pending payment. Please complete your transaction to secure your tickets.
                        </Text>
                        
                        <Section style={summary}>
                            <Text style={summaryTitle}>Order Summary</Text>
                            {items.map((item, i) => (
                                <Text key={i} style={itemText}>
                                    {item.quantity}x {item.productName}
                                </Text>
                            ))}
                            <Text style={totalText}>
                                Total Due: R{totalAmount}
                            </Text>
                        </Section>

                        <Text style={text}>
                            Click the button below to pay securely via Yoco.
                        </Text>
                        
                        <Section style={btnContainer}>
                            <Button style={button} href={paymentUrl}>
                                Pay Now
                            </Button>
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

const summary = {
    backgroundColor: '#f9fafb',
    padding: '16px',
    borderRadius: '4px',
    marginBottom: '24px',
};

const summaryTitle = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#374151',
    margin: '0 0 12px 0',
};

const itemText = {
    fontSize: '14px',
    color: '#4b5563',
    margin: '0 0 8px 0',
};

const totalText = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#304945',
    margin: '16px 0 0 0',
    borderTop: '1px solid #e5e7eb',
    paddingTop: '12px',
};

const btnContainer = {
    textAlign: 'center',
    marginTop: '32px',
};

const button = {
    backgroundColor: '#C2A66B',
    borderRadius: '4px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'inline-block',
    padding: '12px 24px',
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

export default PaymentLinkEmail;
