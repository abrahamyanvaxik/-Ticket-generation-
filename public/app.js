document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
});

// const deleteBtn = document.querySelector('.js-remove');

// deleteBtn.addEventListener('click', event => {
//     const id = event.target.dataset.id;
//     fetch('/card/delete/' + id,{
//         method: 'delete'
//     }).then(res => res.json())
//     .then((card) => {
//         if (card.courses.length){
//             const table = document.querySelector('.table-body')
//             const html = card.courses.map((cours) => {
//                 return `
//                  <tr>
//                      <td>${cours.title}</td>
//                     <td>${cours.count}</td>
//                     <td style="text-align: center;">
//                         <button class="btn btn-denger btn-small js-remove" data-id="${cours.id}">Delete</button>
//                     </td>
//                 </tr>`
//             });
//             table.innerHTML = html;
//
//
//
//             const price = document.querySelector('.card-price');
//             price.innerHTML = `<p>Price: ${card.price}</p>`;
//
//         } else {
//            const card = document.querySelector('.card');
//            card.innerHTML = '<p>No data avalable.</p>';
//         }
//     })
// })