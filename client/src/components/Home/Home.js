import React from 'react'
import {Jumbotron, Container} from 'reactstrap'

function Home(props){
    return(
        <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">Request Management  App</h1>
              <p className="lead">This is a Request Management application where you users can  manage requests, keep a track of all requests.</p>

            </Container>
          </Jumbotron>
    )
}
export default Home