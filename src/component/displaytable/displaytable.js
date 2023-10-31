import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableSortLabel from '@mui/material/TableSortLabel';

const columns = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'title', label: 'Title', minWidth: 170 },
    {
        id: 'price',
        label: 'Price',
        minWidth: 100,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
    { id: 'description', label: 'Description', minWidth: 200 },
    { id: 'category', label: 'Category', minWidth: 150 },
];

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [productData, setProductData] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('price');
    const [selectedCategory, setSelectedCategory] = React.useState('All'); // New state variable for category filtering

    React.useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => setProductData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedData = stableSort(productData, getComparator(order, orderBy));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ flex: '1', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
                    <div>
                        <label>Filter by Category:</label>
                        <Select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="men's clothing">Men's Clothing</MenuItem>
                            <MenuItem value="women's clothing">Women's Clothing</MenuItem>
                            <MenuItem value="electronics">Electronics</MenuItem>
                            {/* Add more categories as needed */}
                        </Select>
                    </div>
                </div>
                <TableContainer style={{ maxHeight: '100%' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={orderBy === column.id ? order : 'asc'}
                                            onClick={() => handleRequestSort(column.id)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData
                                .filter((row) => selectedCategory === 'All' || row.category === selectedCategory)
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={sortedData
                        .filter((row) => selectedCategory === 'All' || row.category === selectedCategory)
                        .length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

function getComparator(order, orderBy) {
    return (a, b) => {
        if (order === 'asc') {
            return a[orderBy] - b[orderBy];
        } else {
            return b[orderBy] - a[orderBy];
        }
    };
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
