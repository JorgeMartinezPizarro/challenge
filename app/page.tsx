'use client'

import { ThemeProvider } from '@mui/material/styles';
import {useState, useEffect} from "react"
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
  
  const fetchAll = (refresh: boolean = false) => {
    setLoading(true)
    fetch("/api/load?page=" + page + (refresh ? "&refresh=true" : ""))
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
  }

  const save = (data: SaveArticle) => {

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
    
    
  }

  useEffect(() => {
    fetchAll()
  }, [])
  
  return (<ThemeProvider theme={theme}>
          {!loading && data.header.length > 0 && <Button color="secondary" onClick={() => setEditing({
            data: data.header.map(line => ""),
            pos: -1,
            page,
          })} className={"float-add"}><AddIcon /></Button>}
          {!loading && data.header.length > 0 && <Button color="secondary" onClick={() => fetchAll(true)} className={"float-add-2"}><RefreshIcon /></Button>}
          {!loading && data.header.length > 0 && editing && <Modal open={true} style={{marginTop: "80px", background: "grey", opacity: 1, textAlign: "center", overflowY:"scroll"}}>
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
                  <Button variant="contained" color="error" onClick={() => setEditing(false)} >CLOSE</Button>
                  <Button variant="contained" color="primary" onClick={() => save(editing)} >SAVE</Button>
                </Box>
              </>
            </Modal>}
          {!loading && data.header.length > 0 && <TableContainer component={Paper} className="container">
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
              {error && <TableRow key={"-1"}><TableCell colSpan={14} key={error} style={{height: "100%", color: "red", background: "white"}}>
                <Alert style={{width: "85%"}} icon={<ErrorIcon />} severity="error">
                  An error ocurred: {error}
                </Alert>
              </TableCell></TableRow>}
              {message && <TableRow key={"-1"}><TableCell colSpan={14} key={message} style={{height: "100%", color: "green", background: "white"}}>
                <Alert style={{width: "85%"}} icon={<CheckIcon />} severity="success">
                  {message}
                </Alert>
                
              </TableCell></TableRow>}
              {!loading && data.data.length > 0 && data.data.map((row: string[], j: number) => <TableRow className="list" key={j}>
                <TableCell><Button color="primary" onClick={() => {
                  setEditing({
                    data: row,
                    page,
                    pos: j,
                  })
                }}><EditIcon /></Button></TableCell>
                <TableCell><Button color="error" onClick={() => {
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
        {loading || data.header.length === 0 && <Modal open={loading || data.header.length === 0}><CircularProgress style={{color: "white", position: "fixed", left: "45%", width: "53px", top: "45%"}} />
        </Modal>
        }
      </ThemeProvider>
  );
}
