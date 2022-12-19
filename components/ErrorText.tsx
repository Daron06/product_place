import Typography from '@material-ui/core/Typography';
import React, { CSSProperties } from 'react';

interface ErrorTextProps {
  text?: string;
  focus?: boolean;
  style?: CSSProperties;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ text, children, focus, style }) => {
  const ref = React.useRef<HTMLParagraphElement>();

  React.useEffect(() => {
    if (ref.current && typeof window !== 'undefined' && focus) {
      window.scrollTo(0, ref.current.offsetTop);
    }
  }, []);

  return (
    <Typography innerRef={ref} color="error" className="mt-10" style={style}>
      {text || children}
    </Typography>
  );
};
