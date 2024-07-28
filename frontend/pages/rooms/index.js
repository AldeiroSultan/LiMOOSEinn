

import { Empty, Result, Skeleton } from 'antd';
import axios from 'axios';
import getConfig from 'next/config';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Banner from '../../components/home/Banner';
import Hero from '../../components/home/Hero';
import MainLayout from '../../components/layout';
import VehicleFilter from '../../components/vehicles/VehiclesFilter';
import VehicleList from '../../components/vehicles/VehiclesList';

const { publicRuntimeConfig } = getConfig();

function Vehicles(props) {
  const [ourVehicles, setOurVehicles] = useState([]);
  const [ourFilteredVehicles, setOurFilteredVehicles] = useState([]);

  // if props rooms exists to setOurVehicles
  useEffect(() => {
    if (props?.vehicles) {
      setOurVehicles(props?.vehicles?.data?.rows);
      setOurFilteredVehicles(props?.vehicles?.data?.rows);
    }
  }, [props]);

  return (
    <MainLayout title='Beach Resort ― Vehicles'>
      <Hero hero='vehiclesHero'>
        <Banner title='our vehicles'>
          <Link className='btn-primary' href='/'>
            return home
          </Link>
        </Banner>
      </Hero>

      {/* featured rooms */}
      <Skeleton loading={!props?.vehicles && !props?.error} paragraph={{ rows: 10 }} active>
        {props?.vehicles?.data?.rows?.length === 0 ? (
          <Empty
            className='mt-10'
            description={(<span>Sorry! Any data was not found.</span>)}
          />
        ) : props?.error ? (
          <Result
            title='Failed to fetch'
            subTitle={props?.error?.message || 'Sorry! Something went wrong. App server error'}
            status='error'
          />
        ) : (
          <>
            <VehicleFilter
              ourVehicles={ourVehicles}
              setOurFilteredVehicles={setOurFilteredVehicles}
            />
            <VehicleList
              vehicles={ourFilteredVehicles}
            />
          </>
        )}
      </Skeleton>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch data from the server-side API
    const response = await axios.get(`${publicRuntimeConfig.API_BASE_URL}/api/v1/all-vehicles-list`);
    const vehicles = response?.data?.result;

    return {
      props: {
        vehicles,
        error: null
      }
    };
  } catch (err) {
    return {
      props: {
        vehicles: null,
        error: err?.data
      }
    };
  }
}

export default vehicles;
