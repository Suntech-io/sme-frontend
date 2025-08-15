export const ghanaPhoneRegex = new RegExp(/\+233\d{9}$/);

export const paymentTypes = [
    { label: 'Mobile Money', value: 'Mobile Money' },
    { label: 'Bank', value: 'Bank' },
    { label: 'Cheque', value: 'Cheque' },
    { label: 'Cash', value: 'Cash' },
];

export const mobileMoneyProviders = [
    { label: 'MTN', value: 'MTN' },
    { label: 'Telecel', value: 'Telecel' },
    { label: 'AirtelTigo', value: 'AirtelTigo' },
];

export const bankProviders = [
    { label: 'Access Bank', value: 'Access Bank' },
    { label: 'Ecobank', value: 'Ecobank' },
    { label: 'Standard Chartered', value: 'Standard Chartered' },
    { label: 'Zenith Bank', value: 'Zenith Bank' },
    { label: 'GCB Bank', value: 'GCB Bank' },
    { label: 'Absa Bank', value: 'Absa Bank' },
    { label: 'Fidelity Bank', value: 'Fidelity Bank' },
    { label: 'Cal Bank', value: 'Cal Bank' },
    { label: 'Bank of Africa', value: 'Bank of Africa' },
    { label: 'Republic Bank', value: 'Republic Bank' },
    { label: 'First Atlantic Bank', value: 'First Atlantic Bank' },
];


export type TMeasurementUnit = 'Countable' | 'Weight' | 'Volume' | 'Length' | 'Area' | 'Power'

export const unitOfMeasuremtentCategories: { label: TMeasurementUnit, value: TMeasurementUnit }[] = [
    { label: 'Countable', value: 'Countable' },
    { label: 'Weight', value: 'Weight' },
    { label: 'Volume', value: 'Volume' },
    { label: 'Length', value: 'Length' },
    { label: 'Area', value: 'Area' },
    { label: 'Power', value: 'Power' },
];


export const unitOfMeasurement: Record<TMeasurementUnit, { label: string, value: string }[]> = {
    Countable: [{ label: 'Unit', value: 'Unit' },
    ],
    Weight: [
        { label: 'Kilogram', value: 'Kilogram' },
        { label: 'Gram', value: 'Gram' },
        { label: 'Tonne', value: 'Tonne' },
        { label: 'Pound', value: 'Pound' },
        { label: 'Ounce', value: 'Ounce' }
    ],
    Volume: [
        { label: 'Liter', value: 'Liter' },
        { label: 'Milliliter', value: 'Milliliter' },
        { label: 'Cubic Meter', value: 'Cubic Meter' },
        { label: 'Galon', value: 'Galon' },
        { label: 'Quart', value: 'Quart' },
        { label: 'Pint', value: 'Pint' },
        { label: 'Fluid Ounce', value: 'Fluid Ounce' }
    ],
    Length: [
        { label: 'Meter', value: 'Meter' },
        { label: 'Centimeter', value: 'Centimeter' },
        { label: 'Millimeter', value: 'Millimeter' },
        { label: 'Foot', value: 'Foot' },
        { label: 'Inch', value: 'Inch' },
        { label: 'Yard', value: 'Yard' },
        { label: 'Mile', value: 'Mile' },
        { label: 'Roll', value: 'Roll' }
    ],
    Area: [
        { label: 'Square Meter', value: 'Square Meter' },
        { label: 'Square Foot', value: 'Square Foot' },
        { label: 'Acre', value: 'Acre' },
        { label: 'Hectare', value: 'Hectare' },
        { label: 'Sheet', value: 'Sheet' }
    ],
    Power: [
        { label: 'Watt', value: 'Watt' },
        { label: 'Kilowatt', value: 'Kilowatt' },
        { label: 'Horse Power', value: 'Horse Power' }
    ]
}