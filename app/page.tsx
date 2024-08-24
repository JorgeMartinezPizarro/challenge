'use client'

import {useState, useEffect} from "react"
import { TextField, Button, TablePagination, Modal, tableCellClasses, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Table} from '@mui/material';
import { styled } from '@mui/material/styles';
import { BackHand } from "@mui/icons-material";

export default function Home() {
  
  const [error, setError] = useState("")
  const [data, setData] = useState<string[][]>([])
  const [page, setPage] = useState(0)
  const [adding, setAdding ] = useState(false)
  const [values, setValues ] = useState([])
  useEffect(() => {
    
    fetch("/api/load")
      .then(res => {
        return res.json()
      })
      .then(data => {
        setError("")
        console.log(data)
        setData(data)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  const headerString = "Hauptartikelnr;Artikelname;Hersteller;Beschreibung;Materialangaben;Geschlecht;Produktart;Ärmel;Bein;Kragen;Herstellung;Taschenart;Grammatur;Material;Ursprungsland;Bildname"

  const header = headerString
      .split(";")
  
  return (<>
          <Button onClick={() => setAdding(true)} className={"float-add"}>ADD</Button>
          {adding && <Modal open={adding} style={{marginBottom: "80px", background: "green", opacity: 1, textAlign: "center", overflowY:"scroll"}}>
              <>
                <p>Filling the following values to create a new Article in our database.</p>
                {header.map(element => <><TextField style={{marginBottom: "12px"}} label={element} type="text"placeholder={element}/><br/></>) }
                <div className="controls">
                  <Button variant="contained" color="primary" onClick={() => setAdding(false)} >CLOSE</Button>
                  <Button variant="contained" color="secondary" onClick={() => setAdding(false)} >SAVE</Button>
                </div>
              </>
            </Modal>}
          <TableContainer className="container">
          <Table>
            <TableBody>
              {<TableRow key={"-"}>{
                    data[0] && data[0].map((el, i) => <TableCell key={el + " - " + i}>{el}</TableCell>)
                }</TableRow>}
            <TableRow><TablePagination
                  className="controls"
                    rowsPerPageOptions={[]}
                    colSpan={16}
                    count={data.length}
                    rowsPerPage={50}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      },
                    }}
                    
                    onPageChange={(e, int) => {setPage(int)}}
          /></TableRow>
              {error && <TableRow key={"-1"}><TableCell key={error} style={{color: "red"}}>{error}</TableCell></TableRow>}
              {data.slice(1 + 50*page, 50*page + 50).map((row, j) => <TableRow key={j}>{
                row.map((el, i) => <TableCell key={el + " - " + i}>{el}</TableCell>)
              }</TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>
        
      </>
  );
}
