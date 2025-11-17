import { css } from "goober";

type ButtonProps = {
  label: string,
  onClick: () => void
}

export default function Button({
  label,
  ...props  
}: ButtonProps) {
  return (
    <button   
    className={css`
      border-radius': '4px',
      'border': 'none',
      'font-size': '14px',
      'font-color': '#FFFFFF',
      'padding': '8px 20px',
      'display': 'inline-block',
      'background-color': '#7DA7D9',
      ':hover': {
        'box-shadow':'0 8px 16px 0 rgba(0,0,0,0.6)'
      }
      `}
    {...props}>
      <span className={css` 
          'font-size': '14px',
          'color': '#FFFFFF',
        `}> 
        {label}
      </span>
    </button>
  );
}