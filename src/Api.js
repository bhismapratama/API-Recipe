import axios from "axios"

const apiKey = "..."
const baseUrl = "https://api.spoonacular.com/recipes"

export const getRecipeList = async () => {
    const recipes = await axios.get(`${baseUrl}/complexSearch?apiKey=${apiKey}`)
    return recipes.data.results;
}

export const searchRecipe = async (q) => {
    const search = await axios.get(`${baseUrl}/complexSearch?query=${q}&apiKey=${apiKey}`)
    return search.data;
}
