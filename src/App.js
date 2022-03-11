import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import './App.css';

export default function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=> {
    const loadAll = async () => {
      //pegando a lista total de filmes
      let list = await Tmdb.getHomeList();
      // console.log(list);
      setMovieList(list);

      //pegando o featured (filme em destaque)
      let originals = list.filter(i=> i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);

      // console.log('chosen', chosen);
      // console.log('chosen', chosenInfo);
    }
    loadAll();
  }, []);

  useEffect(()=> {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className='page'>
      <Header black={blackHeader}/>
      {featuredData && 
        <FeaturedMovie item={featuredData}/>
      }
      <section className='lists'>
        {movieList.map((item, key)=> (
          // <div>
          //   {item.title}
          // </div>
          <MovieRow key={key} title={item.title} items={item.items}/>
          ))}
      </section>
      <footer>
        Feito com <span role='img' aria-label='coração'>💙</span> por Jeff<br/>
        Direitos de imagem para Netflix<br/>
        Dados obtidos do site Themoviedb.org
      </footer>
      {movieList.length <= 0 && 
      <div className='loading'>
        <img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif' alt='Carregando'/>
      </div>
      }
    </div>
  );
}