import React, { useState, useEffect } from 'react'
import './App.css'

// material UI
import { Card } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// axios
import axios from 'axios';

type User = {
  name: any,
  login: any
}

const App: React.FC =()=> {
  const [userInfo, setUserInfo] = useState<Object[]>([])

  async function fetchUserInfo(){
    axios.get('https://randomuser.me/api')
      .then(res => setUserInfo(res.data.results))
  } 

  function refreshUser() {
    fetchUserInfo()
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])
  
  return (
    <div className="App">    
    {userInfo.map((user: Object) => (
      <Card sx={{ minWidth: 345 }} key={user?.login?.uuid}>
        <CardContent>
          <Typography variant="h4" component="div">
            {user?.name?.first} {user?.name?.last}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {user?.email}
          </Typography>
        </CardContent>
        <CardActions className='card-action'>
          <Button 
            variant="text" 
            className="btn"
            onClick={refreshUser}
            >
              Refresh
          </Button>
        </CardActions>
      </Card>
    ))}
    </div>
  )
}

export default App
