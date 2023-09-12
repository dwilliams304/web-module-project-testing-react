import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent from '@testing-library/user-event';

test('renders without errors', () => { 
    render(<Show show={testingData} selectedSeason={'none'}/>);
});

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null}/>)
    const loadingContainer = screen.queryByTestId('loading-container');
    expect(loadingContainer).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => {
    render(<Show show={testingData} selectedSeason={'none'}/>);
    const seasonOption = screen.queryAllByTestId('season-option');
    expect(seasonOption).toHaveLength(2);
 });

test('handleSelect is called when an season is selected', () => { 
    const mockHandleSelect = jest.fn();
    
    render(<Show show={testingData} selectedSeason={'none'} handleSelect={mockHandleSelect}/>);
    const select = screen.getByLabelText(/Select A Season/i);
    userEvent.selectOptions(select, ['1']);
    expect(mockHandleSelect).toBeCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const {rerender} = render(<Show show={testingData} selectedSeason={'none'}/>);
    let episodes = screen.queryByTestId('episodes-container');
    expect(episodes).not.toBeInTheDocument();
    rerender(<Show show={testingData} selectedSeason={1} />);
    episodes = screen.queryByTestId('episodes-container');
    expect(episodes).toBeInTheDocument();

});

const testingData = {
    name: 'Test',
    summary: 'This is a testing show',
    seasons: [
        {id: 1, name: 'Season 1', episodes: []},
        {id: 2, name: 'Season 2', episodes: []},
    ]
}