const MediumTable = (props) => {
    const { fields = [], rows = [], keyIndex = 0 } = props;

    const rowSelect = (row) => {
        console.log(row)
        props.onClick && props.onClick(row)
    }

    return (
        <>
            <table >
                <thead>
                    <tr>
                        {fields.map(({ name }) => (
                            <th key={name}>{name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row[fields[keyIndex].name]} onClick={() => rowSelect(row)} style={{ cursor: "pointer" }}>
                            {fields.map(({ name }) => (
                                <td key={row[name]}>{row[name]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default MediumTable;