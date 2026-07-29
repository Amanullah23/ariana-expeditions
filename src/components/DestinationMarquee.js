import Image from "next/image";

const items = [
  {
    title: "Echoes of Ariana",
    desc: "Herat, Balkh, Kabul",
    img: "https://picsum.photos/seed/echoes-ariana/600/450",
  },
  {
    title: "Valleys of Time",
    desc: "Bamyan, Band-e Amir",
    img: "https://picsum.photos/seed/valleys-time/600/450",
  },
  {
    title: "Mountains & Nomads",
    desc: "Wakhan, Hindu Kush",
    img: "https://picsum.photos/seed/mountains-nomads/600/450",
  },
  {
    title: "Minaret of Jam",
    desc: "Ghor Province",
    img: "https://picsum.photos/seed/minaret-jam/600/450",
  },
  {
    title: "Band-e Amir",
    desc: "Afghanistan's First National Park",
    img: "https://picsum.photos/seed/band-e-amir-2/600/450",
  },
  {
    title: "Blue Mosque",
    desc: "Herat",
    img: "https://picsum.photos/seed/blue-mosque/600/450",
  },
  {
    title: "Wakhan Corridor",
    desc: "The Roof of Central Asia",
    img: "https://picsum.photos/seed/wakhan-corridor/600/450",
  },
  {
    title: "Shahr-e Gholghola",
    desc: "The City of Screams",
    img: "https://picsum.photos/seed/shahr-e-gholghola/600/450",
  },
  {
    title: "Kandahar",
    desc: "The Historic South",
    img: "https://picsum.photos/seed/kandahar/600/450",
  },
];

function Card({ item }) {
  return (
    <div className="group shrink-0 w-64 rounded-lg overflow-hidden shadow-md bg-white">
      <div className="relative h-40 overflow-hidden">
        <Image
          src={item.img}
          alt={item.title}
          fill
          sizes="256px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-heading text-base text-dark mb-0.5">
          {item.title}
        </h3>
        <p className="text-charcoal text-xs">{item.desc}</p>
      </div>
    </div>
  );
}

export default function DestinationMarquee() {
  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden">
      <div className="flex gap-6 w-max animate-marquee px-6">
        {[...items, ...items].map((item, i) => (
          <Card key={`${item.title}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
