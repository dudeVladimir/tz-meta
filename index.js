const $facultiesTable = document.querySelector('.faculties')
const $checkedTable = document.querySelector('.checked')

import faculties from './faculties.js'
const checked = []

function renderRows(arr, $el) {
  $el.querySelectorAll('button').forEach((e) => {
    arr.length === 0 ? (e.disabled = true) : (e.disabled = false)
  })

  if (arr.length === 0 && !$el.querySelector('.empty')) {
    const $tr = document.createElement('tr')
    $tr.classList.add('empty')
    $tr.innerHTML = `
    <td></td>
    <td>Список пуст</td>
    <td></td>
  `
    $el.append($tr)
    if ($el.querySelector('.body')) $el.querySelector('.body').remove()
  } else {
    if ($el.querySelector('.body')) $el.querySelector('.body').remove()
    if ($el.querySelector('.empty')) $el.querySelector('.empty').remove()

    const $tbody = document.createElement('tbody')
    $tbody.classList.add('body')
    $el.append($tbody)

    arr.forEach((e) => {
      const $tr = document.createElement('tr')

      $tr.innerHTML = `
      <td><input type="checkbox" id=${e.id}></td>
      <td>${e.id}</td>
      <td>${e.data.name}</td>
    `
      $tbody.append($tr)
    })
    addEl($el)
  }
}

sortArr(checked, $checkedTable)
sortArr(faculties, $facultiesTable)

function sortArr(arr, $el) {
  $el.querySelectorAll('button').forEach((e) => {
    if (e.textContent === 'ID') {
      e.addEventListener('click', () => {
        renderRows(
          arr.sort((a, b) => {
            if (a.id < b.id) return -1
            if (a.id > b.id) return 1
            return 0
          }),
          $el
        )
      })
    } else {
      e.addEventListener('click', () => {
        renderRows(
          arr.sort((a, b) => a.data.name.localeCompare(b.data.name)),
          $el
        )
      })
    }
  })
}

function addEl($el) {
  const $inputs = $el.querySelectorAll('input')
  if ($el === $checkedTable) {
    $inputs.forEach((e) => {
      e.checked = true
    })
  }
  $inputs.forEach((e, idx) => {
    e.addEventListener('click', () => {
      if ($el === $facultiesTable) {
        checked.push(faculties[idx])
        faculties.splice(idx, 1)
      } else {
        faculties.push(checked[idx])
        checked.splice(idx, 1)
      }
      renderRows(faculties, $facultiesTable)
      renderRows(checked, $checkedTable)
    })
  })
}

renderRows(faculties, $facultiesTable)
renderRows(checked, $checkedTable)
