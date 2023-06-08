// 1- Cómo creo una aplicación de react? Importando createRoot:
import { createRoot } from 'react-dom/client';
import { App } from './src/App.jsx';

const root = createRoot(document.getElementById('app'));
root.render(<App />);

// 2- Esto va a tirar un error de transpilación. Los archivos "js" no son capaces de soportar la sintaxis de "jsx". Esto lo solucionamos muy fácil.
// Sólo tenemos que cambiar el tipo de archivo para que sea "jsx". Entonces quedaría "main.jsx".
// Además, tenemos que cambiar el "index.html", porque va a tener que importar el archivo modificado con la extensión "jsx".