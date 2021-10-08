import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Cart from './Cart';
import "@testing-library/jest-dom/extend-expect";

it('renders', async () => {
    const UserContext = React.createContext({
        userName: '',
        setUserName: () => {},
        userCartId: 0,
        setUserCartId: () => {},
        productsInwishlist: [],
        setProductInwishlist: () => {},
    });
      
    const ThemeContext = React.createContext({});

    act(() => {
        render(
            <ThemeContext.Provider value={true}>
                <UserContext.Provider value={{
                    userName: 'Namn', 
                    setUserName: () => {}, 
                    userCartId: 12, 
                    setUserCartId: () => {}, 
                    productsInwishlist: [
                        {
                            "id": 5,
                            "name": "Space Walker",
                            "description": " Space walker är en tidlös klocka med sin enkla design och den karaktäristiska sekund-urtavlan, som en symbol för tidens rörelse..",
                            "category": "Classic",
                            "price": 2295,
                            "image": "London_Classic/smokey-w.png",
                            "zoom": "London_Classic/zoom/smokey-zoom.webp",
                            "quantity": 1
                          },
                          {
                            "id": 7,
                            "name": "Night Nevil",
                            "description": "En sportig klassiker som fungerar i nästan alla lägen. Designad som en homage till tidiga sportur med en skandinavisk touch. Den är 10 ATM vattenresistent för att följa med på och under vattnet.",
                            "category": "Classic",
                            "price": 2295,
                            "image": "London_Classic/night-w.png",
                            "zoom": "London_Classic/zoom/night-zoom.webp",
                            "quantity": 1
                          }
                    ], 
                    setProductsInwishlist: () => {}
                }}>
                    <Cart
                        open={true}
                        setOpen={() => {}}
                        setItemsInCartQuantity={() => {}}
                        setShowWhichPopup={() => {}}
                        triggerCartUpdate={1}
                    />
                </UserContext.Provider>
            </ThemeContext.Provider>
        );
    })
    const somethingInCart = screen.getByText('Varukorg');
    expect(somethingInCart).toBeInstanceOf(HTMLParagraphElement);
})