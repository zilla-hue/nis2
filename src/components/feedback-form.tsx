import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/hooks/useTheme";
import { colors } from "./colors";

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState("");
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
    setFeedback("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`sm:max-w-[425px] ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        <DialogHeader>
          <DialogTitle>Leave a Suggestion or Feedback</DialogTitle>
          <DialogDescription>
            We value your input! Please share your thoughts with us.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback or suggestion..."
              className={`${
                theme === "dark" ? "bg-gray-700 text-white" : ""
              } focus:ring-2 focus:ring-blue-500`}
              rows={5}
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full transition duration-300 ease-in-out transform hover:scale-105"
              style={{
                backgroundColor:
                  theme === "dark" ? colors.dark.accent : colors.light.accent,
                color:
                  theme === "dark"
                    ? colors.dark.secondary.main
                    : colors.light.secondary.main,
              }}
            >
              Submit Feedback
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackForm;
