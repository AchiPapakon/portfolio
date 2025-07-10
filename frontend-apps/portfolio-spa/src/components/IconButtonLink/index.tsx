import { Button, type SxProps } from '@mui/material';
import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    href: string;
    sx: SxProps;
}

const IconButtonLink = ({ children, href, sx }: Props) => (
    <Button href={href} target="_blank" rel="noopener" sx={{ width: 50, height: 50, ...sx }}>
        {children}
    </Button>
);

export default IconButtonLink;
