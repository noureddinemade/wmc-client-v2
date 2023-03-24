/* eslint-disable array-callback-return */

const Option = props => {

    const { data, item, type } = props;

    // Check if there are transfers for this option

    let state   = false;
    let result  = false;

    if (type === 'country')     result = data.transfers.filter((a) => { return (a.in.country.includes(item.name) || a.out.country.includes(item.name)) });
    if (type === 'league')      result = data.transfers.filter((a) => { return (a.in.league.includes(item.name) || a.out.league.includes(item.name)) });
    if (type === 'team')        result = data.transfers.filter((a) => { return (a.in.team.includes(item.name) || a.out.team.includes(item.name)) });
    if (type === 'type')        result = data.transfers.filter((a) => { return a.type.includes(item.name) });

    if (result && result.length < 1) state = true

    //

    return (

        <option value={item.name} disabled={state}>{item.name}</option>

    )

}

export default Option