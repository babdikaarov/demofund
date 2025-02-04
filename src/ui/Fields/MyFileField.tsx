import { FieldProps, useRecordContext, Link, DateField, useLocaleState, useTranslate } from "react-admin";

interface MyFileFiesInterface extends FieldProps {
   recordKey: string;
}

const MyFileField: React.FC<MyFileFiesInterface> = ({ source, recordKey, ...rest }) => {
   const record = useRecordContext();
   const [locale] = useLocaleState();
   const t = useTranslate();
   if (!record) return null;

   return (
      <Link to={record[source].src} target="_blank">
         <DateField
            {...rest}
            source={recordKey}
            options={{
               year: "numeric",
               month: "long",
            }}
            locales={locale}
            label={t("t.input.forMonth")}
         />
      </Link>
   );
   // return <FileField {...rest} source={source} title={record[`${recordKey}`]} target="_blank" />;
};

export default MyFileField;
