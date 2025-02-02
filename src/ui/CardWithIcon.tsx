import { FC, createElement } from "react";
import { Card, Box, Typography } from "@mui/material";
import { ReactNode } from "react";
interface Props {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   icon: FC<any>;
   title?: string;
   subtitle?: ReactNode;
   children?: ReactNode;
}

const CardWithIcon = ({ icon, title, subtitle }: Props) => {
   return (
      <Card
         sx={{
            minHeight: 52,
            display: "flex",
            flexDirection: "column",
            flex: "1",
            "& a": {
               textDecoration: "none",
               color: "inherit",
            },
            // minWidth: "280px",
         }}
      >
         <Box
            sx={{
               position: "relative",
               overflow: "hidden",
               padding: "16px",
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
               width: "100%",
               // maxWidth: "328px",
               "& .icon": {
                  color: "secondary",
                  position: "absolute",
               },
               "&:before": {
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  display: "block",
                  content: `''`,
                  height: "200%",
                  aspectRatio: "1",
                  transform: "translate(-60%, -60%)",
                  borderRadius: "50%",
                  backgroundColor: "secondary.main",
                  opacity: 0.15,
               },
            }}
         >
            {/* Icon */}
            <Box
               width="3em"
               className="icon"
               sx={
                  {
                     // marginRight: isSmallScreen ? "8px" : "16px",
                  }
               }
            >
               {createElement(icon, { fontSize: "large" })}
            </Box>

            {/* Title and Subtitle */}
            <Box
               textAlign="right"
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  flex: 1, // Ensure it takes up the remaining space
               }}
            >
               <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                     whiteSpace: "nowrap",
                     overflow: "hidden",
                     textOverflow: "ellipsis",
                     margin: 0,

                     flexShrink: 0, // Prevent subtitle from shrinking
                  }}
               >
                  {subtitle || " "}
               </Typography>
               <Typography
                  color="textSecondary"
                  sx={{
                     minHeight: "54px",
                     maxWidth: "150px",
                     alignSelf: "end",
                  }}
               >
                  {title}
               </Typography>
            </Box>
         </Box>
      </Card>
   );
};

export default CardWithIcon;
