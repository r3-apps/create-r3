export const currencyFormatter = (amount: string | number) => {
    // determine if amount is a string or number
    if (typeof amount === 'number') {
        const returnAmount = amount / 100;
        return returnAmount.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
    }

    const value = parseInt(amount) / 100;
    return value.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
}