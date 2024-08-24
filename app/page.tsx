'use client'

import {useState, useEffect} from "react"
import Image from "next/image";
import styles from "./page.module.css";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import {Button, Table} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Home() {
  
  const [error, setError] = useState("")
  const [data, setData] = useState<any>([])

  useEffect(() => {
    
    fetch("/api/load")
      .then(res => {
        return res.json()
      })
      .then(data => {
        setError("")
        setData(data)
      })
      .catch(error => {
        setError(error)
      })
  }, [])
  
  return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {error && <TableRow><TableCell style={{color: "red"}}>{error}</TableCell></TableRow>}
              {data.slice(1, 3).map(row => <TableRow><TableCell>{row.length}</TableCell></TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>
  );
}
