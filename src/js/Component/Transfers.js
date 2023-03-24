import { useState } from 'react';

import Players from './Transfers/Players';
import Filters from './Transfers/Filters';

//

const Transfers = props => {

    const { data } = props; 

    const [filters, setFilters] = useState({

        country:      '',
        league:       '',
        team:         '',
        type:         '',
        direction:    ''

    })

    const handleFilters = (name, value) => {

        setFilters({
            ...filters,
            [name]: value,
        });

    };

    const applyFilters = (data) => {

        let countryIn       = filters.country;
        let countryOut      = filters.country;
        let leagueIn        = filters.league;
        let leagueOut       = filters.league;
        let teamIn          = filters.team;
        let teamOut         = filters.team;
        let type            = filters.type;
        let direction       = filters.direction;

        const filteredData = data.filter((item) => {

            let countryResult   = item.in.country.includes(countryIn) && item.out.country.includes(countryOut);
            let leagueResult    = item.in.league.includes(leagueIn) && item.out.league.includes(leagueOut);
            let teamResult      = item.in.team.includes(teamIn) && item.out.team.includes(teamOut);
            let typeResult      = item.type.includes(type)

            if (direction === 'in') {

                countryOut  = '';
                leagueOut   = '';
                teamOut     = '';
                
            }

            if (direction === 'out') {

                countryIn  = '';
                leagueIn   = '';
                teamIn     = '';
                
            }

            if (direction === '') {

                countryResult   = (item.in.country.includes(countryIn) || item.out.country.includes(countryOut));  
                leagueResult    = (item.in.league.includes(leagueIn) || item.out.league.includes(leagueOut));    
                teamResult      = (item.in.team.includes(teamIn) || item.out.team.includes(teamOut));        

            }

            return (

                countryResult && leagueResult && teamResult && typeResult

            );

        });

        return filteredData

    };

    //



    //

    return (

        <section className='contentWrap'>

            <Filters data={data} filters={filters} handleChange={handleFilters} />
            <Players data={data} players={applyFilters(data.transfers)} handleChange={handleFilters} />

        </section>

    )

}

export default Transfers;