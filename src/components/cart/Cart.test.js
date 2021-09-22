import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react'
import CartProductRow from './Cart.jsx';

test('Product in cart is greater than 0', () => {
   render(<CartProductRow />)
   
   fireEvent.click(screen.getByTestId('add'))

   const handle = jest.fn();
   expect(handle).toBeCalled()
})
test('Product in cart is less than 1', () => {
   render(<CartProductRow />)
   
   fireEvent.click(screen.getByTestId('sub'))

   const onClick = jest.fn();
   expect(onClick).toBeLessThan(1)
})