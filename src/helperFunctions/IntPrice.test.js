import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import IntPrice from './IntPrice';
import "@testing-library/jest-dom/extend-expect";

test('See if formats to swedish international numberformat', () => {
    expect(new Intl.NumberFormat(
        'sv-SE', {
             style: 'currency', currency: 'SEK', maximumFractionDigits: 0, minimumFractionDigits: 0 })
             .format(293567)).toString()
                .toBe('293\u202f567\xa0kr');
})