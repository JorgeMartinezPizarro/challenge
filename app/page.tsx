'use client'

import { ThemeProvider } from '@mui/material/styles';
import { useState, useEffect, useCallback} from "react"
import BarChartIcon from '@mui/icons-material/BarChart';
import { CircularProgress, Box, TextField, Button, Alert, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, Table} from '@mui/material';
import { ArrowBackIosNew as ArrowBackIosNewIcon, ArrowForwardIos as ArrowForwardIosIcon, Download as DownloadIcon, LastPage as LastPageIcon, FirstPage as FirstPageIcon, Error as ErrorIcon, Check as CheckIcon, Refresh as RefreshIcon, Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"

import {errorMessage} from './helpers'
import Charts from './components/Chats'
import { SaveArticle, Articles, ArticlesResponse } from "./types";
import theme from './theme'

const pageSize = 100;

export default function Home() {
  
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")
  const [data, setData] = useState<undefined | Articles>()
  const [page, setPage] = useState(0)
  const [editing, setEditing ] = useState<undefined | SaveArticle>(undefined)
  const [loading, setLoading] = useState(false)

  const totalPages = Math.round((data?.length || 0) / pageSize)

  const fetchAll = useCallback((refresh: boolean = false) => {
    setLoading(true)
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        page,
        pageSize,
        refresh: refresh ? true : undefined
      }),
    }
    fetch("/api/load", options)
      .then(res => res.json())
      .then((data: ArticlesResponse) => {
        setData(data.articles)
        setMessage(data.message)
        setError("")
        setLoading(false)
      })
      .catch(error => {
        setError(errorMessage(error))
        setData(undefined)
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
    .then((res: ArticlesResponse) => {
      setData(res.articles)
      setMessage(res.message)
      setError("")
      setEditing(undefined)  
      setLoading(false)
    })
    .catch(e => {
      setError(errorMessage(e))
      setLoading(false)
      setEditing(undefined)
    })
    
    
  }, [setEditing, setLoading, setError, setData])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return (<ThemeProvider theme={theme}>
    {data && !show && editing === undefined && <header>
      <Button title="Navigate to the first page" onClick={() => {setPage(0); fetchAll()}} color="primary" variant="contained"><FirstPageIcon /></Button>
      <Button title="Navigate one page back" color="primary" variant="contained" onClick={() => {
        setPage((page === 0) ? 0 : (page - 1))
        fetchAll()
      }}><ArrowBackIosNewIcon /></Button>
      <a download="articles.csv" href="/api/download"><Button variant="contained" title="Download the current status of the articles database" color="primary"><DownloadIcon /></Button></a>
       
      <Button variant="contained" title="Navigate to the next page" color="primary" onClick={() => {
        setPage((page === totalPages - 1) ? totalPages - 1 : page + 1)
        fetchAll()
      }}><ArrowForwardIosIcon /></Button>
      <Button variant="contained" title="Navigate to the last page" color="primary" onClick={() => {setPage(totalPages - 1); fetchAll()}}><LastPageIcon /></Button>
      <Button variant="contained" title="Add new Article to the database" color="primary" onClick={() => {setEditing({pageSize, data: data.header.map(() => ""), page, pos: -1})}} ><AddIcon /></Button>
      <Button variant="contained" title="Reload the data from the challenge" color="primary" onClick={() => {fetchAll(true)}} ><RefreshIcon /></Button>
      <Button variant="contained" title="Show diagrams" color="primary" onClick={() => {setShow(true)}} ><BarChartIcon /></Button>
    </header>}
            {data && data.data.length > 0 && show && <Modal open={true} >
            
            <>
              <Box className="controls">
                  <Button variant="contained" color="secondary" onClick={() => setShow(false)} >CLOSE</Button>
                  <Charts data={data.data} />
              </Box>
              
            </>
          </Modal>}
          {editing === undefined && !show && error && <Alert title={error} icon={<ErrorIcon />} variant="filled" severity="error">
                  An error ocurred: {error}
            </Alert>
          }
          {editing === undefined && !show && message && <Alert title={message} icon={<CheckIcon />} variant="filled" severity="success">
                  {message}
                </Alert>
                
          }
          {editing && !show && data && data.header.length > 0 && editing && <Modal open={true} >
            
              <>
                <p>{editing.pos === -1 ? " Create a new Article in our database" : "Edit the article with (pos, page) = (" + editing.pos + ", " + page + ")"}</p>
                <Box className="controls">
                  <Button variant="contained" color="secondary" onClick={() => setEditing(undefined)} >CLOSE</Button>
                  <Button variant="contained" color="primary" onClick={() => window.confirm("Are you sure you want to save the element with content \n\n" + (editing.data && editing.data.map(c => "\n - " + c))) && save(editing)} >SAVE</Button>
                </Box>
                {data.header.map((element, i) => <>{element}:<br/><TextField style={{marginBottom: "12px"}} placeholder={undefined} name={"param-" + i} value={editing !== undefined && editing.data ? editing.data[i] : ""} onChange={(e) => {
                  const newValues: string[] = editing !== undefined && editing.data ? editing.data as string[] : []
                  newValues[i] = e.target.value
                  setEditing({
                    ...editing,
                    data: newValues
                  })
                }} label={element} type="text"/><br/></>) }
                
              </>
            </Modal>}
          {editing === undefined && !show && data && data.header.length > 0 && <TableContainer >
          <Table>
            <TableHead>
              {<TableRow key={"header"}>
                <TableCell colSpan={2}>Page {page + 1} / {totalPages}, {data.length} articles</TableCell>
                {data.header && data.header.map((el: string, i: number) => <TableCell key={el + " - " + i}>{el}</TableCell>)}
              </TableRow>}
            </TableHead>
            <TableBody>
              {data.data.length > 0 && data.data.map((row: string[], j: number) => <TableRow className="list" key={j}>
                <TableCell title={"Edit element with data: " + row.toString()}><Button color="primary" variant="contained" onClick={() => {
                  setEditing({
                    data: row,
                    page,
                    pos: j,
                    pageSize,
                  })
                }}><EditIcon /></Button></TableCell>
                <TableCell title={"Delete element with data: " + row.toString()}><Button color="secondary" variant="contained" onClick={() => {
                  window.confirm("Are you sure you want to remove the element with content \n\n" + row.map(c => "\n - " + c)) && save({
                    data: undefined,
                    pageSize,
                    pos: j,
                    page,
                  })
                }}><DeleteIcon /></Button></TableCell>
                {row.map((el, i) => <TableCell title={"Row content: \n\n" + el} key={el + " - " + i}><span>{el}</span></TableCell>)}
              </TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>}
        {!data || !data.data.length || !data.header.length && <Modal open={loading || data.header.length === 0}><CircularProgress style={{color: "white", position: "fixed", left: "45%", width: "53px", top: "45%"}} />
        </Modal>
        }
      </ThemeProvider>
  );
}
