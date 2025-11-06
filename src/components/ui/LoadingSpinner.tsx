"use client";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  message?: string;
}

export default function LoadingSpinner({
  size = "medium",
  message,
}: LoadingSpinnerProps) {
  const sizeStyles = {
    small: { width: "24px", height: "24px", borderWidth: "2px" },
    medium: { width: "48px", height: "48px", borderWidth: "4px" },
    large: { width: "64px", height: "64px", borderWidth: "4px" },
  };

  const currentSize = sizeStyles[size];
  const spinnerClass = `loading-spinner-${size}`;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    .${spinnerClass} {
                        animation: spin 1s linear infinite;
                    }
                `,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          minHeight: size === "large" ? "400px" : "200px",
        }}
      >
        <div
          className={spinnerClass}
          style={{
            width: currentSize.width,
            height: currentSize.height,
            border: `${currentSize.borderWidth} solid #f3f4f6`,
            borderTop: `${currentSize.borderWidth} solid #03009B`,
            borderRadius: "50%",
          }}
        />
        {message && (
          <p
            style={{
              color: "#6b7280",
              fontSize: size === "small" ? "0.875rem" : "1rem",
              fontWeight: "500",
              margin: 0,
              textAlign: "center",
              maxWidth: "300px",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </>
  );
}
