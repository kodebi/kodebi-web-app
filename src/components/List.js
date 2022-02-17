import * as React from 'react'

const List = () => {
  return (
    <>
      <table className='list'>
        <thead>
          <tr>
            <th>Buch?</th>
            <th>An?</th>
            <th>Wann?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Miss Merkel</td>
            <td>Lenosaurus</td>
            <td>23.12.2020</td>
          </tr>
          <tr>
            <td>The Lean Startup</td>
            <td>Muhlemann</td>
            <td>12.02.2022</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default List
