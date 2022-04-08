import * as React from 'react'
import testImage from '../../static/miss_merkel.jpeg'

export const List = () => {
  return (
    <>
      <table className='list'>
        <thead>
          <tr>
            <th className='list-header'>Bild</th>
            <th className='list-header'>Titel</th>
            <th className='list-header'>AutorIn</th>
            <th className='list-header'>Zustand</th>
            <th className='list-header'>Verliehen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={testImage} alt='Miss Merkel' className='list-img' />
            </td>
            <td>Miss Merkel</td>
            <td>David Safier</td>
            <td>Gut</td>
            <td>Lenosaurus</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
