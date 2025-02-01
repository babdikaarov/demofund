import * as React from 'react';
import { FC, createElement } from 'react';
import { Card, Box, Typography, Divider } from '@mui/material';
import { Link, To } from 'react-router-dom';
import { ReactNode } from 'react';
import { useMediaQuery } from '@mui/material';

interface Props {
    icon: FC<any>;
    to: To;
    title?: string;
    subtitle?: ReactNode;
    children?: ReactNode;
}

const CardWithIcon = ({ icon, title, subtitle, to, children }: Props) => {
    // Determine if the screen size is small (less than 650px)
    const isSmallScreen = useMediaQuery('(max-width:650px)');

    return (
        <Card
            sx={{
                minHeight: 52,
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                '& a': {
                    textDecoration: 'none',
                    color: 'inherit',
                },
            }}
        >
            <Link to={to}>
                <Box
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        padding: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: '328px',
                        '& .icon': {
                            color: 'secondary.main',
                        },
                        '&:before': {
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            display: 'block',
                            content: `''`,
                            height: '200%',
                            aspectRatio: '1',
                            transform: 'translate(-30%, -60%)',
                            borderRadius: '50%',
                            backgroundColor: 'secondary.main',
                            opacity: 0.15,
                        },
                    }}
                >
                    {/* Icon */}
                    <Box
                        width="3em"
                        className="icon"
                        sx={{
                            marginRight: isSmallScreen ? '8px' : '16px',
                        }}
                    >
                        {createElement(icon, { fontSize: 'large' })}
                    </Box>

                    {/* Title and Subtitle */}
                    <Box
                        textAlign='right'
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%',
                            flex: 1, // Ensure it takes up the remaining space
                        }}
                    >
                        <Typography color="textSecondary">{title}</Typography>
                        <Typography
                            variant="h5"
                            component="h2"
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                margin: 0,
                                minHeight: '24px',
                                flexShrink: 0, // Prevent subtitle from shrinking
                            }}
                        >
                            {subtitle || ' '}
                        </Typography>
                    </Box>
                </Box>
            </Link>
            {children && <Divider />}
            {children}
        </Card>
    );
};

export default CardWithIcon;
