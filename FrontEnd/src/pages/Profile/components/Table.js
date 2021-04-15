import React from 'react'
import { Table } from 'react-bootstrap'

function TableCommande({commandes}) {

  console.log("commandes ");
  console.log({commandes});
    return (
        <div>
            <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>Id Commande</th>
      <th>Date de commande</th>
      <th>Quantity commande</th>
      <th>Total commande</th>
      <th>details commande</th>
    </tr>
  </thead>
  <tbody>
    {commandes }
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>
        </div>
    )
}

export default TableCommande

