'use client'

import { ThemeProvider } from '@mui/material/styles';
import {useState, useEffect, useCallback} from "react"
import { CircularProgress, Box, TextField, Button, Alert, TablePagination, Modal, tableCellClasses, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Table} from '@mui/material';
import { Error as ErrorIcon, Check as CheckIcon, Refresh as RefreshIcon, Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"

import {errorMessage} from "./helpers"
import { SaveArticle, Articles } from "./types";
import theme from './theme'

const PAGE_SIZE = 25

export default function Home() {
  
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [data, setData] = useState<Articles>({data: [], length: 0, header: []})
  const [page, setPage] = useState(0)
  const [editing, setEditing ] = useState<false | SaveArticle>(false)
  const [loading, setLoading] = useState(false)
  
  const fetchAll = useCallback((refresh: boolean = false) => {
    setLoading(true)
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        page,
        refresh: refresh ? true : undefined
      }),
    }
    fetch("/api/load", options)
      .then(res => res.json())
      .then((data: Articles) => {
        setMessage("Successfuly loaded paged data " + (refresh ? "from original file" : "from storage" + " with page = " + page))
        setData(data)
        setError("")
        setLoading(false)
      })
      .catch(error => {
        setError(errorMessage(error))
        setData({data: [], length: 0, header: []})
        setLoading(false)
      })
  }, [setLoading, setData, setError, page])

  const save = useCallback((data: SaveArticle) => {

    const newData: SaveArticle = {
      ...data,
    }

    setLoading(true)
    setError("")

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    }
    
    fetch("/api/save", options)
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        setMessage("")
        setError(errorMessage(res.error))
      } else {
        setData(res.data)
        setMessage(res.message)
        setError("")
      }
      setEditing(false)  
      setLoading(false)
    })
    .catch(e => {
      setError(errorMessage(e))
      setLoading(false)
      setEditing(false)
    })
    
    
  }, [setEditing, setLoading, setError, setData])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])
  
  return (<ThemeProvider theme={theme}>
          {data.header.length > 0 && <Button color="secondary" onClick={() => setEditing({
            data: data.header.map(line => ""),
            pos: -1,
            page,
          })} className={"float-add"}><AddIcon /></Button>}
          {data.header.length > 0 && <Button color="secondary" onClick={() => fetchAll(true)} className={"float-add-2"}><RefreshIcon /></Button>}
          {error && <Alert style={{marginTop: "90px", width: "90%"}} icon={<ErrorIcon />} variant="standard" severity="error">
                  An error ocurred: {error}
            </Alert>
          }
          {message && !error && <Alert style={{marginTop: "90px", width: "90%"}} icon={<CheckIcon />} variant="standard" severity="success">
                  {message}
                </Alert>
                
          }
          {data.header.length > 0 && editing && <Modal open={true} style={{marginTop: "80px", background: "grey", opacity: 1, textAlign: "center", overflowY:"scroll"}}>
            
              <>
                <p>{editing.pos === -1 ? " Create a new Article in our database" : "Edit the article with (pos, page) = (" + editing.pos + ", " + page + ")"}</p>
                {data.header.map((element, i) => <>{element}:<br/><TextField style={{marginBottom: "12px"}} name={"param-" + i} value={editing !== undefined && editing.data ? editing.data[i] : ""} onChange={(e) => {
                  const newValues: string[] = editing !== undefined && editing.data ? editing.data as string[] : []
                  newValues[i] = e.target.value
                  setEditing({
                    ...editing,
                    data: newValues
                  })
                }} label={element} type="text"/><br/></>) }
                <Box className="controls">
                  <Button variant="contained" color="secondary" onClick={() => setEditing(false)} >CLOSE</Button>
                  <Button variant="contained" color="primary" onClick={() => save(editing)} >SAVE</Button>
                </Box>
              </>
            </Modal>}
          {data.header.length > 0 && <TableContainer component={Paper} className="container">
          <Table stickyHeader>
            <TableBody>
              {<TableRow key={"header"}>
                <TableCell></TableCell>
                <TableCell></TableCell>
                {data.header && data.header.map((el: string, i: number) => <TableCell key={el + " - " + i}>{el}</TableCell>)}
              </TableRow>}
            <TableRow className="controls"><TablePagination
                    rowsPerPageOptions={[]}
                    colSpan={16}
                    count={data.length}
                    rowsPerPage={PAGE_SIZE}
                    page={page}
                    onPageChange={(e, int) => {setPage(int); fetchAll()}}
          /></TableRow>
              
              {data.data.length > 0 && data.data.map((row: string[], j: number) => <TableRow className="list" key={j}>
                <TableCell title={"Edit element with data: " + row.toString()}><Button color="secondary" onClick={() => {
                  setEditing({
                    data: row,
                    page,
                    pos: j,
                  })
                }}><EditIcon /></Button></TableCell>
                <TableCell title={"Delete element with data: " + row.toString()}><Button color="error" onClick={() => {
                  save({
                    data: undefined,
                    pos: j,
                    page,
                  })
                }}><DeleteIcon /></Button></TableCell>
                {row.map((el, i) => <TableCell title={"Row content: \n\n" + el} key={el + " - " + i}><span>{el}</span></TableCell>)}
              </TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>}
        {!data.data.length || !data.header.length && <Modal open={loading || data.header.length === 0}><CircularProgress style={{color: "white", position: "fixed", left: "45%", width: "53px", top: "45%"}} />
        </Modal>
        }
      </ThemeProvider>
  );
}
