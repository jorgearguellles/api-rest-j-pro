let maxPage;
let pageNumber = 1;
let infiniteScroll;

searchFormBtn.addEventListener('click', ()=> {
  location.hash = '#search=' + searchFormInput.value;
  searchFormInput.value = '';
});
trendingBtn.addEventListener('click', ()=> location.hash = '#trends');
arrowBtn.addEventListener('click', ()=> history.back());

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll',infiniteScroll, false);

function navigator(){
  console.log({location});

  if(infiniteScroll){
    window.removeEventListener('scroll', infiniteScroll, { passive: false });
    infiniteScroll = undefined;
  }

  if(location.hash.startsWith('#trends')){
    trendPage();
  } else if(location.hash.startsWith('#search=')){
    searchPage()
  } else if(location.hash.startsWith('#movie=')){
    movieDetailPage()
  } else if(location.hash.startsWith('#category=')){
    categoriesPage()
  } else {
    homePage()
  }

  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  if(infiniteScroll){
    window.addEventListener('scroll', infiniteScroll, { passive: false });
  };
};

function homePage(){
  console.log('Home !');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.remove('inactive');
  likedMoviesSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');

  getTrendingMoviesPreview();
  getCategoriesPreview();
  getLikedMovies();
};

function trendPage(){
  console.log('Trends !')

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  headerCategoryTitle.innerText = 'Trending';

  getTrendingMovies();
  infiniteScroll = getPaginatedTrendingMovies;
};

function searchPage(){
  console.log('Search !')

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [_, query] = location.hash.split('='); //['#search', 'searchTerm']
  getMoviesBySearch(query);
  infiniteScroll = getPaginatedMoviesBySearch(query);
};

function movieDetailPage(){
  console.log('Movie !')

  headerSection.classList.add('header-container--long');
  // headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');

  const [_, idMovie] = location.hash.split('='); //['#movie', 'idMovie']
  getMovieById(idMovie);
};

function categoriesPage(){
  console.log('Categories !')

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [_, categoryData] = location.hash.split('='); //['#category', 'id-name']
  const [categoryId, categoryName] = categoryData.split('-');
  headerCategoryTitle.innerText = categoryName;

  getMoviesByCategory(categoryId);
  infiniteScroll = getPaginatedMoviesBySearch(categoryId);
};