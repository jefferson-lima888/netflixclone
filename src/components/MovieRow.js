import React, {useState} from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function MovieRow({title, items}) {

  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    // Math.round(window.innerWidth) pega o tamnho de tela do usuario, antes para teste 150 tamnho de 1 item
    let x = scrollX + Math.round(window.innerWidth / 2);

    if(x > 0) {
      x = 0;
    }
    setScrollX(x);
  }

  const handleRighttArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;

    if((window.innerWidth - listW) > x){
      // os 60 é para tirar a diferença do padding 30 de um lado e do outro
      x = (window.innerWidth - listW) - 60;
    }
    setScrollX(x);
  }

 return (
   <div className='movieRow'>
      <h2>{title}</h2>
      <div className='movieRow--left' onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{fontSize: 50}}/>
      </div>
      <div className='movieRow--right' onClick={handleRighttArrow}>
        <NavigateNextIcon style={{fontSize: 50}}/>
      </div>
      <div className='movieRow--listarea'>
        <div className='movieRow--list' style={{marginLeft: scrollX, width: items.results.length * 150}}>
          {items.results.length > 0 && items.results.map((item, key)=> (
            <div key={key} className='movieRow--item'>
              <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
            </div>
          ))}
        </div>
      </div>
   </div>
  );
}