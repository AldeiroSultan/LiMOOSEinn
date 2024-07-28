

import { Button } from 'antd';
import axios from 'axios';
import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { v4 as uniqueId } from 'uuid';
import Banner from '../../components/home/Banner';
import MainLayout from '../../components/layout';
import StyledHero from '../../components/rooms/StyledHero';
import Loading from '../../components/shared/Loading';
import OrderPlaceModal from '../../components/utilities/OrderPlaceModal';
import VehicleReviewList from '../../components/utilities/VehicleReviewList';
import { getSessionToken, getSessionUser } from '../../utils/authentication';
import notificationWithIcon from '../../utils/notification';

const { publicRuntimeConfig } = getConfig();

function VehiclePreview(props) {
  const [bookingModal, setBookingModal] = useState({ open: false, vehicleId: null });
  const token = getSessionToken();
  const user = getSessionUser();
  const router = useRouter();

  // function to handle place booking order
  const handleOrder = () => {
    if (!token && !user) {
      notificationWithIcon('error', 'ERROR', 'Please Registration/Login first to place an order.');
      router.push('/auth/login');
    } else {
      setBookingModal((prevState) => (
        { ...prevState, open: true, vehicleId: props?.vehicle?.data?.id }
      ));
    }
  };

  return (
    <>
      <MainLayout title='Beach Resort ― Vehicles Preview'>
        {!props?.vehicle && !props?.error ? (
          <Loading />
        ) : props?.error ? (
          <div className='error'>
            <h3>{props?.error?.message || 'No such vehicle could be found!'}</h3>
            <Link className='btn-primary' href='/vehicles'>
              Back to vehicles
            </Link>
          </div>
        ) : (
          <>
            <StyledHero>
              <Banner title={`${props?.vehicle?.data?.vehicle_name} vehicle`}>
                <Link className='btn-primary' href='/vehicles'>
                  Back to vehicles
                </Link>
              </Banner>
            </StyledHero>

            <section className='single-vehicle'>
              <div className='single-vehicle-images'>
                {props?.vehicle?.data?.vehicle_images?.map((item) => (
                  <img
                    key={uniqueId()}
                    src={item?.url}
                    alt={item?.url || 'vehicle-details-img'}
                  />
                ))}
              </div>

              <div className='single-vehicle-info'>
                <article className='desc'>
                  <h3>Details:</h3>
                  <p>{props?.vehicle?.data?.vehicle_description}</p>
                </article>

                <article className='info'>
                  <h3>Information:</h3>
                  <h6>
                    {`Price : $ ${props?.vehicle?.data?.vehicle_price}`}
                  </h6>
                  <h6>
                    {`Size : ${props?.vehicle?.data?.vehicle_size} SQFT`}
                  </h6>
                  <h6>
                    Max capacity :
                    {' '}
                    {props?.vehicle?.data?.vehicle_capacity > 1
                      ? `${props?.vehicle?.data?.vehicle_capacity} people`
                      : `${props?.vehicle?.data?.vehicle_capacity} person`}
                  </h6>
                  <h6>{props?.vehicle?.data?.allow_pets ? 'pets allowed' : 'no pets allowed'}</h6>
                  <h6>{props?.vehicle?.data?.provide_breakfast && 'free breakfast included'}</h6>

                  {props?.vehicle?.data?.vehicle_status === 'available' ? (
                    <Button
                      className='btn-primary'
                      type='default'
                      size='large'
                      onClick={handleOrder}
                    >
                      Place Vehicle Booking Order
                    </Button>
                  ) : (
                    <Button
                      className='btn-primary'
                      type='default'
                      size='large'
                      disabled
                    >
                      Vehicle Unavailable! Can&#39;t Place Order
                    </Button>
                  )}
                </article>
              </div>

              {/* room reviews list */}
              <div className='single-vehicle-images'>
                {props?.vehicle?.data?.id && (
                  <VehicleReviewList vehicleId={props?.vehicle?.data?.id} />
                )}
              </div>
            </section>
          </>
        )}
      </MainLayout>

      {/* room booking order place modal */}
      {bookingModal.open && (
        <OrderPlaceModal
          bookingModal={bookingModal}
          setBookingModal={setBookingModal}
        />
      )}
    </>
  );
}

export async function getServerSideProps(ctx) {
  try {
    // Fetch data from the server-side API
    const response = await axios.get(
      `${publicRuntimeConfig.API_BASE_URL}/api/v1/get-vehicle-by-id-or-slug-name/${ctx.query.slug}`
    );
    const vehicle = response?.data?.result;

    return {
      props: {
        vehicle,
        error: null
      }
    };
  } catch (err) {
    return {
      props: {
        vehicle: null,
        error: err?.data
      }
    };
  }
}

export default VehiclePreview;
