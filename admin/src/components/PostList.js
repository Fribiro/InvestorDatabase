import React from 'react'
import { List, Datagrid, TextField, ReferenceField, EditButton, DeleteButton} from 'react-admin'

export const PostList = (props) => {
    return (
      <List {...props}>
        <Datagrid rowClick="edit">
          <TextField source="Id" />
          {/* <ReferenceField source="userId" reference="users">
            <TextField source="name" />
          </ReferenceField> */}
          <TextField source="firstName" />
          <TextField source="lastName" />
          <TextField source="email" />
          <EditButton />
        </Datagrid>
      </List>
    );
}
 
//export default PostList;
