import React from 'react'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Image from './THfqmB.jpg'; // Import using relative path


const styles = {
    paperContainer: {
        backgroundImage: `url(${Image})`
        
    }
};

export default function () {
  return (
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }} >
       <Paper style={styles.paperContainer} xs={12} >
       <h1>Welcome</h1>
      <h2>CRUD Example Material ui</h2>

        </Paper>
      
      <div>
        <Link to="/home">Continuar</Link>
      </div>
    </div>
  )
}
