// import React, { useEffect, useState } from "react"
// import styled from "styled-components"
// import { motion } from "framer-motion"
// import { Link, useParams } from "react-router-dom"

// const Cuisine = () => {
//   const [cuisine, setCuisine] = useState([])
//   let params = useParams()

//   const getCuisine = async (name) => {
//     const data = await fetch(
//       `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
//         import.meta.env.VITE_API_KEY
//       }&cuisine=${name}`
//     )

//     const recipes = await data.json()
//     setCuisine(recipes.results)
//   }

//   useEffect(() => {
//     getCuisine(params.type)
//     console.log(params.type)
//   }, [params.type])

//   return (
//     <Grid
//       animate={{ opacity: 1 }}
//       initial={{ opacity: 0 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       {cuisine.map((item) => {
//         return (
//           <Card key={item.id}>
//             <Link to={"/recipe/" + item.id}>
//               <img src={item.image} alt={item.title} />
//               <h4>{item.title}</h4>
//             </Link>
//           </Card>
//         )
//       })}
//     </Grid>
//   )
// }

// const Grid = styled(motion.div)`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
//   grid-gap: 3rem;
// `

// const Card = styled.div`
//   img {
//     width: 100%;
//     border-radius: 2rem;
//   }

//   a {
//     text-decoration: none;
//   }

//   h4 {
//     text-align: center;
//     padding: 1rem;
//   }
// `

// export default Cuisine

import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { Link, useParams } from "react-router-dom"

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([])
  let params = useParams()

  const getCuisine = async (name) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
          import.meta.env.VITE_API_KEY
        }&cuisine=${name}`
      )
      if (!response.ok) {
        throw new Error("Failed to fetch recipes")
      }
      const recipes = await response.json()
      setCuisine(recipes.results)
    } catch (error) {
      console.error("Error fetching cuisine:", error)
    }
  }

  useEffect(() => {
    if (params.type) {
      console.log("Fetching recipes for cuisine type:", params.type)
      getCuisine(params.type)
    }
  }, [params.type])

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map((item) => (
        <Card key={item.id}>
          <Link to={"/recipe/" + item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  )
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`

export default Cuisine
