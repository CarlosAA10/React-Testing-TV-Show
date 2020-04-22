import React from 'react'; 
import { render, fireEvent, waitFor } from '@testing-library/react'; 
import userEvent from "@testing-library/user-event";
import App from './App'; 

import { fetchShow as mockFetchShows } from './api/fetchShow'; 

jest.mock('./api/fetchShow'); 

const showsData = {
    
    id: 2993,
    url: "http://www.tvmaze.com/shows/2993/stranger-things",
    name: "Stranger Things",
    type: "Scripted",
    language: "English",
    image: {
        medium: "http://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg" ,
        original: "http://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg" ,
    },
    summary:"<p>A love letter to the '80s classics that captivated a generation, <b>Stranger Things</b> is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.</p>" , 
    _embedded: {
        episodes: [
        {
            id: 553946, 
            url: "http://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
            name: "Chapter One: The Vanishing of Will Byers",
            season: 1,
            number: 1,
            airdate: "2016-07-15",
            airtime: "",
            airstamp: "2016-07-15T12:00:00+00:00",
            runtime: 60,
            image: {
                medium: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
                original: "http://static.tvmaze.com/uploads/images/original_untouched/67/168918.jpg",
            },
            summary: "<p>A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.</p>",
            _links: {
                self: {
                    href: "http://api.tvmaze.com/episodes/553946",
                        }, 
                    }
        
        }, 
        {
            id: 578663,
            url: "http://www.tvmaze.com/episodes/578663/stranger-things-1x02-chapter-two-the-weirdo-on-maple-street",
            name: "Chapter Two: The Weirdo on Maple Street",
            season: 1,
            number: 2,
            airdate: "2016-07-15",
            airtime: "",
            airstamp: "2016-07-15T12:00:00+00:00",
            runtime: 60,
            image: {medium: "http://static.tvmaze.com/uploads/images/medium_landscape/72/181376.jpg", original: "http://static.tvmaze.com/uploads/images/original_untouched/72/181376.jpg"},
            summary: "<p>While the search for the missing Will continues, Joyce tells Jim about a call she apparently received from her son. Meanwhile, Jane warns Mike that there are bad people after her, and he realizes that she knows what happened to Will.</p>",
            _links: {
                self: {
                    href: "http://api.tvmaze.com/episodes/578663"
                        }, 
                    }
        }, 
        {
            id: 909340,
            url: "http://www.tvmaze.com/episodes/909340/stranger-things-2x01-chapter-one-madmax",
            name: "Chapter One: MADMAX",
            season: 2,
            number: 1,
            airdate: "2017-10-27",
            airtime: "",
            airstamp: "2017-10-27T12:00:00+00:00",
            runtime: 60,
            image: {medium: "http://static.tvmaze.com/uploads/images/medium_landscape/132/331976.jpg", original: "http://static.tvmaze.com/uploads/images/original_untouched/132/331976.jpg"},
            summary: "<p>One year after the events with the Upside Down and the Demogorgon, Will meets with a government doctor. The boys discover that there's a new player in town, and Jim pays a visit to El.</p>"
        } // ending curly bracket, 
        ] // closes array
        }// closes _embedded

        // closes data
}// closes showsData



test('test if seasons render in App.js when selecting', async () => {
    mockFetchShows.mockResolvedValueOnce(showsData); 

    const { getByText, debug, rerender} = render(<App />)

    await waitFor(() => {
        debug(); 
        expect(mockFetchShows).toHaveBeenCalledTimes(1);
        getByText(/select a season/i); 
    })

    const dropDown = getByText(/select a season/i); 


    userEvent.click(dropDown); 
    const s2 = getByText(/season 2/i); 
    
    debug(); 

    expect(s2).toBeInTheDocument(); 
})

test('test the length of each season', async() => {
    mockFetchShows.mockResolvedValueOnce(showsData); 

    const { getByText , debug, getAllByText } = render(<App />); 

    await waitFor(() => {
        debug(); 
        getByText(/select a season/i)
    }); 

    const dropDown = getByText(/select a season/i)

    userEvent.click(dropDown); 

    expect(getAllByText(/season/i)).toHaveLength(3); 
})

// test('renders seasons data when season is selected', async () => {
//     mockFetchShows.mockResolvedValueOnce(showsData);
//     console.log('the shows data', showsData); 

//     const { getByTestId, getByPlaceholderText, debug, queryAllByTestId } = render(<App />); 

//     // const dropDown =; 
//     debug();

   

//     await waitFor(() => getByTestId(/drop-down/i)); 

//     userEvent.selectOptions(getByTestId(/drop-down/i), ["1"])

//     expect(queryAllByTestId(/episodess/i)).toHaveLength(2)


// })