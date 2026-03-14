import Image from 'next/image';

import '@styles/about.scss';
import { trevor } from '@lib/assets';

export default function About() {
  return (
    <section className="about" id="about">
      <p>I am a maker. There isn&apos;t a medium I have found that I didn&apos;t want to learn everything about. Whether it be designing software or weaving, I want to get my hands on it and create something new. I particularly enjoy finding new ways to use existing materials and software.</p>

      <p>Like modifying a crochet pattern normally the size of a teddy bear into a sculpture larger than a car by just changing the type of yarn used.</p>

      <Image
        className="trevor"
        alt="trevor"
        title="trevor"
        src={trevor}
        width={30}
        height={30}
      />

      <p className="small">Yes, that&apos;s a 7ft tall AT-AT. He was made with more than 2 miles of yarn, a custom pattern tracking program, and stuffed with a mini suspension bridge. My kid named him Trevor (still not sure why). If you want to see Trevor in person, he lives at the Urban Arts Gallery in downtown Salt Lake City, UT along side my much smaller artwork and products.</p>

      <p>My creative skills are not limited to the artsy side however. I can find ways to shave unnecessary time expenditures that most people wouldn&apos;t even notice and provide a well implemented solution without sacrificing quality. To me project management, process management, and analysis is just as enjoyable of a puzzle as designing and developing.</p>
    </section>
  )
}
