import PageMessage from "./container/pageMessages.js";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ModifyMessage from "./container/modifyMessage/modifyMessage.js";
import PageProfil from "./container/pageProfil/pageProfil";
import Inscription from "./container/connexion/inscription/inscription.js";

function App() {
  return (
    <>
        {/* // Router pour la barre de menu */}
        <Router>
              <Route path="/Accueil/" exact component={PageMessage}/>
              <Route path="/PageProfil/" exact component={PageProfil}/>
              <Route path="/deconnexion/" exact component={PageMessage}/>
              <Route path="/" exact component={PageMessage}/>
              <Route path="/ModifyMessage/:id" exact component={ModifyMessage}/>
              <Route path="/Inscription/" exact component={Inscription}/>
        </Router>
    </>
)
}
 
export default App

