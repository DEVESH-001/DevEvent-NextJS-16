import CreateEventForm from "@/components/CreateEventForm";

export default function CreateEventPage() {
  return (
    <section>
      <div className="header">
        <h1>Create New Event</h1>
        <p>Share your developer event with the community</p>
      </div>

      <div className="mt-10">
        <CreateEventForm />
      </div>
    </section>
  );
}
