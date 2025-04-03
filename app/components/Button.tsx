/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { css } from "@emotion/react"

type Props = {
  label?: string
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const buttonStyle = {
  button: css ({
    display: "inline-block",
    cursor: "pointer",
    border: "0",
    borderRadius: "1rem",
    fontWeight: "700",
    lineHeight: "1",
    fontFamily: `${theme.validTheme.fontFamilyJa}`,
    "&--primary": {
      backgroundColor: `${theme.validTheme.backgroundColor}`,
      color: "white"
    },
    "&--secondary": {
      boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset",
      backgroundColor: "transparent",
      color: "#333",
    },
    "&--small": {
      padding: "10px 16px",
      fontSize: "12px"
    },
    "&--medium": {
      padding: "11px 20px",
      fontSize: "14px"
    },
    "&--large": {
      padding: "12px 24px",
      fontSize: "16px"
    }
  })
}

const Button = (props: Props) => {
  const { primary = false, size = 'medium', backgroundColor, label = 'ラベル' } = props
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      css={buttonStyle.button}
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      {...props}
    >{label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  )
};

export default Button;