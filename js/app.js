const loadNewsCategories = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(response => response.json())
        .then(detail => displayNewsCategories(detail.data.news_category))
}

const displayNewsCategories = categories => {

    const newsCategoriesContainer = document.getElementById('news-categories-container');

    categories.forEach(category => {
        // console.log(category.category_id);
        const categoryList = document.createElement('li');
        categoryList.classList.add('list-group-item');
        categoryList.innerHTML = `
        <a onclick="loadNewsCategoriesDetail('${category.category_id}')" class="nav-link" aria-current="page" href="#">${category.category_name}</a>
        `
        newsCategoriesContainer.appendChild(categoryList);

    });


}
const loadNewsCategoriesDetail = (idNewsCategories) => {
    toggleSpinner(true);
    const url = ` https://openapi.programming-hero.com/api/news/category/${idNewsCategories}`;
    fetch(url)
        .then(response => response.json())
        .then(detail => displayLoadNewsCategoriesDetail(detail.data));

}

const displayLoadNewsCategoriesDetail = newsCategoriesDetail => {
    console.log(newsCategoriesDetail);
    const itemsFounded = document.getElementById('input-flied');
    itemsFounded.value = `${newsCategoriesDetail.length}  items found for this category`;
    const detailContainer = document.getElementById('detail-container');
    detailContainer.innerHTML = '';

    newsCategoriesDetail.forEach(newsDetails => {
        // console.log(newsDetails.length);

        const newsCategoriesDetailDiv = document.createElement('div');
        newsCategoriesDetailDiv.classList.add('col');
        newsCategoriesDetailDiv.innerHTML = `
                    <div class="card h-100">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="${newsDetails.thumbnail_url}" class="img-fluid rounded m-3 " alt="...">
                            </div>
                            <div class="col-md-9">
                                <div class="card-body mt-4 me-4 mb-4">
                                    <h5 class="card-title fw-bold">${newsDetails.title}</h5>
                                    <p class="card-text">${newsDetails.details.slice(0, 650)}...</p>
                                    <div class= "d-flex justify-content-between align-items-center"> 
                                        <div class="d-flex align-items-center">
                                            <img src="${newsDetails.author.img}" class="author-img">
                                            <div>
                                                <p class="fw-bold">${newsDetails.author.name} </p>
                                                <p> ${newsDetails.author.published_date}</p>
                                            </div>
                                        </div>
                                        <div> <p class="fw-bold"> Total View: ${newsDetails.total_view}</p> </div>
                                        <div> <p class="fw-bold"> Rating: ${newsDetails.rating.number}</p> </div>
                                        <div> <i class="fa-solid fa-arrow-right"></i> </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
    `;
        detailContainer.appendChild(newsCategoriesDetailDiv);
    });
    toggleSpinner(false);

}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

loadNewsCategories();



