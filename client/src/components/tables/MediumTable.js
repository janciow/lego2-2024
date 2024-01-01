const MediumTable = (props) => {
    const { fields = [], rows = [] } = props;


    return (
        <>
            <table >
                <thead>
                    <tr>
                        {fields.map(({ name }) => (
                            <th>{name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row[fields[0].name]}>
                            {fields.map(({ name }) => (
                                <td>{row[name]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default MediumTable;