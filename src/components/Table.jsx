import Btn from "./Btn"

export default function Table({ data, columns, actions }) {
    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr className="text-center">
                    {columns.map((col, index) => (
                        <th key={index}>{col.header}</th>
                    ))}
                    {actions && <th>Actions</th>}
                </tr>
            </thead>
            <tbody>
                {data?.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex}>{item[col.accessor]}</td>
                        ))}
                        {actions && (
                            <td className="d-flex justify-content-evenly">
                                {actions.map((action, actionIndex) => (
                                    <Btn 
                                        key={actionIndex}
                                        buttonClass={action.buttonClass} 
                                        content={action.content} 
                                        onClick={() => action.onClick(item)} 
                                    />
                                ))}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}