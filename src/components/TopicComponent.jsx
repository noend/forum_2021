import useFetchData from './useFetchData';
import { CircularProgress } from '@material-ui/core';

const Topic = (props) => {
    
    
    const topicId = +props.match.params.topicId;
    const {loading, data: topic, error} = useFetchData(`/topics/${topicId}/`)

    if (loading) return <CircularProgress />;

    return <>{topic?.title}</>
};

export default Topic;