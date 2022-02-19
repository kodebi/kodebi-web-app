import * as React from 'react'

const List = () => {
  return (
    <>
      <table className='list'>
        <thead>
          <tr>
            <th className='list-header'>Bild</th>
            <th className='list-header'>Titel</th>
            <th className='list-header'>AutorIn</th>
            <th className='list-header'>Zustand</th>
            <th className='list-header'>Verliehen an</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kein Bild vorhanden</td>
            <td>Miss Merkel</td>
            <td>David Sergert</td>
            <td>Gut</td>
            <td>Lenosaurus</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default List
