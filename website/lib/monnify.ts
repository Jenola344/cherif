import axios from 'axios';

const MONNIFY_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://api.monnify.com/api/v1'
    : 'https://sandbox.monnify.com/api/v1';

export async function getMonnifyAccessToken() {
    const apiKey = process.env.MONNIFY_API_KEY;
    const secretKey = process.env.MONNIFY_SECRET_KEY;

    if (!apiKey || !secretKey) {
        throw new Error('Monnify credentials not configured');
    }

    const token = Buffer.from(`${apiKey}:${secretKey}`).toString('base64');

    try {
        const response = await axios.post(`${MONNIFY_BASE_URL}/auth/login`, {}, {
            headers: {
                Authorization: `Basic ${token}`,
            },
        });
        return response.data.responseBody.accessToken;
    } catch (error) {
        console.error('Monnify Auth Error:', error);
        throw new Error('Failed to authenticate with Monnify');
    }
}

export async function initializeTransaction(data: {
    amount: number;
    customerName: string;
    customerEmail: string;
    paymentReference: string;
    paymentDescription: string;
    redirectUrl: string;
}) {
    const accessToken = await getMonnifyAccessToken();

    try {
        const response = await axios.post(
            `${MONNIFY_BASE_URL}/merchant/transactions/init-transaction`,
            {
                amount: data.amount,
                customerName: data.customerName,
                customerEmail: data.customerEmail,
                paymentReference: data.paymentReference,
                paymentDescription: data.paymentDescription,
                currencyCode: 'NGN', // Monnify usually operates in NGN
                contractCode: process.env.MONNIFY_CONTRACT_CODE,
                redirectUrl: data.redirectUrl,
                paymentMethods: ['CARD', 'ACCOUNT_TRANSFER'],
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data.responseBody;
    } catch (error) {
        console.error('Monnify Init Transaction Error:', error);
        throw new Error('Failed to initialize transaction');
    }
}
