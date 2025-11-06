"use client";

import { useState } from "react";

interface LeaveReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
  vehicleName: string;
  onSubmit: (rating: number, comment: string) => void;
}

export default function LeaveReviewModal({
  isOpen,
  onClose,
  serviceTitle,
  vehicleName,
  onSubmit,
}: LeaveReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSubmit(rating, comment);
    setIsSubmitting(false);
    onClose();
    // Reset form
    setRating(0);
    setComment("");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#020079",
              margin: 0,
            }}
          >
            Leave a Review
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              color: "#6b7280",
              cursor: "pointer",
              padding: "4px",
              lineHeight: "1",
            }}
          >
            ×
          </button>
        </div>

        {/* Service Info */}
        <div
          style={{
            padding: "12px",
            backgroundColor: "rgba(2, 0, 121, 0.05)",
            borderRadius: "8px",
            marginBottom: "24px",
          }}
        >
          <p
            style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#6b7280" }}
          >
            Service
          </p>
          <p
            style={{
              margin: "0 0 8px 0",
              fontSize: "16px",
              fontWeight: "600",
              color: "#020079",
            }}
          >
            {serviceTitle}
          </p>
          <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
            {vehicleName}
          </p>
        </div>

        {/* Rating */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "12px",
            }}
          >
            Rating *
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={(e) => {
                  setHoverRating(star);
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  setHoverRating(0);
                  e.currentTarget.style.transform = "scale(1)";
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  fontSize: "32px",
                  color:
                    star <= (hoverRating || rating) ? "#E6C200" : "#d1d5db",
                  transition: "transform 0.2s ease",
                  lineHeight: "1",
                }}
              >
                ★
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p
              style={{
                margin: "8px 0 0 0",
                fontSize: "14px",
                color: "#6b7280",
                fontStyle: "italic",
              }}
            >
              {rating === 5 && "Excellent!"}
              {rating === 4 && "Great!"}
              {rating === 3 && "Good!"}
              {rating === 2 && "Fair"}
              {rating === 1 && "Poor"}
            </p>
          )}
        </div>

        {/* Comment */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "8px",
            }}
          >
            Your Review (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this service..."
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "inherit",
              resize: "vertical",
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#03009B";
              e.target.style.outline = "none";
              e.target.style.boxShadow = "0 0 0 3px rgba(3, 0, 155, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db";
              e.target.style.boxShadow = "none";
            }}
          />
          <p
            style={{
              margin: "4px 0 0 0",
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            {comment.length} characters
          </p>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              backgroundColor: "white",
              color: "#374151",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f9fafb";
              e.currentTarget.style.borderColor = "#9ca3af";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.borderColor = "#d1d5db";
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: rating === 0 ? "#9ca3af" : "#03009B",
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
              cursor: rating === 0 ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              opacity: isSubmitting ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (rating > 0 && !isSubmitting) {
                e.currentTarget.style.backgroundColor = "#020079";
                e.currentTarget.style.transform = "scale(1.02)";
              }
            }}
            onMouseLeave={(e) => {
              if (rating > 0 && !isSubmitting) {
                e.currentTarget.style.backgroundColor = "#03009B";
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
            onMouseDown={(e) => {
              if (rating > 0 && !isSubmitting) {
                e.currentTarget.style.transform = "scale(0.98)";
              }
            }}
            onMouseUp={(e) => {
              if (rating > 0 && !isSubmitting) {
                e.currentTarget.style.transform = "scale(1.02)";
              }
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}
