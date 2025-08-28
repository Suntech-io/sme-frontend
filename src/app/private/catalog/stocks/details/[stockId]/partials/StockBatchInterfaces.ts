export interface IStocksBatchCardProps {
    batchName: string; // e.g., "Batch B001"
    supplierName: string; // e.g., "Berma Akoto Ventures"
    quantity: number; // e.g., 120
    costPrice: number; // e.g., 45.5
    expiryDate: string; // e.g., "24 Dec 2028"
    totalValue: number; // e.g., 5485.90
    condition: 'Good' | 'Expired'; // e.g., "Good" or "Expired"
    notes?: string; // Optional notes about the batch;
    paymentSlips?: string[]; // Optional array of payment slip URLs or identifiers;
    movements?:string[]; // Optional array of movement descriptions or identifiers;
}


export interface IPaymentSlip {
    id: string;
    url: string;
    uploadedAt: string; // ISO date string
    description?: string; // Optional description of the payment slip
}

export interface IBatchMovement{
    id: string;
    type: 'Addition' | 'Removal' | 'Adjustment'; // Type of movement
    quantity: number; // Quantity moved
    date: string; // ISO date string of the movement
    reason?: string; // Optional reason for the movement
}

export interface IBatchAnalytics {
    totalBatches: number;
    totalQuantity: number;
    averageCostPrice: number;
    totalValue: number;
}