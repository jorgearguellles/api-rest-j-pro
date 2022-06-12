// Data & Helpers =============================
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  params: {
    'api_key': API_KEY,
  },
});

const likedMoviesList = () => {
  const item = JSON.parse( localStorage.getItem('liked_movies') );
  let movies;
  if (item) {
    movies = item;
  } else {
    movies = {};
  };
  return movies;
};

const likeMovie = (movie) => {
  const likedMoviesLS = likedMoviesList();
  if (likedMoviesLS[movie.id]) {
    likedMoviesLS[movie.id] = undefined;
  } else {
    likedMoviesLS[movie.id] = movie;
  };
  localStorage.setItem('liked_movies', JSON.stringify(likedMoviesLS));
};

// Utils ============================

// const lazyLoader = new IntersectionObserver(callback /* ,options */); // Options are not sent because we will be looking at all applications.
const lazyLoader = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      const url = entry.target.getAttribute('data-img');
      entry.target.setAttribute('src', url);
    };
  });
}); 

const createMovies = (movies, container, {lazyLoad = false, clean = true,} = {},) => {
  
  if(clean){
    container.innerHTML = ''
  }

  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(lazyLoad ? 'data-img' : 'src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
    movieImg.addEventListener('click',()=>{
      location.hash = '#movie=' + movie.id;
      })
    movieImg.addEventListener('error', ()=>{
      movieImg.setAttribute('src', 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1129&q=80')
    })
    
    const movieBtn = document.createElement('button');
    movieBtn.classList.add('movie-btn');
    movieBtn.addEventListener('click', ()=>{
      movieBtn.classList.toggle('movie-btn--liked');
      likeMovie(movie);
    })
    lazyLoad && lazyLoader.observe(movieImg);

    movieContainer.appendChild(movieImg);
    movieContainer.appendChild(movieBtn);
    container.appendChild(movieContainer)
  });
};

const createCategories = (categories, container) => {
  container.innerHTML = '';
  
  categories.forEach(category => {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id);
    categoryTitle.addEventListener('click', ()=>{
      location.hash = `#category=${category.id}-${category.name}`;
    })
    const categoryTitleText = document.createTextNode(category.name);
     
    categoryTitle.appendChild(categoryTitleText)
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer)
  });
};


// API Calling ============================
const getTrendingMoviesPreview = async () => {
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList, true);
};

const getCategoriesPreview = async () => {
  const { data } = await api('genre/movie/list');
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList);
};

const getMoviesByCategory = async (id) => {
  const { data } = await api('discover/movie',{
    params: {
      with_genres: id,
    }
  });
  const movies = data.results;
  maxPage = data.total_pages;

  createMovies(movies, genericSection, { lazyLoad: true, clean: true})
};

const getPaginatedMoviesByCategory = (id) => {
  return async function(){
    const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
    const isUserScrollBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const isNotMaxPage = pageNumber < maxPage;
    
    if( isUserScrollBottom && isNotMaxPage ){
      pageNumber++;
      const { data } = await api('discover/movie', {
        params: {
          with_genres: id,
          page: pageNumber,
        }
      });
      const movies = data.results;
    
      createMovies(movies, genericSection, { lazyLoad: true, clean: false});
    };
    }
};

const getMoviesBySearch = async (query) => {
  const { data } = await api('search/movie',{
    params: {
      query,
    }
  });
  const movies = data.results;
  maxPage = data.total_pages;
  console.log(maxPage);

  createMovies(movies, genericSection, true)
};

const getPaginatedMoviesBySearch = (query) => {
  return async function(){
    const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
    const isUserScrollBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const isNotMaxPage = pageNumber < maxPage;
    
    if( isUserScrollBottom && isNotMaxPage ){
      pageNumber++;
      const { data } = await api('search/movie', {
        params: {
          query,
          page: pageNumber,
        }
      });
      const movies = data.results;
    
      createMovies(movies, genericSection, { lazyLoad: true, clean: false});
    };
    }
};

const getTrendingMovies = async () => {
  const { data } = await api('trending/movie/day');
  const movies = data.results;
  maxPage = data.total_pages;

  createMovies(movies, genericSection, { lazyLoad: true, clean: true});
  
  // const btnLoadMore = document.createElement('button')
  // btnLoadMore.innerText = 'Load More';
  // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies)
  // genericSection.appendChild(btnLoadMore);
};

const getPaginatedTrendingMovies = async () => {
  const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
  const isUserScrollBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
  const isNotMaxPage = pageNumber < maxPage;
  
  if( isUserScrollBottom && isNotMaxPage ){
    pageNumber++;
    const { data } = await api('trending/movie/day', {
      params: {
        page: pageNumber,
      }
    });
    const movies = data.results;
  
    createMovies(movies, genericSection, { lazyLoad: true, clean: false});
  };
};

const getMovieById = async (id) => {
  const { data:movie } = await api('movie/' + id);

  const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
  headerSection.style.background = `
    linear-gradient(
      180deg, 
      rgba(0, 0, 0, 0.35) 19.27%, 
      rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})  
  `;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  createCategories(movie.genres, movieDetailCategoriesList);
  getRelatedMoviesById(id);
};

const getRelatedMoviesById = async (id) => {
  const { data } = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;
  
  createMovies(relatedMovies, relatedMoviesContainer, true);
};

