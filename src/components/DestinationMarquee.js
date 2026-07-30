import Image from "next/image";

const items = [
  {
    title: "Echoes of Ariana",
    desc: "Herat, Balkh, Kabul",
    img: "/images/echoes.jpg",
  },
  {
    title: "Valleys of Time",
    desc: "Bamyan, Band-e Amir",
    img: "/images/vally.jpeg",
  },
  {
    title: "Mountains & Nomads",
    desc: "Wakhan, Hindu Kush",
    img: "/images/hindukush.png",
  },
  {
    title: "Minaret of Jam",
    desc: "Ghor Province",
    img: "/images/jam.jpeg",
  },
  {
    title: "Band-e Amir",
    desc: "Afghanistan's First National Park",
    img: "/images/bameyan.jpeg",
  },
  {
    title: "Blue Mosque",
    desc: "Herat",
    img: "/images/bluem.jpg",
  },
  {
    title: "Wakhan Corridor",
    desc: "The Roof of Central Asia",
    img: "/images/wakhan.jpg",
  },
  {
    title: "Shahr-e Gholghola",
    desc: "The City of Screams",
    img: "/images/gholghola.jpeg",
  },
  {
    title: "Kandahar",
    desc: "The Historic South",
    img: "/images/hero2.jpg",
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
