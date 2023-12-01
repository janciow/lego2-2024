const SimpleTable = (props) => {
    const { list, key1, key2 } = props
    return (
        <>
            <table >
                <thead>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item) => (
                        <tr key={item[key1]}>
                            <td>{item[key1]}</td>
                            <td>{item[key2]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default SimpleTable;