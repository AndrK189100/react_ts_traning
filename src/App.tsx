import React, { useRef, useState } from 'react'
import uuid from 'react-uuid';
import moment from 'moment';
import './App.css'

type Items = {
  id: string;
  date: number;
  distance: number;
}

function App() {
  const [items, setItem] = useState<Items[]>([]);

  const dateRef = useRef<HTMLInputElement>(null);
  const distanceRef = useRef<HTMLInputElement>(null);
  let formId = '';

  const onSubmitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {currentTarget} = e;
    
    const date = currentTarget.date.value ? Date.parse(currentTarget.date.value) : Date.now();
    const distance = !currentTarget.distance.value ? 0.1: Number(currentTarget.distance.value);
    

    setItem(() => {
      
      if(formId) {
        const nItems = JSON.parse(JSON.stringify(items));
        nItems.forEach((item:Items) => {
          if(item.id === formId) {
            item.date = date;
            item.distance = distance;
          }
          
        });
        return nItems
        
        }
      return [...items, {id: uuid(), date: date, distance: distance}]

      
      
    })
    
    currentTarget.date.value = '';
    currentTarget.distance.value = '';
    return;
  }
  
  const onHandler = (e) => {
    e.preventDefault();
    
    if(e.target.classList.contains('delete')) setItem(items.filter(item => item.id !== e.target.parentElement.id));

    if(e.target.classList.contains('change')) {
      
      const item = items.find(item => item.id === e.target.parentElement.id);
      if(item) {
        if(dateRef.current) dateRef.current.value = moment(item.date).format('yyyy-MM-DD');
        if(distanceRef.current) distanceRef.current.value = String(item.distance).replace(',','.');
        formId = item.id;
      }
      return;
    }
  }

  return (
    <>
    <form data-id={formId} className='form' onSubmit={onSubmitHandler}>
      <div className='date-box'>
        <div className='label'>Дата: (дд.мм.гггг)</div>
        <input ref={dateRef} name='date' type='date' className='date'></input>
      </div>
      
      <div className='distance-box'>
        <div className='label'>Пройдено км:</div>
        <input ref={distanceRef} name='distance'  type='number' step={0.1} min={0.1} placeholder='0,1' className='distance'></input>
      </div>
      
      <button className='submit'>OK</button>
    </form>

    <div className='list' onClick={onHandler}>
      <div className='item-header'>
        <div>Дата:</div>
        <div>Пройдено:</div>
        <div>Действия:</div>
      </div>

      {
        items.map(item => {
          return(
            <div id = {item.id} key={item.id} className='item'>
              <div className='date-item' >{moment(item.date).format('DD.MM.yyyy')}</div>
              <div className='distance-item'>{String(item.distance).replace('.',',')}</div>
              <div className='change'>&#9998;</div>
              <div className='delete'>&#10008;</div>
            </div>
          )
        })
      }
    </div>
     
    </>
  )
}

export default App
