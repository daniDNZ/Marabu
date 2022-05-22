const Pagination = (data, fetchMethod, callback, filter = {}) => {
    // Pagination
 
    let pages = [];
    let arrPages;
    
    if (data.thisPage == 1) {
        
        arrPages = [];
        for (let i = 1; i <= data.maxPages && i <= 3; i++) {
            arrPages.push(i)
        }
        pages = arrPages;
        

    } else if (data.thisPage == data.maxPages) {

        arrPages = [];
        for (let i = data.maxPages; i >= 1 && i >= data.maxPages - 2; i--) {
            arrPages.push(i)
        }
            
        pages = arrPages.reverse();

    } else {
        pages = [data.thisPage-1, data.thisPage, data.thisPage+1];
    }
        
    let paginator = `
        <li class="page-item">
            <a class="page-link" href="#" id="prev" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
    `;

    pages.forEach(p => {
        
        p === data.thisPage
            ? paginator += 
                `
                    <li class="page-item active"><a class="page-link page-number" href="#">${p}</a></li>
                `
            : paginator += 
                `
                    <li class="page-item"><a class="page-link page-number" href="#">${p}</a></li>
                `;
    });

    paginator +=
    `
        <li class="page-item">
            <a class="page-link" href="#" id="next" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    `

    
    const pagination = document.getElementById('pagination');

    pagination.innerHTML = paginator;

    // Paginator listeners

    const handlePagination = (e) => {
        e.preventDefault();
       
        const pageNumber = e.target.textContent;
        fetchMethod(callback, pageNumber, filter);
    }
    
    const handlePaginationNext = (e) => {
        e.preventDefault();
        let pageNumber = data.thisPage;
        pageNumber == data.maxPages ? pageNumber = data.maxPages : pageNumber++;
        fetchMethod(callback, pageNumber, filter);
    }
    
    const handlePaginationPrev = (e) => {
        e.preventDefault();
        let pageNumber = data.thisPage;
        pageNumber == 1 ? pageNumber = 1 : pageNumber--;
        fetchMethod(callback, pageNumber, filter);
    }

    const paginationItems = document.querySelectorAll('.page-number');
    document.getElementById('next').addEventListener('click', handlePaginationNext);
    document.getElementById('prev').addEventListener('click', handlePaginationPrev);

    paginationItems.forEach(e => {
        // MIRAR CÓMO HACER EL FECTH PARA DEVOLVER LOS CAMPOS (DÓNDE PONER EL HANDLE, CÓMO DEVOLVER LA PÁGINA ACTUAL, ETC)
        e.addEventListener('click', handlePagination);
    });
}


export { Pagination };