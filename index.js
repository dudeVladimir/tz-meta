const $facultiesTable = document.querySelector('.faculties')
const $checkedTable = document.querySelector('.checked')

import faculties from './faculties.js'
const checked = []

function renderRows(arr, $el) {
  if (arr.length === 0) {
    const $tr = document.createElement('tr')
    $tr.classList.add('empty')
    $tr.innerHTML = `
    <td></td>
    <td>Список пуст</td>
    <td></td>
  `
    $el.append($tr)
    $el.querySelectorAll('button').forEach((e) => {
      e.classList.add('disabled')
    })
  } else {
    if ($el.querySelector('.body')) {
      $el.querySelector('.body').remove()
    }
    if ($el.querySelector('.empty')) {
      $el.querySelector('.empty').remove()
    }
    const $tbody = document.createElement('tbody')
    $tbody.classList.add('body')
    $el.append($tbody)

    arr.forEach((e) => {
      const $tr = document.createElement('tr')

      $tr.innerHTML = `
      <td><input type="checkbox" id=${e.data.name}-${e.id}></td>
      <td>${e.id}</td>
      <td>${e.data.name}</td>
    `
      $tbody.append($tr)
      $el.querySelectorAll('button').forEach((e) => {
        e.classList.remove('disabled')
      })
    })
  }
}
renderRows(faculties, $facultiesTable)
renderRows(checked, $checkedTable)

$facultiesTable.querySelectorAll('button').forEach((e) => {
  if (e.textContent === 'ID') {
    e.addEventListener('click', () => {
      renderRows(
        faculties.sort((a, b) => {
          if (a.id < b.id) return -1
          if (a.id > b.id) return 1
          return 0
        }),
        $facultiesTable
      )
    })
  } else {
    e.addEventListener('click', () => {
      renderRows(
        faculties.sort((a, b) => a.data.name.localeCompare(b.data.name)),
        $facultiesTable
      )
    })
  }
})
