import { useState, useEffect} from 'react'
import './App.css'

// Endpoints
const CHARACTER_LIST = `https://dragonball-api.com/api/characters`;
function App() {
  const [characters, setCharacters] = useState([]); // characters Almacena los dpersonajes obtenidos de la API.
  const [loading, setLoading] = useState(true); // loading Controla si los datos están en proceso de carga.
  const [error, setError] = useState(null); // error Captura si hay algún error al hacer la solicitud.

  useEffect(() => {
    fetch(CHARACTER_LIST)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al obtener los datos`);
        }
        return response.json();
      })
      .then(data => {
        const { items } = data; 
        //console.log(items/* .map(item => item.image) */)
        setCharacters(items);
        setLoading(false); // Terminar el estado de carga
      })
      .catch(error => {
        setError(error.message); // Capturar el error
        setLoading(false);
      });
  }, [])
  
  // Si los datos están cargando, muestra un mensaje de "Cargando...".
  if (loading) return <p>Cargando...</p>
  // Si hay un error, muestra el mensaje de error.
  if (error) return <p>Error: {error}</p> 

  return (
    <main>
      <h1 className='text-light'>Dragon Ball</h1>

      <div className='container'>
        {
          characters.map(characters => (
              <div key={characters.id} className="card d-flex flex-column justify-content-center align-items-center">
                <img src={characters.image} className="card-img-top" alt={characters.name} />

                <div className="card-body">
                  <h2 className="card-title text-center">
                    {characters.name}
                  </h2>

                  <span>
                    <b>Genero:</b> {characters.gender}
                  </span>
                  
                  <span>
                    <b>Ki:</b> {characters.ki}
                  </span>

                  <span>
                    <b>Descripcion:</b>
                  </span>
                  <p className="card-text descripcion fs-6">
                    {characters.description}
                  </p>
                </div>
              </div>
            )
          )
        }
      </div>
    </main>
  )
}

export default App
