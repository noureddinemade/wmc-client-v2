const Players = props => {

    const { players, handleChange } = props;

    const results = players.map((p, i) => {

        return (

            <p key={i}>{p.name} | in: {p.in.team} | out: {p.out.team} | type: {p.type}</p>

        )

    })

    return (

        <div>
            { results }
        </div>

    )

}

export default Players;