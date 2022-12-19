import { colors, createMuiTheme, darken, lighten } from '@material-ui/core';

const MuiTableHead = {
  root: {
    height: 46,
    background: '#FFFFFF',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.06)',
    borderRadius: '16px 16px 0 0',
  },
};

const MuiTableBody = {
  root: {
    '& .MuiCheckbox-root': {
      display: 'none',
    },
  },
};

const MuiTableRow = {
  root: {
    paddingTop: 15,
    paddingBottom: 15,
    height: 76,

    '&.Mui-selected': {
      '& .MuiCheckbox-root': {
        display: 'block',
      },
    },

    '&:hover': {
      '& .MuiCheckbox-root': {
        display: 'block',
      },
    },
  },
  head: {
    height: 46,
    borderBottom: 0,
  },
};

const MuiTableCell = {
  root: {
    fontWeight: 'normal' as const,
    color: '#373737',
    borderBottomColor: '#F4F4F4',
  },
};

const MuiTabs = {
  root: {
    '& .MuiTouchRipple-root': {
      borderRadius: `8px 8px 0 0`,
      overflow: 'hidden',
    },
  },
  indicator: {
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    height: 3,

    '& div': {
      marginLeft: 12,
      maxWidth: 26,
      width: '100%',
      backgroundColor: 'var(--color--primary-main)',
      borderRadius: 4,
    },
  },
  scroller: {
    '@media (max-width: 600px)': {
      overflow: 'auto !important',
    },
  },
};

const MuiTab = {
  root: {
    '@media (min-width: 600px)': {
      minWidth: 'fit-content',
    },

    '&$selected': {
      '& $wrapper': {
        fontWeight: 'bold' as const,
      },
    },
  },
  wrapper: {
    fontWeight: 'normal' as const,
    fontSize: 16,
    letterSpacing: '0.05em',
    color: '#737373',
  },
};

const MuiCheckbox = {
  root: {
    border: '1pz solid red',
    '& input': {
      display: 'none',
    },
  },
};

const MuiPaper = {
  rounded: {
    borderRadius: 16,
  },
  elevation1: {
    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.1)',
  },
  elevation3: {
    boxShadow: '30px 20px 30px rgba(0, 0, 0, 0.05)',
  },
};

const MuiAvatar = {
  root: {
    '&.MuiAvatarGroup-avatar': {
      width: 27,
      height: 27,
    },
  },
};

const MuiButton = {
  root: {
    borderRadius: 12,
    textTransform: 'none' as const,
    color: '#68572D',
    '@media (max-width: 600px)': {
      '& .MuiButton-label': {
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: '0em',
      },
    },
  },
  contained: {
    backgroundColor: '#fff',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: colors.grey[100],
    },
    '&:active': {
      boxShadow: 'none',
    },
    '& $label': {
      color: '#fff',
    },
  },
  outlined: {
    borderColor: '#EEE',
  },
  outlinedSecondary: {
    borderColor: '#47D7AC',
    '&:hover': {
      borderColor: '#47D7AC',
    },
    '& .MuiTouchRipple-child': {
      backgroundColor: 'rgb(255 223 54)',
    },
  },
  containedPrimary: {
    backgroundColor: 'var(--color--secondary-main)',
    '&:hover': {
      backgroundColor: darken('#47D7AC', 0.1),
    },
  },
  containedSecondary: {
    '& span': {
      fontWeight: 600,
      color: 'var(--color--brow-text) !important',
    },
    backgroundColor: '#FFDF36',
    '&:hover': {
      backgroundColor: darken('#FFDF36', 0.05),
    },
    '& .MuiTouchRipple-child': {
      backgroundColor: darken('#FFDF36', 0.2),
    },
    '& $label': {
      color: '#68572D',
      fontWeight: 'bold',
    },
  },
  containedSizeLarge: {
    height: 50,
  },
  outlinedSizeLarge: {
    height: 50,
  },
};

const MuiStepIcon = {
  root: {
    width: 41,
    height: 41,
    color: '#fff',
    border: '1px solid #EEEEEE',
    borderRadius: '50%',

    '& $text': {
      fill: '#373737',
      fontWeight: 'bold' as const,
    },

    '&$active': {
      color: '#47D7AC',
      border: 0,

      '& $text': {
        fill: '#fff',
      },
    },
  },
};

