

import { Card, Statistic } from 'antd';
import React from 'react';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';

const formatter = (value) => <CountUp end={value} separator=',' />;
const gridStyle = { width: '50%', textAlign: 'center' };

function VehicleCard({ loading, data }) {
  const navigate = useNavigate();

  return (
    <Card
      className='w-full cursor-pointer md:w-[49.5%]'
      onClick={() => navigate('/main/hotel-rooms')}
      title='Vehicle information:'
      loading={loading}
    >
      <Card.Grid style={gridStyle}>
        <Statistic
          className='whitespace-normal lg:whitespace-nowrap'
          title='Total Vehicles'
          formatter={formatter}
          value={data?.total_vehicles || 0}
        />
      </Card.Grid>

      <Card.Grid style={gridStyle}>
        <Statistic
          className='whitespace-normal lg:whitespace-nowrap'
          title='Booked Vehicles'
          formatter={formatter}
          value={data?.booked_vehicles || 0}
        />
      </Card.Grid>

      <Card.Grid style={gridStyle}>
        <Statistic
          className='whitespace-normal lg:whitespace-nowrap'
          title='Available Vehicles'
          formatter={formatter}
          value={data?.available_vehicles || 0}
        />
      </Card.Grid>

      <Card.Grid style={gridStyle}>
        <Statistic
          className='whitespace-normal lg:whitespace-nowrap'
          title='Unavailable Vehicles'
          formatter={formatter}
          value={data?.unavailable_vehicles || 0}
        />
      </Card.Grid>
    </Card>
  );
}

export default VehicleCard;
