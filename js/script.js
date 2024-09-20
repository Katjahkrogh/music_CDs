'use strict';

const cdTableBody = document.querySelector('#cdTableBody');

function saveData() {
    localStorage.setItem("cd-data", cdTableBody.innerHTML);
}

function showData() {
    const savedData = localStorage.getItem("cd-data");
    if (savedData) {
    cdTableBody.innerHTML = savedData;

    document.querySelectorAll('.deleteCdBtn').forEach(button => {
        button.addEventListener('click', function() {
        this.closest('tr').remove();
        saveData(); 
        });
    });
    }
}

document.querySelector('#frmCD').addEventListener('submit', (e) => {
    e.preventDefault();

    const author = e.target.txtAuthor.value;
    const title = e.target.txtTitle.value;
    const year = parseFloat(e.target.txtYear.value);

    if (author && title && year) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td class="cd-artist">${author}</td>
            <td class="cd-title">${title}</td>
            <td class="cd-year">${year}</td>
            <td>
                <button class="deleteCdBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#025959" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>
            </td>
        `;

    document.querySelector('#cdTableBody').appendChild(newRow);

    newRow.querySelector('.deleteCdBtn').addEventListener('click', function () {
        this.closest('tr').remove();
        saveData();
    });

    saveData();

    e.target.txtAuthor.value = '';
    e.target.txtTitle.value = '';
    e.target.txtYear.value = '';
    
    } else {
        alert('Please fill in all fields.');
    }
});

showData();
