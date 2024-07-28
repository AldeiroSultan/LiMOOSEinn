

import React from 'react';
import { v4 as uniqueId } from 'uuid';
import Vehicle from '../shared/Vehicle';

export default function VehicleList({ vehicles }) {
  if (vehicles.length === 0) {
    return (
      <div className='empty-search'>
        <h3>unfortunately no vehicles matched your search parameters</h3>
      </div>
    );
  }

  return (
    <section className='vehicles-list'>
      <div className='vehicles-list-center'>
        {vehicles.map((vehicle) => (
          <Vehicle key={uniqueId()} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
}
