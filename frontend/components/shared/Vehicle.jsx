

import Link from 'next/link';
import React from 'react';

function Vehicle({ vehicle }) {
  return (
    <article className='vehicle'>
      <div className='img-container'>
        <img
          src={vehicle?.vehicle_images[0]?.url || '/img/jpeg/vehicle-1.jpeg'}
          alt='single vehicle'
        />

        <div className='price-top'>
          <h6>{`$ ${vehicle?.vehicle_price}`}</h6>
          <p>per night</p>
        </div>

        <Link
          className='btn-primary vehicle-link'
          href={`/vehicles/${vehicle?.vehicle_brand}`}
        >
          Feature
        </Link>
      </div>

      <p className='vehicle-info'>
        {vehicle?.vehicle_name}
      </p>
    </article>
  );
}

export default Vehicle;