const MuiStepLabel = {
  label: {
    fontWeight: 'bold' as const,

    '&$active': {
      fontWeight: 'bold' as const,
      color: '#000',
    },
  },
};

const MuiStepper = {
  horizontal: {
    borderBottom: '1px solid #EEEEEE',
  },
};

const MuiButtonBase = {
  root: {
    '@media (max-width: 600px)': {
      fontSize: '16px !important',
    },
  },
};

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFDF36',
    },
    secondary: {
      main: '#47D7AC',
    },
  },
  overrides: {
    MuiSelect: {
      root: {
        borderRadius: 8,
        borderColor: 'var(--color--gray-0)',
        minWidth: 200,
        '@media (max-width: 600px)': {
          fontSize: 16,
          fontWeight: 500,
        },
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
    },
    MuiPopover: {
      paper: {
        width: 300,
        height: 'auto',
        backgroundColor: '#fff !important',
        boxShadow: '30px 20px 30px rgba(0, 0, 0, 0.05) !important',
        borderRadius: 'var(--border--radius-16)',
      },
    },
    MuiSlider: {
      root: {
        color: '#373737',
      },
      rail: {
        opacity: 1,
        backgroundColor: '#F7F7F7',
      },
      thumb: {
        marginTop: -11,
        width: 24,
        height: 24,
        backgroundColor: '#fff',
        border: '5px solid currentColor',

        '&:focus, &:hover, &$active': {
          boxShadow: '0px 0px 0px 8px rgba(55, 55, 55, 0.16)',
        },
      },
      valueLabel: {
        '& span > span': {
          color: '#fff',
        },
      },
    },
    MuiDialog: {
      paper: {
        borderRadius: 12,
        padding: '10px 15px 30px 15px',
      },
    },
    MuiDialogTitle: {
      root: {
        '& h2': {
          fontWeight: 'bold',
          fontSize: 26,
        },
      },
    },
    MuiChip: {
      root: {
        minHeight: 34,
        backgroundColor: 'transparent',
        border: '1px solid #E0E0E0',
        borderRadius: 8,

        '&:hover:not($deletable)': {
          borderColor: '#373737',
        },
      },
      clickable: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
      label: {
        fontSize: 14,
        color: '#373737',
      },
      deletable: {
        border: 0,

        '& $label': {
          position: 'relative',
          color: '#68572D',
          height: '100%',
          display: 'flex',
          alignItems: 'center',

          '&::after': {
            content: '" "',
            position: 'absolute',
            right: 0,
            width: 2,
            height: '100%',
          },
        },

        '& $deleteIcon': {
          margin: 0,
          paddingLeft: 5,
          paddingRight: 5,
          width: 'max-content',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#68572D',

          '& svg': {
            fontSize: '1rem',
          },
        },
      },
      deletableColorPrimary: {
        backgroundColor: '#FFDF36',

        '& $label': {
          '&::after': {
            backgroundColor: '#FFD600',
          },
        },

        '&:focus': {
          backgroundColor: lighten('#FFDF36', 0.3),
        },
      },
      deletableColorSecondary: {
        '& $label': {
          '&::after': {
            backgroundColor: darken('#47D7AC', 0.1),
          },
        },
      },
      outlined: {
        '& $deleteIcon': {
          marginRight: 0,
        },
      },
    },
    MuiBreadcrumbs: {
      separator: {
        color: 'var(--color--gray-200)',
      },
      li: {
        '& a': {
          textDecoration: 'none',
          fontSize: 14,
          color: 'var(--color--gray-900)',
          lineHeight: '20px',
        },
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0,0,0, .3)',
      },
    },
    MuiTypography: {
      body2: {
        color: '#373737',
      },
      h3: {
        fontSize: '2.25rem',
        fontWeight: 'bold',
        color: '#373737',
        letterSpacing: '-0.5px',
      },
      h5: {
        fontSize: '1.125rem',
        fontWeight: 'bold',
        color: '#373737',
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#EEEEEE',
      },
    },
    MuiFormControlLabel: {
      label: {
        '@media (max-width: 576px)': {
          fontSize: 16,
        },
      },
    },
    MuiAvatar,
    MuiButton,
    MuiButtonBase,
    MuiCheckbox,
    MuiPaper,
    MuiTableHead,
    MuiTableBody,
    MuiTableRow,
    MuiTableCell,
    MuiTabs,
    MuiTab,
    MuiStepIcon,
    MuiStepLabel,
    MuiStepper,
  },
});
