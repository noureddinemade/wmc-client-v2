import Option from './Filter/Option';

const Filters = props => {

    const { data, filters, handleChange } = props;

    //

    const handleFilters = (event) => {

        handleChange(event.target.name, event.target.value);

    };

    // Show options based on current filters

    let countries   = data.countries;
    let leagues     = data.leagues;
    let teams       = data.teams;
    let types       = [{name: 'loan'}, {name: 'free'}];
    let directions  = [{name: 'in'}, {name: 'out'}];

    // Show leagues and teams based on country selected

    if (filters.country !== '') {

        leagues = leagues.filter(a => a.country === filters.country);
        teams   = teams.filter(a => a.country === filters.country);

    }

    // Show countries and teams based on league selected

    if (filters.league !== '') {

        const filteredLeague = leagues.filter(a => a.name === filters.league);

        if (filteredLeague && filteredLeague.length > 0) countries   = countries.filter(a => a.name === filteredLeague[0].country);

        teams = teams.filter(a => a.league === filters.league);

    }

    // Show countries and leagues based on team selected

    if (filters.team !== '') {

        const filteredTeam = teams.filter(a => a.name === filters.team);

        if (filteredTeam && filteredTeam.length > 0) {

            countries   = countries.filter(a => a.name === filteredTeam[0].country);
            leagues     = leagues.filter(a => a.name === filteredTeam[0].league);

        }

    }

    countries     = countries.map((c,i)     => { return  <Option key={i} item={c} data={data} type="country" /> });
    leagues       = leagues.map((l,i)       => { return  <Option key={i} item={l} data={data} type="league" /> });
    teams         = teams.map((t,i)         => { return  <Option key={i} item={t} data={data} type="team" /> });
    types         = types.map((t,i)         => { return  <Option key={i} item={t} data={data} type="type" /> });
    directions    = directions.map((t,i)    => { return  <Option key={i} item={t} data={data} type="direction" /> });

    //

    return (

        <div>
            Filters
            <br />
            <br />
            <br />

            <select name="country" onChange={handleFilters}>

                <option value="">All Countries</option>
                { countries }

            </select>

            <select name="league" onChange={handleFilters}>

                <option value="">All Leagues</option>
                { leagues }

            </select>

            <select name="team" onChange={handleFilters}>

                <option value="">All Teams</option>
                { teams }

            </select>

            <select name="type" onChange={handleFilters}>

                <option value="">All types</option>
                { types }

            </select>

            <select name="direction" onChange={handleFilters}>

                <option value="">All directions</option>
                { directions }

            </select>

            <br />
            <br />
            <br />
        </div>

    )

}

export default Filters;