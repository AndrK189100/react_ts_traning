import React, {useRef, useState } from 'react'
import uuid from 'react-uuid';
import moment from 'moment';
import './App.css'
import Container from './container/container';

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
    const distance = Number(!currentTarget.distance.value ? 0.1: Number(currentTarget.distance.value).toFixed(1));
    

    setItem(() => {
      
      const nItems = JSON.parse(JSON.stringify(items));
      if(formId) {



        const index = nItems.findIndex((item:Items) => item.date === date && item.id !== formId);
        
        if(index !== -1) {
           nItems[index].distance = Number((nItems[index].distance + distance).toFixed(1));
           const oldIndex = nItems.findIndex((item:Items) => item.id === formId);
           nItems.splice(oldIndex, 1);
           return nItems;
        }
        
        nItems.forEach((item:Items) => {
          if(item.id === formId) {
            item.date = date;
            item.distance = Number(distance.toFixed(1));
          }
          
        });
        
        return nItems
        
        }

        const index = nItems.findIndex((item:Items) => moment(item.date).format('DD.MM.yyyy') === moment(date).format('DD.MM.yyyy'));

        if(index !== -1) {
          nItems[index].distance = Number((nItems[index].distance +distance).toFixed(1));
          return nItems
        }
       
      return [...nItems, {id: uuid(), date: date, distance: distance}]
      
    })
    
    currentTarget.date.value = '';
    currentTarget.distance.value = '';
    return;
  }
  
  const onHandler = (e: React.BaseSyntheticEvent) => {
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

    <Container items={items} onHandler={onHandler}/>
     
    </>
  )
}

export default App
