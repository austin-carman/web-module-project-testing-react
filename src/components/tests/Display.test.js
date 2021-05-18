import React from 'react';
import { getByRole, render, screen } from '@testing-library/react';
import Display from '../Display';
import { testShow } from './Show.test';

import userEvent from '@testing-library/user-event';
import fetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');


test("renders without error", () => {
    render(<Display />);
});

test('Show component renders when fetch button is clicked', async () => {
    render(<Display/>);
    fetchShow.mockResolvedValueOnce(testShow);
    const button = screen.getByRole('button');    
    userEvent.click(button);
    const component = await screen.findByTestId('show-container');
    expect(component).toBeInTheDocument();
});

test('when fetch button is pressed, select options rendered === # of seasons in data', async () => {
    render(<Display/>);
    fetchShow.mockResolvedValueOnce(testShow);
    const button = screen.getByRole('button');    
    userEvent.click(button);
    const seasons = await screen.findAllByTestId('season-option');
    expect(seasons).toHaveLength(3);
});

test('displayFunc is executed when fetch button is pressed', async () => {
    const fakeFunc = jest.fn();
    render(<Display displayFunc={fakeFunc} />);
    fetchShow.mockResolvedValueOnce(testShow);
    const button = screen.getByRole('button');
    userEvent.click(button);
    const component = await screen.findByTestId('show-container');
    expect(component).toBeInTheDocument();
    expect(fakeFunc).toBeCalledTimes(1);
});



///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.