"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FormData {
  title: string;
  description: string;
  overview: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  organizer: string;
  agenda: string;
  tags: string;
}

const initialFormData: FormData = {
  title: "",
  description: "",
  overview: "",
  venue: "",
  location: "",
  date: "",
  time: "",
  mode: "offline",
  audience: "",
  organizer: "",
  agenda: "",
  tags: "",
};

export default function CreateEventForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const submitFormData = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "agenda") {
          // Convert agenda string to array
          const agendaArray = value
            .split("\n")
            .filter((item: string) => item.trim());
          submitFormData.append(key, JSON.stringify(agendaArray));
        } else if (key === "tags") {
          // Convert tags string to array
          const tagsArray = value
            .split(",")
            .map((tag: string) => tag.trim())
            .filter((tag: string) => tag);
          submitFormData.append(key, JSON.stringify(tagsArray));
        } else {
          submitFormData.append(key, value);
        }
      });

      // Add image
      if (image) {
        submitFormData.append("image", image);
      } else {
        throw new Error("Please select an image for the event");
      }

      const response = await fetch("/api/events", {
        method: "POST",
        body: submitFormData,
      });

      const result = await response.json();

      if (response.ok) {
        // Show success message and redirect
        alert("Event created successfully!");
        router.push(`/events/${result.event.slug}`);
      } else {
        setError(result.message || "Failed to create event");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-event-form">
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="title">Event Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          maxLength={100}
          placeholder="Enter event title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          maxLength={1000}
          rows={3}
          placeholder="Brief description of the event"
        />
      </div>

      <div className="form-group">
        <label htmlFor="overview">Overview *</label>
        <textarea
          id="overview"
          name="overview"
          value={formData.overview}
          onChange={handleInputChange}
          required
          maxLength={500}
          rows={4}
          placeholder="Detailed overview of what attendees can expect"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="venue">Venue *</label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
            required
            placeholder="Venue name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            placeholder="City, State, Country"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time *</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="mode">Mode *</label>
          <select
            id="mode"
            name="mode"
            value={formData.mode}
            onChange={handleInputChange}
            required
          >
            <option value="offline">Offline</option>
            <option value="online">Online</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="audience">Target Audience *</label>
          <input
            type="text"
            id="audience"
            name="audience"
            value={formData.audience}
            onChange={handleInputChange}
            required
            placeholder="e.g., Developers, Students, Professionals"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="organizer">Organizer *</label>
        <input
          type="text"
          id="organizer"
          name="organizer"
          value={formData.organizer}
          onChange={handleInputChange}
          required
          placeholder="Organization or person organizing the event"
        />
      </div>

      <div className="form-group">
        <label htmlFor="agenda">Agenda *</label>
        <textarea
          id="agenda"
          name="agenda"
          value={formData.agenda}
          onChange={handleInputChange}
          required
          rows={5}
          placeholder="Enter each agenda item on a new line"
        />
        <small>Enter each agenda item on a separate line</small>
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags *</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          required
          placeholder="React, JavaScript, Web Development (comma-separated)"
        />
        <small>Separate tags with commas</small>
      </div>

      <div className="form-group">
        <label htmlFor="image">Event Image *</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {imagePreview && (
          <div className="image-preview">
            <Image
              src={imagePreview}
              alt="Event preview"
              width={300}
              height={200}
              className="preview-image"
            />
          </div>
        )}
      </div>

      <button type="submit" disabled={isSubmitting} className="submit-button">
        {isSubmitting ? "Creating Event..." : "Create Event"}
      </button>
    </form>
  );
}
