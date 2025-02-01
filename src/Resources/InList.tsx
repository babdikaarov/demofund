import { List, Datagrid, TextField, DateField, ReferenceField, useGetList, Create, SimpleForm, NumberInput, DateInput } from "react-admin";
import * as React from "react";

export const FundsInList = () => {
    const { data: fundsData, total: fundsTotal, isPending: fundsPending, error: fundsError, refetch: fundsRefetch, meta: fundsMeta } = useGetList('fundsIn');

    // Handle loading state
    if (fundsPending) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (fundsError) {
        return <div>Error: {fundsError.message}</div>;
    }

    return (
        <List>
            <Datagrid>
                <TextField source="amount" />
                <DateField source="depositedAt" />
                <ReferenceField source="creaditorRef" reference="users">
                    <TextField source="firstName" />
                </ReferenceField>
            </Datagrid>
        </List>
    );      
};


export const FundsInCreate = () => {

    return (
        <Create>
            <SimpleForm>
                <NumberInput source="amount" />
                <DateInput source="depositedAt" />
              
            </SimpleForm>
        </Create>
    );      
};

