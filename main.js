let dataTable; //Esta variable contendra mi data Table
let dataTableIsInicialized=false;
const dataTableOptions = {
    lengthMenu: [5, 10, 15, 20, 100, 200, 500], //NUMERO DE registros por pagina
    //scrollX: "2000px",
    columnDefs: [
        { className: "centered", targets: [0, 1, 3, 4, 5] },
        { orderable: false, targets: [5, 6] }, // Columnas que no quiero que sean ordenables
        { searchable: false, targets: [0, 2, 3, 4, 5] } // Columnas que no quiero que se filtren en la busqueda
       // { width: "50%", targets: [0] }
    ],
    pageLength: 5,
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún usuario encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún usuario encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
};

const initDataTable=async()=>{ // Inicializacion del pluging Data Table
    if(dataTableIsInicialized){
        dataTable.destroy();
    }
    await listUsers();
    dataTable=$("#customers").DataTable(dataTableOptions);
    dataTableIsInicialized=true;

}


const listUsers=async()=>{
    try{
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        let users = await response.json();
        console.log(users)
        let html=''
        for (user of  users){
            let row = `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.address.city}</td>
            <td>${user.company.name}</td> 
            <td><i class="fa-solid fa-check" style="color: green;"></i></td>  
            <td>
            <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
            <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>`
        
            html = html + row;
        }
        document.querySelector('#customers > tbody').outerHTML = html;
    }
    catch(ex) {
        console.log(ex);
    }
}
window.addEventListener("load",async()=>{
    await initDataTable();
});