

import { PlusOutlined } from '@ant-design/icons';
import {
  Button, Checkbox, Form, Input, InputNumber, Modal, Result, Select, Upload
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import EF from '../../assets/data/extra-facilities.json';
import useFetchData from '../../hooks/useFetchData';
import { reFetchData } from '../../store/slice/appSlice';
import ApiService from '../../utils/apiService';
import notificationWithIcon from '../../utils/notification';
import PageLoader from '../shared/PageLoader';

function VehicleEdit({ vehicleEditModal, setVehicleEditModal }) {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // fetch room-details API data
  const [fetchLoading, fetchError, fetchResponse] = useFetchData(
    `/api/v1/get-vehicle-by-id-or-brand-name/${vehicleEditModal.vehicleId}`
  );

  // set form data from API data
  useEffect(() => {
    if (fetchResponse) {
      form.setFieldsValue({
        vehicle_name: fetchResponse?.data?.vehicle_name || undefined,
        vehicle_brand: fetchResponse?.data?.vehicle_brand || undefined,
        vehicle_type: fetchResponse?.data?.vehicle_type || undefined,
        vehicle_price: fetchResponse?.data?.vehicle_price || undefined,
        vehicle_size: fetchResponse?.data?.vehicle_size || undefined,
        vehicle_capacity: fetchResponse?.data?.vehicle_capacity || undefined,
        allow_pets: fetchResponse?.data?.allow_pets || false,
        allow_eating: fetchResponse?.data?.allow_eating || false,
        featured_vehicle: fetchResponse?.data?.featured_vehicle || false,
        vehicle_description: fetchResponse?.data?.vehicle_description || undefined,
        extra_facilities: fetchResponse?.data?.extra_facilities || undefined,
        vehicle_images: fetchResponse?.data?.vehicle_images || undefined
      });
    }
  }, [fetchResponse, form]);

  const normFile = (e) => {
    if (Array.isArray(e)) { return e; }
    return e?.fileList;
  };

  // function to handle create new room
  const onFinish = (values) => {
    const formdata = new FormData();
    formdata.append('vehicle_name', values.vehicle_name);
    formdata.append('vehicle_brand', values.vehicle_brand);
    formdata.append('vehicle_type', values.vehicle_type);
    formdata.append('vehicle_price', values.vehicle_price);
    formdata.append('vehicle_size', values.vehicle_size);
    formdata.append('vehicle_capacity', values.vehicle_capacity);
    formdata.append('allow_pets', values?.allow_pets || false);
    formdata.append('allow eeating', values?.allow_eating || false);
    formdata.append('featured_vehicle', values?.featured_vehicle || false);
    formdata.append('vehicle_description', values.vehicle_description);

    // eslint-disable-next-line no-restricted-syntax
    for (const facilities of values.extra_facilities) {
      formdata.append('extra_facilities', facilities);
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const images of values.vehicle_images) {
      formdata.append('vehicle_images', images.originFileObj);
    }

    setLoading(true);
    ApiService.put(`/api/v1/edit-vehicle/${vehicleEditModal.vehicleId}`, formdata, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((response) => {
        setLoading(false);
        if (response?.result_code === 0) {
          notificationWithIcon('success', 'SUCCESS', response?.result?.message || 'Vehicle updating successful');
          form.resetFields();
          dispatch(reFetchData());
          setVehicleEditModal((prevState) => ({ ...prevState, open: false }));
        } else {
          notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
        }
      })
      .catch((err) => {
        setLoading(false);
        notificationWithIcon('error', 'ERROR', err?.response?.data?.result?.error?.message || err?.response?.data?.result?.error || 'Sorry! Something went wrong. App server error');
      });
  };

  return (
    <Modal
      title='Edit Vehicle Information'
      open={vehicleEditModal.open}
      onOk={() => setVehicleEditModal(
        (prevState) => ({ ...prevState, open: false })
      )}
      onCancel={() => setVehicleEditModal(
        (prevState) => ({ ...prevState, open: false })
      )}
      footer={[]}
      width={1200}
      centered
    >
      {fetchLoading ? (<PageLoader />) : fetchError ? (
        <Result
          title='Failed to fetch'
          subTitle={fetchError}
          status='error'
        />
      ) : (
        <Form
          form={form}
          className='login-form'
          name='vehicle-edit-form'
          onFinish={onFinish}
          layout='vertical'
        >
          <div className='two-grid-column'>
            <Form.Item
              className='w-full md:w-1/2'
              label='Vehicle Name'
              name='vehicle_name'
              rules={[{
                required: true,
                message: 'Please input your Vehicle Name!'
              }]}
            >
              <Input
                placeholder='Vehicle Name'
                size='large'
                type='text'
                allowClear
              />
            </Form.Item>

            <Form.Item
              className='w-full md:w-1/2'
              label='Vehicle Brand'
              name='vehicle_brand'
              rules={[{
                required: true,
                message: 'Please input your Vehicle Brand!'
              }]}
            >
              <Input
                placeholder='Vehicle Brand'
                size='large'
                type='text'
                allowClear
              />
            </Form.Item>
          </div>

          <div className='two-grid-column'>
            <Form.Item
              className='w-full md:w-1/2'
              label='Vehicle Type'
              name='vehicle_type'
              rules={[{
                required: true,
                message: 'Please input your Vehicle Type!'
              }]}
            >
              <Select
                placeholder='-- select vehicle type --'
                optionFilterProp='children'
                options={[
                  { value: 'sedan', label: 'Sedan' },
                  { value: 'coupe', label: 'Coupe' },
                  { value: 'luxury', label: 'Luxury' }
                ]}
                size='large'
                allowClear
              />
            </Form.Item>

            <Form.Item
              className='w-full md:w-1/2'
              label='Vehicle Price'
              name='vehicle_price'
              rules={[{
                required: true,
                message: 'Please input your Vehicle Price!'
              }]}
            >
              <InputNumber
                className='w-full'
                placeholder='Vehicle Price'
                type='number'
                size='large'
                min={1}
                max={100000}
              />
            </Form.Item>
          </div>

          <div className='two-grid-column'>
            <Form.Item
              className='w-full md:w-1/2'
              label='Vehicle Size'
              name='vehicle_size'
              rules={[{
                required: true,
                message: 'Please input your Vehicle Size!'
              }]}
            >
              <InputNumber
                className='w-full'
                placeholder='Vehicle Size'
                type='number'
                size='large'
                min={1}
                max={1000}
              />
            </Form.Item>

            <Form.Item
              className='w-full md:w-1/2'
              label='Vehicle Capacity'
              name='vehicle_capacity'
              rules={[{
                required: true,
                message: 'Please input your Vehicle Capacity!'
              }]}
            >
              <InputNumber
                className='w-full'
                placeholder='Vehicle Capacity'
                type='number'
                size='large'
                min={1}
                max={10}
              />
            </Form.Item>
          </div>

          <Form.Item
            label='Vehicle Description'
            name='vehicle_description'
            rules={[{
              required: true,
              message: 'Please input your Vehicle Description!'
            }]}
          >
            <Input.TextArea
              placeholder='Type here Vehicle Description'
              rows={4}
            />
          </Form.Item>

          <Form.Item
            label='Extra Facilities'
            name='extra_facilities'
            rules={[{
              required: true,
              message: 'Please input your Extra Facilities!'
            }]}
          >
            <Select
              placeholder='-- select vehicle extra facilities --'
              optionFilterProp='children'
              options={EF}
              mode='multiple'
              size='large'
              allowClear
            />
          </Form.Item>

          <Form.Item
            name='vehicle_images'
            label='Vehicle Images'
            valuePropName='fileList'
            getValueFromEvent={normFile}
            rules={[{
              required: true,
              message: 'Please input your Vehicle Images!'
            }]}
          >
            <Upload
              listType='picture-card'
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              accept='.jpg,.jpeg,.png,.pdf'
              beforeUpload={() => false}
              fileList={fileList}
              name='vehicle_images'
              maxCount={5}
            >
              {fileList.length >= 5 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>
                    Upload
                  </div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <div className='flex flex-col items-start justify-start gap-y-2'>
            <Form.Item name='allow_pets' valuePropName='checked' noStyle>
              <Checkbox className='ml-2.5'>Allow pets?</Checkbox>
            </Form.Item>
            <Form.Item name='allow_eating' valuePropName='checked' noStyle>
              <Checkbox>Allow Eating?</Checkbox>
            </Form.Item>
            <Form.Item name='featured_vehicle' valuePropName='checked' noStyle>
              <Checkbox>Featured Vehicle?</Checkbox>
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              className='login-form-button mt-4'
              htmlType='submit'
              type='primary'
              size='large'
              loading={loading}
              disabled={loading}
            >
              Update Room Info
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}

export default React.memo(RoomEdit);
