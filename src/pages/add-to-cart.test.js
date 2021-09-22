import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react'
import SingleProductPage from './SingleProductPage'

test('should add a single product', () => {
    const handleClick = jest.fn();
    render(<SingleProductPage />);
    fireEvent.click(screen.getByTestId('addProd'));
    expect(handleClick).toBeTruthy();
})