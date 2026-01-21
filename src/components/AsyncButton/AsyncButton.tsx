import React, { useState, useMemo, CSSProperties } from "react";

export interface AsyncButtonProps {
  type?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  children?: React.ReactNode;
  style?: CSSProperties;
}

export const AsyncButton: React.FC<AsyncButtonProps> = ({
  type = "primary",
  onClick,
  disabled = false,
  children,
  style = {},
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const buttonColors = useMemo(() => {
    const colors = {
      primary: {
        background: "#007bff",
        hover: "#0056b3",
        text: "#ffffff",
      },
      secondary: {
        background: "#6c757d",
        hover: "#545b62",
        text: "#ffffff",
      },
      success: {
        background: "#28a745",
        hover: "#1e7e34",
        text: "#ffffff",
      },
      danger: {
        background: "#dc3545",
        hover: "#bd2130",
        text: "#ffffff",
      },
      warning: {
        background: "#ffc107",
        hover: "#d39e00",
        text: "#212529",
      },
      info: {
        background: "#17a2b8",
        hover: "#117a8b",
        text: "#ffffff",
      },
    };
    return colors[type];
  }, [type]);

  const styles = useMemo(() => {
    return {
      button: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: 500,
        border: "none",
        borderRadius: "4px",
        cursor: isLoading || disabled ? "not-allowed" : "pointer",
        backgroundColor: isLoading || disabled ? "#e0e0e0" : buttonColors.background,
        color: isLoading || disabled ? "#9e9e9e" : buttonColors.text,
        transition: "background-color 0.2s ease, opacity 0.2s ease",
        opacity: disabled ? 0.6 : 1,
        outline: "none",
        ...style,
      } as CSSProperties,
      spinner: {
        width: "16px",
        height: "16px",
        border: "2px solid",
        borderColor: `${isLoading || disabled ? "#9e9e9e" : buttonColors.text} transparent ${
          isLoading || disabled ? "#9e9e9e" : buttonColors.text
        } transparent`,
        borderRadius: "50%",
        animation: "spin 0.6s linear infinite",
      } as CSSProperties,
    };
  }, [type, isLoading, disabled, buttonColors, style]);

  const handleClick = async () => {
    if (disabled || isLoading || !onClick) return;

    const result = onClick();

    if (result instanceof Promise) {
      setIsLoading(true);
      try {
        await result;
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .async-button:hover:not(:disabled) {
            opacity: 0.9;
          }
        `}
      </style>
      <button
        className="async-button"
        style={styles.button}
        onClick={handleClick}
        disabled={disabled || isLoading}
      >
        {isLoading && <span style={styles.spinner} />}
        {children}
      </button>
    </>
  );
};
