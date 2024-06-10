import React from 'react'
import UpdateList from './UpdateList';
import DeleteList from './DeleteList';
import { ButtonGroup } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function Lists(props) {
    let listrows = [];
    props.alldata.forEach(element => {
        listrows.push(
            <tr key={element.id}>
                <td>{element.title}</td>
                <td>{element.author}</td>
                <td>
                    <ButtonGroup>
                    <UpdateList 
                        elementId={element._id}
                        singledata={props.singledata}
                        getList={props.getList}
                        updateList={props.updateList}
                        handleChange={props.handleChange}
                    />
                    <DeleteList 
                        elementId={element._id}
                        singledata={props.singledata}
                        getList={props.getList}
                        deleteList={props.deleteList}
                    />
                    </ButtonGroup>
                </td>
            </tr>
        )
    })
    return (
        <>
        <h3 className='my-3'>Book List</h3>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>{listrows}</tbody>
        </table>
        </>
    )
}

export default Lists;