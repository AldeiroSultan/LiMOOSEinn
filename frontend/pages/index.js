

import { Empty, Result, Skeleton } from 'antd';
import axios from 'axios';
import getConfig from 'next/config';
import Link from 'next/link';
import React from 'react';
import Banner from '../components/home/Banner';
import FeaturedVehicles from '../components/home/FeaturedVehicles';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import MainLayout from '../components/layout';

const { publicRuntimeConfig } = getConfig();

function Home(props) {
  return (
    <MainLayout title='Beach Resort ― Home'>
      <Hero>
        <Banner
          title='luxurious vehicles'
          subtitle='deluxe vehicles starting at $299'
        >
          <Link href='/vehicles' className='btn-primary'>
            our vehicles
          </Link>
        </Banner>
      </Hero>
      <Services />

      {/* featured rooms */}
      <Skeleton loading={!props?.featuredVehicles && !props?.error} paragraph={{ rows: 5 }} active>
        {props?.featuredVehicles?.data?.rows?.length === 0 ? (
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
          <FeaturedVehicles
            featuredVehicle={props?.featuredVehicles?.data?.rows}
          />
        )}
      </Skeleton>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch data from the server-side API
    const response = await axios.get(`${publicRuntimeConfig.API_BASE_URL}/api/v1/featured-vehicles-list`);
    const featuredVehicles = response?.data?.result;

    return {
      props: {
        featuredVehicles,
        error: null
      }
    };
  } catch (err) {
    return {
      props: {
        featuredVehicles: null,
        error: err?.data
      }
    };
  }
}

export default Home;
