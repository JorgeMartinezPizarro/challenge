'use client'

import {useState, useEffect} from "react"
import { Box, TextField, Button, TablePagination, Modal, tableCellClasses, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Table} from '@mui/material';
import { styled } from '@mui/material/styles';
import { BackHand } from "@mui/icons-material";

import {errorMessage} from "./helpers"


export default function Home() {
  
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [data, setData] = useState<string[][]>([])
  const [page, setPage] = useState(0)
  const [adding, setAdding ] = useState(false)
  const [values, setValues ] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  
  const header = (data: string[][]): string[] => data[0] ? Object.values(data[0]) : []
  
  const PAGE_SIZE = 50

  const fetchAll = () => {
    setLoading(true)
    fetch("/api/load")
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setData(data)
          setError("")
        }
        
        setValues(header(data).map(name=> ""))
        setLoading(false)
      })
      .catch(error => {
        setError(errorMessage(error))
        setData([])
        setLoading(false)
      })
  }

  const save = () => {

    const newData = [...data, values]
    setLoading(true)
    
    setAdding(false)
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    }
    setError("")
    fetch("/api/save", options)
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        setData([])
        setMessage("Saved " + values.join(", "))
        setError(errorMessage(res.error))
      } else {
        setData(res)
        setError("")
      }
      setValues(header(data).map(name=> ""))
      setLoading(false)
    })
    .catch(e => {
      setError(errorMessage(e))
      setData([])
      setValues(header(data).map(name=> ""))
    })
    
    
  }

  // TODO: add edit and remove

  console.log(data.slice(-5))

  useEffect(() => {
    fetchAll()
  }, [])

  // TODO: loading MODAL

  return (<>
          {!loading && <Button onClick={() => setAdding(true)} className={"float-add"}>+</Button>}
          {!loading && adding && <Modal open={adding} style={{marginTop: "80px", background: "green", opacity: 1, textAlign: "center", overflowY:"scroll"}}>
              <>
                <p>Filling the following values to create a new Article in our database.</p>
                {header(data).map((element, i) => <><TextField style={{marginBottom: "12px"}} name={"param-" + i} value={values[i]} onChange={(e) => {
                  const newValues = [...values]
                  newValues[i] = e.target.value
                  setValues(newValues)
                }} label={element} type="text"placeholder={element}/><br/></>) }
                <Box className="controls">
                  <Button variant="contained" color="primary" onClick={() => setAdding(false)} >CLOSE</Button>
                  <Button variant="contained" color="secondary" onClick={save} >SAVE</Button>
                </Box>
              </>
            </Modal>}
          {!loading && <TableContainer component={Paper} className="container">
          <Table stickyHeader>
            <TableBody>
              {<TableRow key={"-"}>{
                    data[0] && data[0].map((el, i) => <TableCell key={el + " - " + i}>{el}</TableCell>)
                }</TableRow>}
            <TableRow className="controls"><TablePagination
                    rowsPerPageOptions={[]}
                    colSpan={16}
                    count={data.length}
                    rowsPerPage={PAGE_SIZE}
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
              {error && <><TableRow key={"-1"}><TableCell key={error} style={{height: "100%", color: "red", background: "white"}}>
                An unexpected error ocurred during data loading ...
                <br/>
              </TableCell></TableRow><TableRow key={"-1"}><TableCell key={error} style={{height: "100%", color: "red", background: "white"}}>
                {error}
              </TableCell></TableRow></>}
              {data.slice(1 + PAGE_SIZE*page, PAGE_SIZE*page + PAGE_SIZE).map((row, j) => <TableRow className="list" key={j}>{
                row.map((el, i) => <TableCell title={"Row content: \n\n" + el} key={el + " - " + i}><span>{el}</span></TableCell>)
              }</TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>}
      </>
  );
}
