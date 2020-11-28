import React, {useState, useEffect} from 'react';
import Axios from "axios"

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import ReactLoading from "react-loading";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Inventory() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      Axios.get(`http://iqc.jeweltrace.in/api/v1/sku/index?pageNumber=${page}&pageSize=10`).then((res)=>{
          //console.log(res.data.data);
          setPageData(res.data.page);
          setData(res.data.data);
          setLoading(false);
      }).catch((err)=>{
          console.log(err);
      })
  }, [page]);
  const pageChange=(action)=>{
    if(action === "up"){
        setPage(page+1)
    } else if( action === "down"){
        setPage(page-1)
    }
    setLoading(true)
  }

  if(loading){
    return (<div style={{ display: "flex" , height: "100%" , width: "100%", justifyContent:"center", alignItems:"center"}}><ReactLoading type="spin" color="#sss" /></div>)
  }

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Shape</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Color Type</TableCell>
            <TableCell >Clarity</TableCell>
            <TableCell align="right">Created By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.companyId.name}</TableCell>
              <TableCell>{item.weight}</TableCell>
              <TableCell>{item.shape}</TableCell>
              <TableCell>{item.color}</TableCell>
              <TableCell>{item.colorType}</TableCell>
              <TableCell>{item.clarity}</TableCell>
              <TableCell align="right">{`${item.createdBy.firstName} ${item.createdBy.lastName}`} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
            <Button variant="contained" color="primary" onClick={()=>pageChange("down")} disabled={page <=1 ? true : false}>Prev</Button>
            <span style={{ fontSize: 25, margin: 20}} >{`${pageData.currentPage} \t/\t ${pageData.totalPage}`}</span>
            <Button variant="contained" color="primary" onClick={()=>pageChange("up")} disabled={!pageData.hasNextPage}>Next</Button>      </div>
    </>
  );
}