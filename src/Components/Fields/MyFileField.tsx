import { FileField, FieldProps, useRecordContext } from "react-admin";

interface MyFileFiesInterface extends FieldProps {
   recordKey: string;
}

const MyFileField: React.FC<MyFileFiesInterface> = ({ source, recordKey, ...rest }) => {
   const record = useRecordContext();
   if (!record) return null;
   return <FileField {...rest} source={source} title={record[`${recordKey}`]} target="_blank" />;
};

export default MyFileField;
