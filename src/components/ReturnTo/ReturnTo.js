import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FilterBtn } from '../FilterBtn'

export const ReturnTo = () => {
  const history = useNavigate()
  const prevPath = () => history(-1)
  return (
    <>
      <FilterBtn onClick={prevPath}>zurück</FilterBtn>
    </>
  )
}
