
//  */

// import {
//   Descriptions, Image, List, Result, Skeleton, Tag, Typography
// } from 'antd';
// import React from 'react';
// import { v4 as uniqueId } from 'uuid';
// import useFetchData from '../../hooks/useFetchData';
// import { vehicleStatusAsResponse, vehicleTypeAsColor } from '../../utils/responseAsStatus';

// function VehicleDetails({ id }) {
//   // fetch room-details API data
//   const [loading, error, response] = useFetchData(`/api/v1/get-vehicle-by-id-or-brand-name/${id}`);

//   return (
//     <Skeleton loading={loading} paragraph={{ rows: 10 }} active avatar>
//       {error ? (
//         <Result
//           title='Failed to fetch'
//           subTitle={error}
//           status='error'
//         />
//       ) : (
//         <Descriptions
//           title='Vehicle Information'
//           bordered
//         >
//           <Descriptions.Item label='Images' span={3}>
//             <Image.PreviewGroup>
//               {response?.data?.vehicle_images?.map((image) => (
//                 <Image
//                   key={uniqueId()}
//                   className='p-2'
//                   src={image?.url}
//                   crossOrigin='anonymous'
//                   alt='user-image'
//                   width={120}
//                   height={100}
//                 />
//               ))}
//             </Image.PreviewGroup>
//           </Descriptions.Item>

//           <Descriptions.Item
//             label={<span className='whitespace-nowrap'>Vehicle Name</span>}
//           >
//             {response?.data?.vehicle_name}
//           </Descriptions.Item>
//           <Descriptions.Item
//             label={<span className='whitespace-nowrap'>Vehicle Brand</span>}
//             span={2}
//           >
//             {response?.data?.vehicle_slug}
//           </Descriptions.Item>

//           <Descriptions.Item
//             label={<span className='whitespace-nowrap'>Vehicle Descriptions</span>}
//           >
//             <Tag
//               className='text-center uppercase'
//               color={vehicleTypeAsColor(response?.data?.vehicle_type)}
//             >
//               {response?.data?.vehicle_type}
//             </Tag>
//           </Descriptions.Item>
//           <Descriptions.Item
//             label={<span className='whitespace-nowrap'>Vehicle Price</span>}
//             span={2}
//           >
//             {`$ ${response?.data?.vehicle_price}`}
//           </Descriptions.Item>

//           <Descriptions.Item
//             label={<span className='whitespace-nowrap'>Vehicle Size</span>}
//           >
//             {`${response?.data?.vehicle_size} sq. ft.`}
//           </Descriptions.Item>
//           <Descriptions.Item
//             label={<span className='whitespace-nowrap'>Vehicle Capacity</span>}
//             span={2}
//           >
//             {`${response?.data?.vehicle_capacity} Person`}
//           </Descriptions.Item>

//           <Descriptions.Item label={<span className='whitespace-nowrap'>Allow Pets</span>}>
//             <Tag
//               className='w-[60px] text-center uppercase'
//               color={response?.data?.allow_pets ? 'success' : 'error'}
//             >
//               {response?.data?.allow_pets ? 'YES' : 'NO'}
//             </Tag>
//           </Descriptions.Item>
//           <Descriptions.Item
//             label={<span className='whitespace-nowrap'>Allow eating</span>}
//             span={2}
//           >
//             <Tag
//               className='w-[60px] text-center uppercase'
//               color={response?.data?.allow_eating ? 'success' : 'error'}
//             >
//               {response?.data?.allow_eating ? 'YES' : 'NO'}
//             </Tag>
//           </Descriptions.Item>

//           <Descriptions.Item
//             label={<span className='whitespace-nowrap'>Featured Vehicle</span>}
//           >
//             <Tag
//               className='w-[60px] text-center uppercase'
//               color={response?.data?.featured_vehicle ? 'success' : 'error'}
//             >
//               {response?.data?.featured_vehicle ? 'YES' : 'NO'}
//             </Tag>
//           </Descriptions.Item>
//           <Descriptions.Item
//             label={<span className='whitespace-nowrap'>Vehicle Status</span>}
//             span={2}
//           >
//             <Tag
//               className='w-[80px] text-center uppercase'
//               color={vehicleStatusAsResponse(response?.data?.vehicle_status).color}
//             >
//               {vehicleStatusAsResponse(response?.data?.vehicle_status).level}
//             </Tag>
//           </Descriptions.Item>

//           <Descriptions.Item
//             label={<span className='whitespace-nowrap'>Vehicle Last Update At</span>}
//           >
//             {response?.data?.updated_at?.split('T')[0]}
//           </Descriptions.Item>
//           <Descriptions.Item
//             label={<span className='whitespace-nowrap'>Vehicle Created At</span>}
//             span={2}
//           >
//             {response?.data?.created_at?.split('T')[0]}
//           </Descriptions.Item>

//           <Descriptions.Item
//             label={<span className='whitespace-nowrap'>Vehicle Descriptions</span>}
//             span={3}
//           >
//             {response?.data?.vehicle_description}
//           </Descriptions.Item>
//           <Descriptions.Item
//             label={<span className='whitespace-nowrap'>Extra Facilities</span>}
//             span={3}
//           >
//             <List
//               bordered
//               dataSource={response?.data?.extra_facilities}
//               renderItem={(item) => (
//                 <List.Item>
//                   <Typography.Text>{item}</Typography.Text>
//                 </List.Item>
//               )}
//             />
//           </Descriptions.Item>
//         </Descriptions>
//       )}
//     </Skeleton>
//   );
// }

// export default React.memo(VehicleDetails);
