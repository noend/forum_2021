import {Link, useHistory} from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import {Button, CircularProgress, IconButton} from '@material-ui/core';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import CreateIcon from '@material-ui/icons/Create';
import { useEffect, useState } from 'react';
import API from '../services/api';
import user from "../services/user";
import Container from "@material-ui/core/Container";

const getUser = user.getUser();

const columns = [
    { field: 'id', headerName: 'ID', width: 70 , flex: 0.5},
    { field: 'title', headerName: 'Title', width: 250, flex: 1},
    {
      field: 'user',
      headerName: 'User',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
        valueGetter: (params) => {
            let result = [];
            if (params.row.user) {
                result = [params.row.user.firstName, params.row.user.lastName]
            } else {
                result = ["Unknown"];
            }
            return result.join(" ");
        }
        , flex: 1
    },
    { type: 'number', field: 'views', headerName: 'Views', width: 150 , flex: 0.5, valueFormatter: (params) => {
            const valueFormatted = Number(params.value * 1).toLocaleString();
            return `${valueFormatted}`;
        },
    },
    { type: 'dateTime', field: 'createdAt', headerName: 'Created At', width: 200 , flex: 0.7 ,
    },
    { type: 'dateTime', field: 'modifiedAt', headerName: 'Modified At', width: 200 , flex: 0.5},
    { field: 'actions', headerName: 'Actions', width: 200 , flex: 1, renderCell: (params) =>
            {
                const loggedUser = user.getUser();

                if (loggedUser !== null && (loggedUser.role !== 'USER' || params.row.user.id === loggedUser.id) ) {
                    return <>
                            <IconButton aria-label="Edit" color="primary">
                                <CreateIcon />
                            </IconButton>
                        </>
                }


            }

        ,
    },
];

const AllTopics = (props) => {

    const history = useHistory();

    const [errors, setErrors]   =   useState()
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/topics')
            .then(responce => {
                setTopics(responce.data);
                setLoading(false);
            })
            .catch(error => {
                setErrors(error);
                setLoading(false);
                // console.log(err, typeof err);
            })
    }, []);

    const onCellClick = (params) => {
        if (params.field !== 'actions') {
            const topicId = params.row.id;
            setLoading(true);
            history.push(`/topic/${topicId}`);
            setLoading(false);
        }
    }

    if (!loading) {
        if (topics.length > 0) {
            return <>
                <Container component="main" maxWidth="lg">
                    <h1>Topics</h1>
                    <Button color="inherit" to='/addtopic' component={Link}>Create Topic</Button>

                    <div style={{ display: 'flex', minHeight: '500px', width: '100%' }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGrid rows={topics} columns={columns} pageSize={10} onCellClick={onCellClick}/>
                        </div>
                    </div>
                </Container>
            </>
        } else {
            return <>
                <h1>Topics</h1>
                {(typeof errors !== "undefined")  ?? <Button color="inherit" to='/addtopic' component={Link} >Create Topic</Button>}
                <h3>There is no topics!</h3>
            </>
        }
    } else {
        return <>
            {loading && <CircularProgress/>}
        </>
    }


};

export default AllTopics;
