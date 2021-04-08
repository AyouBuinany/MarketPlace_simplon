import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import jumpTo from '../../../modules/Navigation'
import '../stylesheets/dropList.css'

export default function DropList({ categoryName, categories,clickCategory }) {
  console.log('categorie');
  console.log(categories);
  return (
    <NavDropdown title={categoryName}  >
      {categories && categories.map(c =>
        <NavDropdown.Item 
        onClick={()=>{
          clickCategory(c)
          jumpTo('/dashboard')
        }}  
        key={c}>{c}
        </NavDropdown.Item>
      )}
    </NavDropdown>
  )
}


