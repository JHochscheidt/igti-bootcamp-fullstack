import React from 'react'

export default function GradesControl({grades, onDelete, onPersist}) {
    return (
        <div className="container center">
            <table className='striped'>
                <thead>
                    <tr>
                        <th>Aluno</th>
                        <th>Disciplina</th>
                        <th>Avaliação</th>
                        <th>Nota</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map( ({id, student, subject, type, value, isDeleted}) => {
                        return(
                            <tr key={id}>
                                <td>{student}</td>
                                <td>{subject}</td>
                                <td>{type}</td>
                                <td>{value}</td>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>

                </tfoot>
            </table>
        </div>
    )
}
