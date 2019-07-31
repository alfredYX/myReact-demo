import React from 'react'
import 'antd/dist/antd.css';
import { BrowserRouter as Router,Route} from 'react-router-dom'

import NavBar from './NavBar'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'

import  "./main.css"
class App extends React.Component {
    render(){
        return(
            <Router>
                    <div className="app">
                        <div className="sideBar">
                            <NavBar/>
                            {/* <Route exact path="/" component={NavBar} /> */}
                        </div>
                        <div className="content">
                            <Route path="/Page1" component={Page1} />
                            <Route path="/Page2" component={Page2} />
                            <Route path="/Page3" component={Page3} />
                        </div>
                    </div>
            </Router>
        
        )
    }
}

export default App