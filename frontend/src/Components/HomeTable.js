import React from "react";
import Table from "react-bootstrap/Table";

const HomeTable = (props) => {
  return (
    <div className={props.css.tablestyle}>
      <h1>Travel Providers</h1>
      <Table striped size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Travel Agency</th>

            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Ramesh</td>
            <td>+91 9928569011</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Dev Pari</td>
            <td>+91 9928700018</td>

          </tr>
          <tr>
            <td>3</td>
            <td>Gyaanchand Cab</td>
            <td>+91 7976738016</td>
        
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default HomeTable;
