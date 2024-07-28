

import { ExclamationCircleFilled } from '@ant-design/icons';
import {
  Avatar, Button, Empty, Modal, Pagination, Result, Skeleton, Tag
} from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uniqueId } from 'uuid';
import useFetchData from '../../hooks/useFetchData';
import ApiService from '../../utils/apiService';
import notificationWithIcon from '../../utils/notification';
import { vehicleStatusAsResponse, vehicleTypeAsColor } from '../../utils/responseAsStatus';
import QueryOptions from '../shared/QueryOptions';
import VehicleEdit from './VehicleEdit';

const { confirm } = Modal;

function VehiclesList({ add }) {
  const [query, setQuery] = useState({
    search: '', sort: 'asce', page: '1', rows: '10'
  });
  const [vehicleEditModal, setVehicleEditModal] = useState(
    { open: false, vehicleId: null }
  );
  const [fetchAgain, setFetchAgain] = useState(false);

  // fetch room-list API data
  const [loading, error, response] = useFetchData(`/api/v1/all-vehicles-list?keyword=${query.search}&limit=${query.rows}&page=${query.page}&sort=${query.sort}`, fetchAgain);

  // reset query options
  useEffect(() => {
    setQuery((prevState) => ({ ...prevState, page: '1' }));
  }, [query.rows, query.search]);

  // function to handle delete
  const handleDeleteVehicle = (id) => {
    confirm({
      title: 'DELETE VEHICLE',
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure to delete this Vehicle permanently?',
      onOk() {
        return new Promise((resolve, reject) => {
          ApiService.delete(`/api/v1/delete-vehicle/${id}`)
            .then((res) => {
              if (res?.result_code === 0) {
                notificationWithIcon('success', 'SUCCESS', res?.result?.message || 'Vehicle deleted successful');
                setFetchAgain(!fetchAgain);
                resolve();
              } else {
                notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
                reject();
              }
            })
            .catch((err) => {
              notificationWithIcon('error', 'ERROR', err?.response?.data?.result?.error?.message || err?.response?.data?.result?.error || 'Sorry! Something went wrong. App server error');
              reject();
            });
        }).catch(() => notificationWithIcon('error', 'ERROR', 'Oops errors!'));
      }
    });
  };

  return (
    <div>
      {/* room list ― query section */}
      <QueryOptions query={query} setQuery={setQuery} />

      {/* room list ― content section */}
      <div className='w-full flex flex-row flex-wrap items-center justify-center gap-2'>
        {error ? (
          <Result
            title='Failed to fetch'
            subTitle={error}
            status='error'
          />
        ) : (
          <Skeleton loading={loading} paragraph={{ rows: 10 }} active>
            {response?.data?.rows?.length === 0 ? (
              <Empty
                className='mt-10'
                description={(<span>Sorry! No data was found!</span>)}
              />
            ) : (
              <div className='table-layout'>
                <div className='table-layout-container'>
                  <table className='data-table'>
                    {/* data table ― head */}
                    <thead className='data-table-head'>
                      <tr className='data-table-head-tr'>
                        <th className='data-table-head-tr-th' scope='col'>
                          Images
                        </th>
                        <th className='data-table-head-tr-th' scope='col'>
                          Vehicle Name
                        </th>
                        <th className='data-table-head-tr-th text-center' scope='col'>
                          Vehicle Type
                        </th>
                        <th className='data-table-head-tr-th' scope='col'>
                          Vehicle Price
                        </th>
                        <th className='data-table-head-tr-th' scope='col'>
                          Vehicle Size
                        </th>
                        <th className='data-table-head-tr-th text-center' scope='col'>
                          Vehicle Status
                        </th>
                        <th className='data-table-head-tr-th text-center' scope='col'>
                          Vehicle Actions
                        </th>
                      </tr>
                    </thead>

                    {/* data table ― body */}
                    <tbody>
                      {response?.data?.rows?.map((data) => (
                        <tr className='data-table-body-tr' key={uniqueId()}>
                          <td className='data-table-body-tr-td'>
                            <Avatar.Group>
                              {data?.vehicle_images?.map((image) => (
                                <Avatar
                                  key={uniqueId()}
                                  src={image.url}
                                  crossOrigin='anonymous'
                                  size='large'
                                />
                              ))}
                            </Avatar.Group>
                          </td>
                          <td className='data-table-body-tr-td'>
                            {data?.vehicle_name}
                          </td>
                          <td className='data-table-body-tr-td text-center'>
                            <Tag
                              className='text-center uppercase'
                              color={vehicleTypeAsColor(data?.vehicle_type)}
                            >
                              {data?.vehicle_type}
                            </Tag>
                          </td>
                          <td className='data-table-body-tr-td !lowercase'>
                            {`$ ${data?.vehicle_price}`}
                          </td>
                          <td className='data-table-body-tr-td'>
                            {`${data?.vehicle_size} sq. ft.`}
                          </td>
                          <td className='data-table-body-tr-td text-center'>
                            <Tag
                              className='w-[80px] text-center uppercase'
                              color={vehicleStatusAsResponse(data?.vehicle_status).color}
                            >
                              {vehicleStatusAsResponse(data?.vehicle_status).level}
                            </Tag>
                          </td>
                          <td className='data-table-body-tr-td !px-0 text-center'>
                            <Button
                              className='inline-flex items-center !px-2'
                              onClick={() => add(data?.id)}
                              type='link'
                            >
                              View
                            </Button>
                            <Button
                              className='inline-flex items-center !px-2'
                              onClick={() => setVehicleEditModal(
                                (prevState) => ({ ...prevState, open: true, vehicleId: data?.id })
                              )}
                              type='link'
                            >
                              Edit
                            </Button>
                            <Button
                              className='inline-flex items-center !px-2'
                              onClick={() => handleDeleteVehicle(data?.id)}
                              type='link'
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Skeleton>
        )}
      </div>

      {/* room list ― pagination */}
      {response?.data?.total_page > 1 && (
        <Pagination
          className='my-5'
          onChange={(e) => setQuery((prevState) => ({ ...prevState, page: e }))}
          total={response?.data?.total_page * 10}
          current={response?.data?.current_page}
        />
      )}

      {/* room edit modal component */}
      {vehicleEditModal.open && (
        <VehicleEdit
          roomVehicleModal={vehicleEditModal}
          setRoomVehicleModal={setVehicleEditModal}
        />
      )}
    </div>
  );
}

export default React.memo(VehiclesList);
