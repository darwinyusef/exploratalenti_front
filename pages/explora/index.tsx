'use client'
interface Props {
  x: number
  y: number
  z: number
}
import { title } from '@/components/primitives'
import DefaultLayout from '@/layouts/default'
import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
function Item(props: any) {
  const item = props.item
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const ref = useRef<HTMLInputElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'start start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (offset) => {
    const onlyRef = ref.current?.getAttribute('data-id')
    let status: number = onlyRef != null ? parseInt(onlyRef) : 0
    if (status == 1) {
      
      offset == 1 ? setX(0) : setY(0)
      offset == 0 ? setX(400) : setY(-15)
      
    }
    if (status == 2) {
      offset == 1 ? setX(0) : setY(0)
      offset == 0 ? setX(-400) : setY(15)
    }
    if (status == 3) {
      offset == 1 ? setX(0) : setY(0)
      offset == 0 ? setX(-100) : setY(-15)
    }
    if (status == 4) {
      offset == 1 ? setX(0) : setY(0)
      offset == 0 ? setX(300) : setY(-15)
    }
  })

  return (
    <section>
      <motion.div
        ref={ref}
        data-id={item}
        className="box"
        initial={false}
        animate={{ x, y }}
        transition={{ ease: 'easeOut', duration: 2 }}
      >
        <figure className="progress">
          <svg id="progress" width="75" height="75" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              className="indicator"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
        </figure>
      </motion.div>
    </section>
  )
}

export default function ExploraPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Explora</h1>
        </div>
      </section>

      <section className="mt-80">.</section>

      <section className="cuadradito flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {Array(10)
          .fill(0)
          .map((r, i) => (
            <Item item={i + 1} key={i} />
          ))}
      </section>
      <section className="mt-80">.</section>
    </DefaultLayout>
  )
}
