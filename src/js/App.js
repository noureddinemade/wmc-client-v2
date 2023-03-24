/* eslint-disable array-callback-return */

import React, { useEffect , useState } from 'react';

import Layout from './Component/Layout';

import transferData from './Component/Data/transfers.json';
import teamData from './Component/Data/teams.json';

//

const App = () => {

    // Set state and data defaults

    const [data, setData] = useState({

        countries:      [],
        leagues:        [],
        teams:          [],
        transfers:      [],
        lastUpdated:    new Date()

    })

    const [state, setState] = useState({

        loading:        true

    })

    // Actions

    const duplicate = (current, list, rule = false) => {

        let result = false;

        if (list && list.length > 0) {

            for (let i = 0; i < list.length; i++) {

                const keys = Object.keys(list[i]).length;

                let count = 0;

                if (typeof list[i] === 'object') {

                    for (let key in list[i]) {

                        if (rule && rule === 'league') {

                            if (list[i].name === current.name) count = 5;

                        }

                        else {

                            if (list[i][key] === current[key]) count++;

                            if (count >= keys) count = 5;

                        }

                    }
                
                }

                else {

                    let found = list.filter(a => a === current);

                    if (found.length > 0) count = 5

                }

                //

                if (count >= 5) result = true;

            };

        }

        return result;

    }

    // Get, clean and sort data

    useEffect(() => {

        async function getData() {

            let countries       = [];
            let leagues         = [];
            let teams           = [];
            let transfers       = [];

            let parseTransfers  = [];

            //

            try {

                // const dateURL           = await fetch('http://api.whomoved.club/date');
                // const teamsURL          = await fetch('http://api.whomoved.club/teams');
                // const transfersURL      = await fetch('http://api.whomoved.club/transfers');
    
                // let teamsResult         = await teamsURL.json();
                // let transfersResult     = await transfersURL.json();
                // let dateResult          = await dateURL.json();
    
                let teamsResult             = teamData;
                let transfersResult         = transferData;
    
                transfersResult = await transfersResult.sort((a,b) => new Date(b.date) - new Date(a.date));
    
                // Get countries, leagues & teams
                teamsResult.map(t => {

                    const country   = { name: t.country }
                    const league    = { name: t.league, country: t.country }

                    let cDuplicate = duplicate(country, countries);
                    let lDuplicate = duplicate(league, leagues, 'league');
                    let tDuplicate = duplicate(t, teams);
    
                    if (!cDuplicate) countries.push(country);
                    if (!lDuplicate) leagues.push(league);
                    if (!tDuplicate) teams.push(t);
                    
                });

                countries   = countries.sort((a, b) => a.name.localeCompare(b.name));
                leagues     = leagues.sort((a, b) => a.name.localeCompare(b.name));
                teams       = teams.sort((a, b) => a.name.localeCompare(b.name));
    
                // Get transfers
                transfersResult.map(t => { if (!duplicate(t, parseTransfers)) parseTransfers.push(t) })

                parseTransfers.map(t => {
    
                    const teamIn        = teams.filter(a => a.name === t.in);
                    const teamOut       = teams.filter(a => a.name === t.out);
    
                    let country         = {in: '', out: ''}
                    let league          = {in: '', out: ''}
    
                    if (teamIn.length > 0) {
    
                        country.in  = teamIn[0].country;
                        league.in   = teamIn[0].league;
    
                    }
    
                    if (teamOut.length > 0) {
    
                        country.out  = teamOut[0].country;
                        league.out   = teamOut[0].league;
    
                    }
    
                    //
    
                    const newTransfer = {
    
                        date:       t.date,
                        name:       t.name,
                        type:       t.type,
                        in:         {
    
                            team: t.in,
                            league: league.in,
                            country: country.in
    
                        },
                        out:        {
    
                            team: t.out,
                            league: league.out,
                            country: country.out
    
                        }
    
                    }
    
                    transfers.push(newTransfer);
                    
                });

                setData({

                    countries:      countries,
                    leagues:        leagues,
                    teams:          teams,
                    transfers:      transfers,

                })

                setState({

                    loading: false

                })
    
    
            } catch(error) {
    
                return error;
    
            }

        }

        getData();

    }, []);

    // Display

    return (

        <Layout state={state} data={data} duplicate={duplicate} />

    )

}

export default App;
