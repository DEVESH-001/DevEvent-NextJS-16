import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { getSimilartEventsBySlug } from "@/lib/actions/events.actions";
import Image from "next/image";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={24} height={24} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agentItems }: { agentItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agentItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const EventDetailsPage = async function ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch event data
  let event;
  try {
    const request = await fetch(`${BASE_URL}/api/events/${slug}`);
    if (!request.ok) return notFound();

    const response = await request.json();
    event = response.event;
    if (!event || !event.description) return notFound();
  } catch (error) {
    console.log("Failed to fetch event during build:", error);
    return notFound();
  }

  // Destructure event data
  const {
    description,
    overview,
    time,
    date,
    location,
    image,
    mode,
    agenda,
    audience,
    tags,
    organizer,
  } = event;

  const bookings = 10;

  const similarEvents = (await getSimilartEventsBySlug(slug)) || [];
  console.log(similarEvents);

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>

      <div className="details">
        {/* left sdie - event content */}
        <div className="content">
          <Image
            src={image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />
            <EventDetailItem icon="/icons/clock.svg" alt="time" label={time} />
            <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
            <EventDetailItem
              icon="/icons/audience.svg"
              alt="mode"
              label={audience}
            />
          </section>

          <EventAgenda agentItems={agenda} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
            <EventTags tags={tags} />
          </section>
        </div>

        {/* right side - booking form */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot</p>
            )}
            <BookEvent />
          </div>
        </aside>
      </div>
      <div className="flex ww-full flex-col gap-4 pt-20 ">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent) => (
              <EventCard
                key={String(similarEvent._id)}
                title={similarEvent.title}
                image={similarEvent.image}
                slug={similarEvent.slug}
                location={similarEvent.location}
                date={similarEvent.date}
                time={similarEvent.time}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
