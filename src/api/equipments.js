import request from '@/utils/request/request'

export const equipmentsInfo = request.get('/equipment/getAll')

// var id = 1

// allData.every((item) => {
//   if (hasObj(equipments, item.groupName)) {
//     if (hasObj(equipments.children, item.companyName)) {
//       if (hasObj(equipments.children.children, item.factoryName)) {
//         if (hasObj(equipments.children.children.children, item.unitName)) {
//           if (!hasObj(equipments.children.children.children.children, item.equipmentName)) {
//             insertEquipment(equipments, item.equipmentName)
//           }
//         } else {
//           insertUnit(equipments, item, id)
//         }
//       } else {
//         insertFactory(equipments, item, id)
//       }
//     } else {
//       insertCompany(equipments, item, id)
//     }
//   } else {
//     insertGroup(equipments, item, id)
//   }
// })