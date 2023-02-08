function insertGroup(equipments, item, id) {
  let obj = {}
  obj.label = item.groupName
  obj.id = id
  obj.alarmLevel = item.alarmLevel
  obj.children = [
    {
      label: item.companyName,
      id: id++,
      alarmLevel: item.alarmLevel,
      children: [
        {
          label: item.factoryName,
          id: id++,
          alarmLevel: item.alarmLevel,
          children: [
            {
              label: item.unitName,
              id: id++,
              alarmLevel: item.alarmLevel,
              children: [
                {
                  label: item.equipmentName,
                  id: id++,
                  uuid: item.equipmentUuid,
                  alarmLevel: item.alarmLevel,
                  equipmentType: item.equipmentType,
                  isEquipment: true
                }
              ]
            }
          ]
        }
      ]
    }
  ]
  // console.log(obj)
  equipments.push(obj)
  // id += 5
}

function insertCompany(equipments, item, id) {
  let obj = {}
  obj.label = item.companyName
  obj.id = id
  obj.alarmLevel = item.alarmLevel
  obj.children = [
    {
      label: item.factoryName,
      id: id++,
      alarmLevel: item.alarmLevel,
      children: [
        {
          label: item.unitName,
          id: id++,
          alarmLevel: item.alarmLevel,
          children: [
            {
              label: item.equipmentName,
              id: id++,
              alarmLevel: item.alarmLevel,
              uuid: item.equipmentUuid,
              equipmentType: item.equipmentType,
              isEquipment: true
            }
          ]
        }
      ]
    }
  ]
  // console.log(obj)
  equipments.forEach(e => {
    if (e.label === item.groupName) {
      e.alarmLevel = item.alarmLevel == 5 ? 5 : e.alarmLevel
      e.children.push(obj)
      return;
    }
  })
  // id += 4
}

function insertFactory(equipments, item, id) {
  let obj = {}
  obj.label = item.factoryName
  obj.id = id
  obj.alarmLevel = item.alarmLevel
  obj.children = [
    {
      label: item.unitName,
      id: id++,
      alarmLevel: item.alarmLevel,
      children: [
        {
          label: item.equipmentName,
          id: id++,
          alarmLevel: item.alarmLevel,
          uuid: item.equipmentUuid,
          equipmentType: item.equipmentType,
          isEquipment: true
        }
      ]
    }
  ]
  // console.log(obj)
  equipments.forEach(g => {
    if (g.label === item.groupName) {
      g.alarmLevel = item.alarmLevel == 5 ? 5 : g.alarmLevel
      g.children.forEach(c => {
        if (c.label === item.companyName) {
          c.alarmLevel = item.alarmLevel == 5 ? 5 : c.alarmLevel
          c.children.push(obj)
        }
      })
    }
  })
  // id += 3
}

function insertUnit(equipments, item, id) {
  let obj = {}
  obj.label = item.unitName
  obj.id = id
  obj.alarmLevel = item.alarmLevel
  obj.children = [
    {
      label: item.equipmentName,
      id: id++,
      alarmLevel: item.alarmLevel,
      uuid: item.equipmentUuid,
      equipmentType: item.equipmentType,
      isEquipment: true
    }
  ]
  // console.log(obj)
  equipments.forEach(g => {
    if (g.label === item.groupName) {
      g.alarmLevel = item.alarmLevel == 5 ? 5 : g.alarmLevel
      g.children.forEach(c => {
        if (c.label === item.companyName) {
          c.alarmLevel = item.alarmLevel == 5 ? 5 : c.alarmLevel
          c.children.forEach(f => {
            if (f.label === item.factoryName) {
              f.alarmLevel = item.alarmLevel == 5 ? 5 : f.alarmLevel
              f.children.push(obj)
              // console.log(f.children)
            }
          })
        }
      })
    }
  })
  // id += 2
}

function insertEquipment(equipments, item, id) {
  let obj = {}
  obj.label = item.equipmentName
  obj.id = id++
  obj.uuid = item.equipmentUuid
  obj.alarmLevel = item.alarmLevel
  obj.isEquipment = true
  obj.equipmentType = item.equipmentType
  // console.log(obj)
  equipments.forEach(g => {
    if (g.label === item.groupName) {
      g.alarmLevel = item.alarmLevel == 5 ? 5 : g.alarmLevel
      g.children.forEach(c => {
        if (c.label === item.companyName) {
          c.alarmLevel = item.alarmLevel == 5 ? 5 : c.alarmLevel
          c.children.forEach(f => {
            if (f.label === item.factoryName) {
              f.children.forEach(u => {
                f.alarmLevel = item.alarmLevel == 5 ? 5 : f.alarmLevel
                if (u.label === item.unitName) {
                  u.alarmLevel = item.alarmLevel == 5 ? 5 : u.alarmLevel
                  u.children.push(obj)
                }
              })
            }
          })
        }
      })
    }
  })
  // id += 1
}

export const insert = {
  insertGroup,
  insertCompany,
  insertFactory,
  insertUnit,
  insertEquipment
}
