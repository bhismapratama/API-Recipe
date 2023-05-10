import './App.css';
import { getRecipeList, searchRecipe, } from './Api';
import React, { useState, useEffect } from 'react';

function App() {
  const [popularIngredients, setIngredients] = useState([])

  useEffect(() => {
    getRecipeList().then((result) => {
      setIngredients(result)
    })
  }, [])

  const IngredientsFind = () => {
    return popularIngredients.map((food, i) => {

      function Meal({ meal }) {
        const { sourceUrl, setSourceUrl } = useState();

        useEffect(() => {
          fetch(
            `https://api.spoonacular.com/recipes/${food.id}/information?apiKey=...&includeNutrition=false`
          )
            .then((Response) => Response.json())
            .then((data) => {
              setSourceUrl(data.image);
            })
            .catch(() => {
              console.log("error")
            })
        }, [meal.id])
      }

      return (
        <div>
          <div className='Food-wrapper' key={i}>
            <div className="Food-wrap">
              <div className='Food-id'>{food.id}</div>
              <img className='Food-image' src={food.image}></img>
              <div className='Food-title'>{food.title}</div>
            </div>
          </div>
        </div>
      )
    })
  }

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchRecipe(q)
      setIngredients(query.results)
      console.log({ query })
    }
  }

  return (
    <div className="App">
      <section className="controls">
        <input
          className='food-search'
          placeholder='cari makanan favourite'
          onChange={({ target }) => search(target.value)}
        />
        <div className='container'>
          <IngredientsFind />
        </div>
      </section>
    </div>
  );
}

export default App;
