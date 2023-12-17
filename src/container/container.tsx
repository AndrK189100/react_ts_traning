import { MouseEventHandler } from "react";
import moment from 'moment';
import './container.css'

export type Items = {
    id: string;
    date: number;
    distance: number;
  }

export default function Container({items, onHandler}:{items:Items[], onHandler: MouseEventHandler}) {
    return (
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


    )
    
}
