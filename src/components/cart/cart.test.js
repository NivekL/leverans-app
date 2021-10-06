import React from 'react';
import { render, screen } from '@testing-library/react';
import Cart from './Cart';
import "@testing-library/jest-dom/extend-expect";

it('throws error', () => {
    const cart = render(
        <Cart
        open={true}
        setOpen={() => {}}
        setItemsInCartQuantity={() => {}}
        setShowWhichPopup={() => {}}
        triggerCartUpdate={1}
        />
    );
    expect(cart).toThrowError();
})