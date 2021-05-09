import {allTopics} from '../services/mock';
import {Link, useHistory} from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { Button, CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import API from '../services/api';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 130},
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    { field: 'modifiedAt', headerName: 'Modified At', width: 200 },
    {
      field: 'userId',
      headerName: 'User',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160
    },
];

const AllTopics = (props) => {

    const history = useHistory();

    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/topics')
            .then(res => {
                setTopics(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err))
    }, []);

    const onCellClick = (params) => {
        if (params.field === 'title') {
            const topicId = params.row.id;
            history.push(`/topic/${topicId}`);
        }
    }

    return <>
        <h1>All Topics</h1>
        <Button color="inherit" to='/addtopic' component={Link}>Create Topic</Button>
        {loading && <CircularProgress/>}
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={topics} columns={columns} pageSize={5} onCellClick={onCellClick}/>
        </div>
    </>
};

export default AllTopics;