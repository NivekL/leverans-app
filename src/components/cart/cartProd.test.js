import React from 'react';
import { render, screen } from '@testing-library/react';
import CartProductRow from './CartProductRow';
import "@testing-library/jest-dom/extend-expect";

test("does product name show in cart", () => {
    render(<CartProductRow />);
    const prodName = screen.getByTestId("prodName");

    expect(prodName.textContent).toBe("hejhej");
})