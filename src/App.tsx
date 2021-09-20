import React, { useCallback, useEffect, useState } from 'react';
import "@pnp/sp/search";
import { sp } from '@pnp/sp/presets/all';
import { IItemAddResult } from "@pnp/sp/items";
import { ISearchQuery, SearchResults, SearchQueryBuilder } from "@pnp/sp/search";
import './App.css';

function App() {
  const [items, setItems] = useState<any[]>([]);
  let campo = document.getElementById('field');

  // AGREGAR
  const addListItem = useCallback(async () => {
    alert('me estan activando')
    const addItem: IItemAddResult = await sp.web.lists.getByTitle("BaseDatosPersonas").items.add({
      Title: campo
    });
    console.log('Item agregado:', addItem.data.Title);
  }, []);

  // MODIFICAR
  const updateListItem = useCallback(async () => {
    let list = sp.web.lists.getByTitle("BaseDatosPersonas");
    const upadteItem = await list.items.getById(3).update({
      Title: 'UpdateNewItem'
    })
    console.log('Item modificado:', upadteItem.data);
  }, []);

  // ELIMINAR
  const deleteListItem = useCallback(async () => {
    let list = sp.web.lists.getByTitle("BaseDatosPersonas");
    const deleteItem = await list.items.getById(3).delete();
    console.log('Item eliminado:', deleteItem);
  }, []);

  const getListItems = useCallback(async () => {
    try {
      const items: any[] = await sp.web.lists.getByTitle('BaseDatosPersonas').items.select('Title, ID').getAll();
      setItems(items);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // SEARCH
  // AGREGAR
  const searchItem = useCallback(async () => {
    const result: SearchResults = await sp.search('BaseDatosPersonas');
    console.log('resultados search', result.PrimarySearchResults);    
  }, []);

  useEffect(() => {
    // addListItem();
    // updateListItem();
    // deleteListItem();
    searchItem();
    getListItems();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ul className="list-view">
          {items.map(x => <li style={{ color: '#fff' }} key={x.ID}>{x.Title}</li>)}
        </ul>
      </header>
    </div>
  );
}

export default App;
