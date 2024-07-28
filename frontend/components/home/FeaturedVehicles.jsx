

import React from 'react';
import { v4 as uniqueId } from 'uuid';
import Vehicle from '../shared/Vehicle';
import Title from './Title';

function FeaturedVehicles({ featuredVehicle }) {
  return (
    <section className='featured-vehicles'>
      <Title title='featured vehicles' />

      <div className='featured-vehicles-center'>
        {featuredVehicle?.map((vehicle) => (
          <Vehicle key={uniqueId()} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedVehicles;
