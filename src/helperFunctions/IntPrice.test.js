import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { displayCost } from './IntPrice';
import "@testing-library/jest-dom/extend-expect";

// test('See if formats to swedish international numberformat', () => {
//     expect(new Intl.NumberFormat(
//         'sv-SE', {
//              style: 'currency', currency: 'SEK', maximumFractionDigits: 0, minimumFractionDigits: 0 })
//              .format(293567)).toString()
//                 .toBe('293\u202f567\xa0kr');
// })

it('formats a number', () => {
    let number = 256678.27;
    let formattedNumber = new Intl.NumberFormat('sv-SE', { 
        style: 'currency', 
        currency: 'SEK', 
        maximumFractionDigits: 0, 
        minimumFractionDigits: 0 
    }).format(number);

    expect(displayCost(number)).toBe(formattedNumber);
})