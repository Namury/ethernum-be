import "dotenv/config";

export const duitkuConfig = {
    createInvoiceURL : process.env.DUITKU_CREATE_INVOICE_URL ? process.env.DUITKU_CREATE_INVOICE_URL : 'https://api-sandbox.duitku.com/api/merchant/createInvoice',
    merchantCode: process.env.DUITKU_MERCHANT_CODE ? process.env.DUITKU_MERCHANT_CODE : "DXXXX",
    apiKey: process.env.DUITKU_API_KEY ? process.env.DUITKU_API_KEY : "XXXc6XXX31829bXXX74cd5XXXXX869XX",
    passport: process.env.DUITKU_PASSPORT ? process.env.DUITKU_PASSPORT : true,
    callbackUrl: process.env.DUITKU_CALLBACK_URL ? process.env.DUITKU_CALLBACK_URL : "https://example/route/callback",
    returnUrl: process.env.DUITKU_RETURN_URL ? process.env.DUITKU_RETURN_URL : "https://example/route/return",
    accountLinkReturnUrl: process.env.DUITKU_ACCOUNT_LINK_RETURN_URL ? process.env.DUITKU_ACCOUNT_LINK_RETURN_URL : "https://localhost/dashboard/user",
    expiryPeriod: process.env.DUITKU_EXPIRY_PERIOD ? process.env.DUITKU_EXPIRY_PERIOD : 1440
}

export interface createInvoiceRequest {
    username: string;
    email: string;
    reffcode: string;
    order_id: string;
    amount: number;
}

export interface duitkuInvoiceRequest {
    paymentAmount: number;
    merchantUserInfo?: string;
    merchantOrderId?: string;
    productDetails: string;
    email: string;
    callbackUrl?: string;
    returnUrl?: string;
    customerDetail: customerDetail;
}

interface customerDetail {
    firstName: string;
    email: string;
}
export interface duitkuInvoiceResponse {
    merchantCode: string;
    reference: string;
    paymentUrl: string;
    statusCode: string;
    statusMessage: string;
}

export interface duitkuCallbackRequest {
    merchantCode: string;
    amount: string;
    paymentAmount?: string;
    merchantOrderId?: string;
    productDetail?: string;
    additionalParam?: string;
    paymentCode?: string;
    resultCode?: string;
    merchantUserId?: string;
    reference?: string;
    publisherOrderId?: string;
    spUserHash?: string;
    settlementDate?: string;
    issuerCode?: string;
    signature?: string;
}





