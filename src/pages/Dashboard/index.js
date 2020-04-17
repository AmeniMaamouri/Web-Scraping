import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'



const columns = [
  { id: 'deviceName', label: 'Post Title', minWidth: 170, align: 'center' },
  { id: 'devicePrice', label: 'Device Price (DT)', minWidth: 130, align: 'center'},
  {
    id: 'numberPhone',
    label: 'Number Phone',
    minWidth: 170,
    align: 'center',
    format: value => value.toLocaleString(),
  },
  {
    id: 'userVille',
    label: 'City',
    minWidth: 170,
    align: 'center',
    format: value => value.toLocaleString(),
  },
  {
    id: 'postDate',
    label: 'Date',
    minWidth: 150,
    align: 'center',
    format: value => value.toFixed(2),
  },
  {
    id: 'deviceLink',
    label: 'Post Link',
    minWidth: 150,
    align: 'center',
    format: value => value.toFixed(2),
  },

];




const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: 30,
  },
  container: {
    maxHeight: 500,
   
  },
});

export default function StickyHeadTable(props) {

  

  const data = props.post.posts;


  const rows = data.filter(post => {
    return (post.deviceName.toLowerCase().includes(props.post.searchModele.toLowerCase())
        && ( post.devicePrice < props.post.minVal))


  })



  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
   
          <div className="content">
          
        <div className="container-fluid">
       
          <div className="row">
          <ReactHTMLTableToExcel
            className="btnExport"
            table="table-to-xls"
            filename="excelFile"
            sheet="sheet 1"
            buttonText="Export xls"

            />
          <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader id="table-to-xls" aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
               var index = 0;
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id} aria-checked>
                  
                  {columns.map(column => {
                    const value = row[column.id];
                  
                
                 index++;
              
                    if(index === 6){
                      return (
                        <TableCell  key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : (
                            <a target="_blank" href={value} style={{fontWeight: "bold"}} >See More</a>)}
                        </TableCell>
                      );
                    }else {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    }
                   


                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50,100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>

          

          </div>

        </div>
      </div>
   
  );
}


// class Dashboard extends Component {
//   state = {
//     posts: null
//   }

  

//   render() {

  

//     return (

//       <div className="content">
//         <div className="container-fluid">
//           <div className="row">

          

//           </div>

//         </div>
//       </div>

//     )
//   }

// }



// export default Dashboard;