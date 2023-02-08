export function hasGroup(equipments, item) {
  if (equipments.length === 0) {
    return false
  }
  let flag = false
  equipments.forEach(group => {
    if (group.label === item.groupName) {
      flag = true
    }
  })
  return flag
}

export function hasCompany(equipments, item) {
  let flag = false
  equipments.forEach(group => {
    if (group.label === item.groupName) {
      group.children.forEach(com => {
        if (com.label === item.companyName) {
          flag = true
        }
      })
    }
  })
  return flag
}

export function hasFactory(equipments, item) {
  let flag = false
  equipments.forEach(group => {
    if (group.label === item.groupName) {
      group.children.forEach(com => {
        if (com.label === item.companyName) {
          com.children.forEach(fac => {
            if (fac.label === item.factoryName) {
              flag = true
            }
          })
        }
      })
    }
  })

  return flag
}

export function hasUnit(equipments, item) {
  let flag = false
  equipments.forEach(group => {
    if (group.label === item.groupName) {
      group.children.forEach(com => {
        if (com.label === item.companyName) {
          com.children.forEach(fac => {
            if (fac.label === item.factoryName) {
              fac.children.forEach(unit => {
                if (unit.label === item.unitName) {
                  flag = true
                }
              })
            }
          })
        }
      })
    }
  })

  return flag
}

function hasEquipment(equipments, item) {
  let flag = false
  equipments.forEach(group => {
    if (group.label === item.groupName) {
      group.children.forEach(com => {
        if (com.label === item.companyName) {
          com.children.forEach(fac => {
            if (fac.label === item.factoryName) {
              fac.children.forEach(unit => {
                if (unit.label === item.unitName) {
                  unit.children.forEach(e => {
                    if (e.label === item.equipmentName) {
                      flag = true
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })

  return flag
}

export const judge = {
  hasGroup,
  hasCompany,
  hasFactory,
  hasUnit,
  hasEquipment
}
