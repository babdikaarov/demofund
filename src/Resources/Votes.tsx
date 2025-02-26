import {
   List,
   Datagrid,
   TextField,
   ReferenceField,
   ArrayField,
   ChipField,
   Show,
   SimpleShowLayout,
   SimpleForm,
   Create,
   useGetIdentity,
   useNotify,
   FunctionField,
   ReferenceInput,
   SelectInput,
   RichTextField,
   Confirm,
   useUpdate,
   useShowContext,
   useGetList,
   NumberField,
   SingleFieldList,
   TextInput,
   useTranslate,
   required,
   TopToolbar,
   FilterLiveSearch,
   ExportButton,
   CreateButton,
   DeleteButton,
} from "react-admin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Button } from "@mui/material";

export const VotesList = () => {
   const t = useTranslate();
   const { data: userData, isPending } = useGetIdentity();
   if (isPending) return null;
   return (
      <List
         actions={
            <TopToolbar>
               <Stack
                  width={"100%"}
                  spacing={2}
                  direction={"row"}
                  alignItems={"flex-end"}
                  justifyContent={"space-between"}
               >
                  <FilterLiveSearch source="title" label={t("t.filter.searchByTitle")} />
                  <CreateButton />
                  <ExportButton disabled={userData!.role === "guest"} />
               </Stack>
            </TopToolbar>
         }
      >
         <Datagrid bulkActionButtons={false}>
            <ReferenceField source={`pollsId`} reference="polls" label={t("t.input.budgetPlan")}>
               <TextField source="title" />
            </ReferenceField>
            <NumberField source="totalVoters" label={t("t.input.totalVoters")} />
            <NumberField source="totalVoted" label={t("t.input.totalVoted")} />
         </Datagrid>
      </List>
   );
};
export const VotesShow = () => {
   return (
      <Show>
         <VotesEditLayout />
      </Show>
   );
};

const VotesEditLayout = () => {
   const t = useTranslate();
   const [open, setOpen] = useState(false);
   const notify = useNotify();
   const navigate = useNavigate();
   const { record } = useShowContext();
   const [update, { isPending }] = useUpdate();
   const { data: identity } = useGetIdentity();

   // Ensure record and identity are available before proceeding
   if (!record || !identity) {
      return <div>Loading...</div>;
   }

   const handleClick = () => setOpen(true);
   const handleDialogClose = () => setOpen(false);

   const handleConfirm = () => {
      const resource = "votes";

      // Find the voter's index in the `voters` array
      const findVoterIndex = () => record.voters.findIndex((voter: { userId: string }) => voter.userId === identity.id);

      const voterIndex = findVoterIndex();

      if (voterIndex === -1) {
         notify(t("t.notification.vote.eligable"), { type: "error" });
         setOpen(false);
         return;
      }

      // Ensure the voter hasn't already voted
      if (record.voters[voterIndex].voted) {
         notify(t("t.notification.vote.voteExist"), { type: "warning" });
         setOpen(false);
         return;
      }

      // Update the `voters` array
      const updatedVoters = [...record.voters];
      updatedVoters[voterIndex] = {
         ...updatedVoters[voterIndex],
         voted: true, // Mark as voted
      };

      const data = {
         ...record,
         voters: updatedVoters,
         totalVoted: record.totalVoted + 1, // Increment total votes
         updatedAt: new Date().toISOString(), // Update timestamp
         updatedBy: identity.id, // Track user who updated
      };

      const params = { id: record.id, data, previousData: record };
      const options = {
         onSuccess: () => {
            notify(t("t.notification.vote.success"), { type: "success" });
         },
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         onError: (error: any) => {
            notify(t("t.notification.vote.error"), { type: "error", error });
         },
      };

      update(resource, params, options);
      setOpen(false);
   };

   return (
      <SimpleShowLayout>
         <TextField source="title" />
         <ReferenceField source={`pollsId`} reference="polls" label={t("t.input.pollReftitle")}>
            <TextField source="title" />
         </ReferenceField>
         <ReferenceField source={`pollsId`} reference="polls" label={t("t.input.pollRefDescription")} link={false}>
            <RichTextField source="description" />
         </ReferenceField>
         <ArrayField source="voters" label={t("t.input.voters")}>
            <SingleFieldList linkType={false}>
               <FunctionField
                  render={(rec) => {
                     return rec.voted ? (
                        <ReferenceField source="userId" reference="users" link={false}>
                           <ChipField source="firstName" color="success" />
                        </ReferenceField>
                     ) : (
                        <ReferenceField source="userId" reference="users" link={false}>
                           <ChipField source="firstName" color="default" />
                        </ReferenceField>
                     );
                  }}
               />
            </SingleFieldList>
         </ArrayField>

         <NumberField source="totalVoters" label={t("t.input.totalVoters")} />
         <NumberField source="totalVoted" label={t("t.input.totalVoted")} />
         <FunctionField
            render={() => (
               <Stack direction={"row"} justifyContent={"space-between"}>
                  <Button type="button" size="large" onClick={() => navigate("/votes")}>
                     {t("t.button.back")}
                  </Button>
                  <Button type="button" size="large" onClick={handleClick}>
                     {t("t.button.vote")}
                  </Button>
                  <Confirm
                     isOpen={open}
                     loading={isPending}
                     title={t("t.dialog.vote.title")}
                     content={t("t.dialog.vote.desc")}
                     onConfirm={handleConfirm}
                     onClose={handleDialogClose}
                  />
                  {identity.role !== "admin" ? null : <DeleteButton />}
               </Stack>
            )}
         />
      </SimpleShowLayout>
   );
};

export const VotesCreate = () => {
   const { data: userData } = useGetList("users");
   const t = useTranslate();
   const createVoters = () => {
      const donors = userData?.filter((user) => user.role === "donor" || user.role === "admin");

      return donors?.map((donor) => ({ userId: donor.id, voted: false }));
   };

   return (
      <Create
         transform={(data) => ({
            ...data,
            voters: createVoters(),
            totalVoters: createVoters()?.length,
            totalVoted: 0,
         })}
         redirect="show"
      >
         <SimpleForm>
            <ReferenceInput source="pollsId" reference="polls" label={t("t.input.pollReftitle")}>
               <SelectInput validate={required()} emptyText={t("t.select.poll")} />
            </ReferenceInput>
            <TextInput source="title" />
         </SimpleForm>
      </Create>
   );
};
